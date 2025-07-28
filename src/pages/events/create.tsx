import React, { useState } from "react";
import {
  useCreate,
  useList,
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
  const { saveButtonProps, register, handleSubmit, formState } = useForm();

  const [selectedVolunteers, setSelectedVolunteers] = useState<number[]>([]);

  // Fetch volunteers with associated user name
  const { data: volunteersData } = useList({
    resource: "volunteers",
    meta: {
      select: "id, user(name)", /// Volunteer ID + user name
    },
  });

const volunteerOptions =
  volunteersData?.data?.map((vol: any) => ({
    value: Number(vol.id), // force number
    label: vol.user?.name ?? "Sem nome",
  })) ?? [];

const handleCheckboxChange = (id: number) => {
  setSelectedVolunteers((prev) =>
    prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
  );
};

  const { mutate: createEvent } = useCreate();
  const { mutate: createEventVolunteer } = useCreate();

  const onSubmit = async (formData: any) => {
    createEvent(
      {
        resource: "events",
        values: {
          eventtype: formData.eventtype,
          startingdate: formData.startingdate,
          endingdate: formData.endingdate,
          comments: formData.comments,
        },
        successNotification: () => ({
          message: "Evento criado com sucesso!",
          type: "success",
        }),
      },
      {
        onSuccess: (res) => {
          const eventId = res?.data?.id;

          if (eventId && selectedVolunteers.length > 0) {
            selectedVolunteers.forEach((volunteerId) => {
              createEventVolunteer({
                resource: "event_volunteer",
                values: {
                  id_event: eventId,
                  id_volunteer: volunteerId,
                },
              });
            });
          }
        },
      }
    );
  };

  return (
    <Create title="Criar Evento" saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          {...register("eventtype", { required: "Tipo de evento obrigatório" })}
          label="Tipo de Evento"
          error={!!formState.errors.eventtype}
          helperText={formState.errors.eventtype?.message as string}
        />

        <TextField
          {...register("startingdate", { required: "Data de início obrigatória" })}
          label="Data de Início"
          type="date"
          InputLabelProps={{ shrink: true }}
          error={!!formState.errors.startingdate}
          helperText={formState.errors.startingdate?.message as string}
        />

        <TextField
          {...register("endingdate", { required: "Data de fim obrigatória" })}
          label="Data de Fim"
          type="date"
          InputLabelProps={{ shrink: true }}
          error={!!formState.errors.endingdate}
          helperText={formState.errors.endingdate?.message as string}
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