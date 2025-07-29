 import React, { useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm, Controller } from "react-hook-form";
import { useOne, useUpdate, useNotification, useNavigation } from "@refinedev/core";
import { useParams } from "react-router-dom";

export const VolunteerEdit = () => {
  const { id } = useParams<{ id: string }>();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { open } = useNotification();
  const { push } = useNavigation();

  const { data, isLoading } = useOne({
    resource: "volunteers",
    id,
    meta: { select: "*, user:id_user(*)" },
  });

  const { mutate: updateUser } = useUpdate();
  const { mutate: updateVolunteer } = useUpdate();

  const record = data?.data;

  // Preenche formulário com dados existentes
  useEffect(() => {
    if (record) {
      setValue("name", record.user?.name ?? "");
      setValue("email", record.user?.email ?? "");
      setValue("address", record.user?.address ?? "");
      setValue("nif", record.user?.nif ?? "");
      setValue("cc", record.user?.cc ?? "");
      setValue("phone", record.user?.phone ?? "");
      setValue("dateofbirth", record.user?.dateofbirth ?? "");
      setValue("status", record.user?.status ?? "");
      setValue("transporttype", record.transporttype ?? "");
      setValue("activities", record.activities ?? "");
    }
  }, [record, setValue]);

  const onSubmit = async (data: any) => {
    if (!record || !record.user) {
      open?.({ type: "error", message: "Dados inválidos: sem registo para atualizar." });
      return;
    }
    try {
      // Atualizar tabela user
      await new Promise((resolve, reject) => {
        updateUser(
          {
            resource: "user",
            id: record.user.id,
            values: {
              nif: data.nif,
              name: data.name,
              email: data.email,
              address: data.address,
              cc: data.cc,
              phone: data.phone,
              dateofbirth: data.dateofbirth || null,
              status: data.status,
            },
          },
          {
            onSuccess: () => resolve(true),
            onError: (err) => reject(err),
          }
        );
      });

      // Atualizar tabela volunteers
      await new Promise((resolve, reject) => {
        updateVolunteer(
          {
            resource: "volunteers",
            id: record.id,
            values: {
              transporttype: data.transporttype,
              activities: data.activities,
            },
          },
          {
            onSuccess: () => {
              open?.({ type: "success", message: "Voluntário atualizado com sucesso!" });
              push("/volunteers"); // aqui faz o redirect para a list
              resolve(true);
            },
            onError: (err) => reject(err),
          }
        );
      });
    } catch (error) {
      open?.({ type: "error", message: "Erro ao atualizar voluntário" });
    }
  };

  return (
    <Edit
      title="Editar Voluntário"
      isLoading={isLoading}
      saveButtonProps={{
        onClick: handleSubmit(onSubmit),
        children: "Guardar Alterações",
      }}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        autoComplete="off"
      >
        <Typography variant="h6">Dados Pessoais</Typography>

        <Controller
          name="name"
          control={control}
          rules={{ required: "O nome é obrigatório" }}
          defaultValue=""
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
          rules={{ required: "O email é obrigatório" }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message as string}
              fullWidth
            />
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

        <Controller
          name="nif"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="NIF" fullWidth />}
        />

        <Controller
          name="cc"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Cartão de Cidadão (CC)" fullWidth />
          )}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Telefone" fullWidth />}
        />

        <Controller
          name="dateofbirth"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Data de Nascimento"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          defaultValue="ativo"
          render={({ field }) => (
            <TextField
              {...field}
              label="Estado"
              select
              fullWidth
            >
              <MenuItem value="ativo">Ativo</MenuItem>
              <MenuItem value="inativo">Inativo</MenuItem>
            </TextField>
          )}
        />

        <Typography variant="h6" sx={{ pt: 2 }}>
          Dados do Voluntário
        </Typography>

        <Controller
          name="transporttype"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Tipo de Transporte" fullWidth />
          )}
        />

        <Controller
          name="activities"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Atividades" multiline rows={3} fullWidth />
          )}
        />
      </Box>
    </Edit>
  );
};