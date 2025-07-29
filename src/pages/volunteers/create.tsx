// src/pages/volunteers/create.tsx
import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { Create } from "@refinedev/mui";
import { useNotification, useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useCreate } from "@refinedev/core";

export const VolunteerCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: createUser } = useCreate();
  const { mutate: createVolunteer } = useCreate();
  const { open } = useNotification();
  const { push } = useNavigation(); // ⬅️ Redirecionamento

  const onSubmit = async (data: any) => {
    try {
      const userResponse = await new Promise((resolve, reject) => {
        createUser(
          {
            resource: "user",
            values: {
              nif: data.nif,
              name: data.name,
              email: data.email,
              address: data.address,
              cc: data.cc,
              phone: data.phone,
              dateofbirth: data.dateofbirth || null,
              status: data.status,
              isassociate: false,
              isvolunteer: true,
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

      await new Promise((resolve, reject) => {
        createVolunteer(
          {
            resource: "volunteers",
            values: {
              id_user: newUser.id,
              transporttype: data.transporttype,
              activities: data.activities,
            },
          },
          {
            onSuccess: () => {
              open?.({ type: "success", message: "Voluntário criado com sucesso!" });
              push("/volunteers"); // ⬅️ Redireciona para a lista
              resolve(true);
            },
            onError: (error) => reject(error),
          }
        );
      });
    } catch (error) {
      open?.({ type: "error", message: "Erro ao criar Voluntário" });
    }
  };

  return (
    <Create
      title="Criar Voluntário"
      saveButtonProps={{
        onClick: handleSubmit(onSubmit),
        children: "Criar Voluntário",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        autoComplete="off"
      >
        <Typography variant="h6">Dados Pessoais</Typography>

        <TextField
          {...register("name", { required: "O nome é obrigatório" })}
          error={!!errors?.name}
          helperText={(errors as any)?.name?.message}
          label="Nome"
        />
        <TextField
          {...register("email", { required: "O email é obrigatório" })}
          error={!!errors?.email}
          helperText={(errors as any)?.email?.message}
          label="Email"
        />
        <TextField {...register("address")} label="Morada" />
        <TextField {...register("nif")} label="NIF" />
        <TextField {...register("cc")} label="Cartão de Cidadão (CC)" />
        <TextField {...register("phone")} label="Telefone" />
        <TextField
          {...register("dateofbirth")}
          label="Data de Nascimento"
          type="date"
          defaultValue=""
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          {...register("status")}
          label="Estado"
          select
          defaultValue="ativo"
          error={!!errors?.status}
          helperText={(errors as any)?.status?.message}
        >
          <MenuItem value="ativo">Ativo</MenuItem>
          <MenuItem value="inativo">Inativo</MenuItem>
        </TextField>

        <Typography variant="h6" sx={{ pt: 2 }}>
          Dados do Voluntário
        </Typography>

        <TextField {...register("transporttype")} label="Tipo de Transporte" />
        <TextField
          {...register("activities")}
          label="Atividades"
          multiline
          rows={3}
        />
      </Box>
    </Create>
  );
};
 