import React from "react";
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Create } from "@refinedev/mui";
import { useNotification, useNavigation, useCreate } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const FeedAidRequestCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: createUser } = useCreate();
  const { mutate: createRequest } = useCreate();
  const { open } = useNotification();
  const { push } = useNavigation();

  const onSubmit = async (data: any) => {
    try {
      // 1. Criar utilizador
      const userResponse = await new Promise((resolve, reject) => {
        createUser(
          {
            resource: "user",
            values: {
              name: data.name,
              email: data.email,
              phone: data.phone,
              address: data.address,
              status: "ativo",
              isassociate: false,
              isvolunteer: false,
              issuperuser: false,
            },
          },
          {
            onSuccess: (res) => resolve(res.data),
            onError: (err) => reject(err),
          }
        );
      });

      const newUser = userResponse as any;

      // 2. Criar pedido
      await new Promise((resolve, reject) => {
        createRequest(
          {
            resource: "feedaidrequests",
            values: {
              id_user: newUser.id,
              name: data.name,
              email: data.email,
              phone: data.phone,
              address: data.address,
              iscolony: data.iscolony || false,
              numbercats: parseInt(data.numbercats) || 0,
              isdomesticrequest: data.isdomesticrequest || false,
              typeofpet: data.typeofpet || "",
              numberofpets: parseInt(data.numberofpets) || 0,
              sterilizationsituation: data.sterilizationsituation || "",
              comments: data.comments || "",
              approval: false,
            },
          },
          {
            onSuccess: () => {
              open?.({
                type: "success",
                message: "Pedido criado com sucesso!",
              });
              push("/feedAidRequests");
              resolve(true);
            },
            onError: (err) => reject(err),
          }
        );
      });
    } catch (error) {
      open?.({ type: "error", message: "Erro ao criar pedido" });
    }
  };

  return (
    <Create
      title="Novo Pedido de Apoio Alimentar"
      saveButtonProps={{
        onClick: handleSubmit(onSubmit),
        children: "Criar Pedido",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        autoComplete="off"
      >
        <Typography variant="h6">Dados do Responsável</Typography>

        <TextField
          {...register("name", { required: "O nome é obrigatório" })}
          label="Nome"
          error={!!errors?.name}
          helperText={errors.name?.message as string}
        />
        <TextField {...register("email")} label="Email" />
        <TextField {...register("phone")} label="Telefone" />
        <TextField {...register("address")} label="Morada" />

        <Typography variant="h6" sx={{ pt: 2 }}>
          Detalhes do Pedido
        </Typography>

        <FormControlLabel
          control={<Checkbox {...register("iscolony")} />}
          label="É uma colónia?"
        />
        <TextField {...register("numbercats")} label="N.º de Gatos" type="number" />
        <FormControlLabel
          control={<Checkbox {...register("isdomesticrequest")} />}
          label="É um pedido doméstico?"
        />
        <TextField {...register("typeofpet")} label="Tipo de Animal" />
        <TextField {...register("numberofpets")} label="N.º Total de Animais" type="number" />
        <TextField {...register("sterilizationsituation")} label="Situação da Esterilização" />
        <TextField
          {...register("comments")}
          label="Observações"
          multiline
          minRows={2}
        />
      </Box>
    </Create>
  );
};
