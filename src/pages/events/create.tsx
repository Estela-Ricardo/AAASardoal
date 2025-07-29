import React, { useState } from "react";
import {
  useCreate,
  useList,
  useNavigation,
  useNotification,
} from "@refinedev/core";
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export const EventCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedVolunteers, setSelectedVolunteers] = useState<number[]>([]);

  const { data: volunteersData } = useList({
    resource: "volunteers",
    meta: {
      select: "id, user(name)",
    },
  });

  const { mutate: createEvent } = useCreate();
  const { mutate: createEventVolunteer } = useCreate();

  const { push } = useNavigation();
  const { open } = useNotification();

  const volunteerOptions =
    volunteersData?.data?.map((vol: any) => ({
      value: Number(vol.id),
      label: vol.user?.name ?? "Sem nome",
    })) ?? [];

  const handleCheckboxChange = (id: number) => {
    setSelectedVolunteers((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const onSubmit = async (formData: any) => {
    try {
      const eventResponse = await new Promise((resolve, reject) => {
        createEvent(
          {
            resource: "events",
            values: {
              eventtype: formData.eventtype,
              startingdate: formData.startingdate,
              endingdate: formData.endingdate,
              comments: formData.comments,
            },
          },
          {
            onSuccess: (res) => resolve(res.data),
            onError: (err) => reject(err),
          }
        );
      });

      const newEvent = eventResponse as any;

      if (newEvent?.id && selectedVolunteers.length > 0) {
        await Promise.all(
          selectedVolunteers.map((volunteerId) =>
            new Promise((resolve, reject) => {
              createEventVolunteer(
                {
                  resource: "event_volunteer",
                  values: {
                    id_event: newEvent.id,
                    id_volunteer: volunteerId,
                  },
                },
                {
                  onSuccess: () => resolve(true),
                  onError: (err) => reject(err),
                }
              );
            })
          )
        );
      }

      open?.({
        type: "success",
        message: "Evento criado com sucesso!",
      });

      push("/events");
    } catch (error) {
      open?.({
        type: "error",
        message: "Erro ao criar Evento",
      });
    }
  };

  return (
    <Create
      title="Criar Evento"
      saveButtonProps={{
        onClick: handleSubmit(onSubmit),
        children: "Criar Evento",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          {...register("eventtype", { required: "Tipo de evento obrigatório" })}
          label="Tipo de Evento"
          error={!!errors.eventtype}
          helperText={errors.eventtype?.message as string}
        />

        <TextField
          {...register("startingdate", { required: "Data de início obrigatória" })}
          label="Data de Início"
          type="date"
          InputLabelProps={{ shrink: true }}
          error={!!errors.startingdate}
          helperText={errors.startingdate?.message as string}
        />

        <TextField
          {...register("endingdate", { required: "Data de fim obrigatória" })}
          label="Data de Fim"
          type="date"
          InputLabelProps={{ shrink: true }}
          error={!!errors.endingdate}
          helperText={errors.endingdate?.message as string}
        />

        <TextField
          {...register("comments")}
          label="Comentários"
          multiline
          rows={3}
        />

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Voluntários Associados
          </Typography>
          <FormGroup>
            {volunteerOptions.map((vol) => (
              <FormControlLabel
                key={vol.value}
                control={
                  <Checkbox
                    checked={selectedVolunteers.includes(vol.value)}
                    onChange={() => handleCheckboxChange(vol.value)}
                  />
                }
                label={vol.label}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
    </Create>
  );
};
