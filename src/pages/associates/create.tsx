// src/pages/associates/create.tsx
import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import {
  useCreate,
  useNavigation,
  useNotification
} from "@refinedev/core";

export const AssociateCreate = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: createUser } = useCreate();
  const { mutate: createAssociate } = useCreate();
  const { push } = useNavigation();
  const { open } = useNotification() as {
    open: (params: { type: "success" | "error"; message: string; description?: string }) => void;
  };
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
              isassociate: true,
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

      await new Promise((resolve, reject) => {
        createAssociate(
          {
            resource: "associates",
            values: {
              id_user: newUser.id,
              quotastatus: data.quotastatus,
            },
          },
          {
            onSuccess: () => {
              open?.({ type: "success", message: "Associado criado com sucesso!" });
              push("/associates"); // redirecionar
              resolve(true);
            },
            onError: (error) => reject(error),
          }
        );
      });
    } catch (error) {
      open?.({ type: "error", message: "Erro ao criar Associado" });
    }
  };

  return (
    <Create
      title="Criar Associado"
      saveButtonProps={{
        onClick: handleSubmit(onSubmit),
        children: "Criar Associado",
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
        <TextField
          {...register("address")}
          label="Morada"
        />
        <TextField
          {...register("nif")}
          label="NIF"
        />
        <TextField
          {...register("cc")}
          label="Cartão de Cidadão (CC)"
        />
        <TextField
          {...register("phone")}
          label="Telefone"
        />
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
          Dados do Associado
        </Typography>

        <TextField
          {...register("quotastatus", { required: "Selecione o estado da quota", })}
          label="Estado da Quota"
          select
          defaultValue=""
          error={!!errors?.quotastatus}
          helperText={(errors as any)?.quotastatus?.message}
        >
          <MenuItem value="paga">Paga</MenuItem>
          <MenuItem value="atraso">Em Atraso</MenuItem>
        </TextField>
      </Box>
    </Create>
  );
};