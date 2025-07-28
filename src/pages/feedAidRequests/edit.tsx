// src/pages/feedaidrequests/edit.tsx
import React, { useEffect } from "react";
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useUpdate } from "@refinedev/core";

export const FeedAidRequestEdit = () => {
  const {
    refineCore: { queryResult, onFinish },
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    refineCoreProps: {
      meta: {
        select: "*, user:id_user(*)",
      },
    },
  });

  const record = queryResult?.data?.data;

  const { mutate: updateUser } = useUpdate();

  useEffect(() => {
    if (record) {
      setValue("name", record.user?.name ?? "");
      setValue("email", record.user?.email ?? "");
      setValue("phone", record.user?.phone ?? "");
      setValue("address", record.user?.address ?? "");
      setValue("iscolony", record.iscolony ?? false);
      setValue("numbercats", record.numbercats ?? "");
      setValue("isdomesticrequest", record.isdomesticrequest ?? false);
      setValue("typeofpet", record.typeofpet ?? "");
      setValue("numberofpets", record.numberofpets ?? "");
      setValue("sterilizationsituation", record.sterilizationsituation ?? "");
      setValue("comments", record.comments ?? "");
      setValue("approval", record.approval ?? false);
    }
  }, [record, setValue]);

  const onSubmit = async (data: any) => {
    if (!record || !record.id || !record.user?.id) return;

    updateUser(
      {
        resource: "user",
        id: record.user.id,
        values: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
        },
      },
      {
        onSuccess: () => {
          onFinish({
            iscolony: data.iscolony,
            numbercats: data.numbercats,
            isdomesticrequest: data.isdomesticrequest,
            typeofpet: data.typeofpet,
            numberofpets: data.numberofpets,
            sterilizationsituation: data.sterilizationsituation,
            comments: data.comments,
            approval: data.approval,
          });
        },
      }
    );
  };

  return (
    <Edit
      title="Editar Pedido de Apoio Alimentar"
      saveButtonProps={{ onClick: handleSubmit(onSubmit) }}
      isLoading={!record}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        autoComplete="off"
      >
        <Typography variant="h6">Dados do Responsável</Typography>

        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "O nome é obrigatório" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome"
              error={!!errors.name}
              helperText={errors.name?.message as string}
              fullWidth
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Email" fullWidth />
          )}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Telefone" fullWidth />
          )}
        />

        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Morada" fullWidth />
          )}
        />

        <Typography variant="h6" sx={{ pt: 2 }}>
          Detalhes do Pedido
        </Typography>

        <Controller
          name="iscolony"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="É uma colónia?"
            />
          )}
        />

        <Controller
          name="numbercats"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="N.º de Gatos" type="number" fullWidth />
          )}
        />

        <Controller
          name="isdomesticrequest"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="É um pedido doméstico?"
            />
          )}
        />

        <Controller
          name="typeofpet"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Tipo de Animal" fullWidth />
          )}
        />

        <Controller
          name="numberofpets"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="N.º Total de Animais" type="number" fullWidth />
          )}
        />

        <Controller
          name="sterilizationsituation"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Situação da Esterilização" fullWidth />
          )}
        />

        <Controller
          name="comments"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Observações" multiline minRows={2} fullWidth />
          )}
        />

        <Controller
          name="approval"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Aprovado?"
            />
          )}
        />
      </Box>
    </Edit>
  );
};
