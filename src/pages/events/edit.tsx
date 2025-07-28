// src/pages/events/edit.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useList, useCreate, useDeleteMany } from "@refinedev/core";

export const EventEdit = () => {
  const {
    refineCore: { queryResult, onFinish },
    register,
    handleSubmit,
    formState,
    setValue,
  } = useForm();

  const record = queryResult?.data?.data;

  const [selectedVolunteers, setSelectedVolunteers] = useState<number[]>([]);

  // Fetch all volunteers
  const { data: volunteersData } = useList({
    resource: "volunteers",
    meta: {
      select: "id, user(name)",
    },
  });


  // Fetch volunteers associated with this event
  const { data: eventVolunteersData } = useList({
    resource: "event_volunteer",
    filters: [
      {
        field: "id_event",
        operator: "eq",
        value: record?.id,
      },
    ],
  });

  const { mutate: createEventVolunteer } = useCreate();
  const { mutate: deleteEventVolunteers } = useDeleteMany();

  const volunteerOptions =
    volunteersData?.data?.map((vol: any) => ({
      value: Number(vol.id),
      label: vol.user?.name ?? "Sem nome",
    })) ?? [];

  // When event data is loaded, populate the fields
  useEffect(() => {
    if (record) {
      setValue("eventtype", record.eventtype ?? "");
      setValue("startingdate", record.startingdate ?? "");
      setValue("endingdate", record.endingdate ?? "");
      setValue("comments", record.comments ?? "");
    }
  }, [record, setValue]);

  // When associated volunteers are loaded, populate the selected ones
  useEffect(() => {
    if (eventVolunteersData?.data) {
      const ids = eventVolunteersData.data.map((ev: any) => ev.id_volunteer);
      setSelectedVolunteers(ids);
    }
  }, [eventVolunteersData]);

  const handleCheckboxChange = (id: number) => {
    setSelectedVolunteers((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const onSubmit = async (formData: any) => {
    // Update the event
    await onFinish({
      eventtype: formData.eventtype,
      startingdate: formData.startingdate,
      endingdate: formData.endingdate,
      comments: formData.comments,
    });

    const currentVolunteers = eventVolunteersData?.data?.map((ev: any) => ({
      id: ev.id,
      id_volunteer: ev.id_volunteer,
    })) ?? [];

    const currentIds = currentVolunteers.map((v) => v.id_volunteer);

    // Volunteers removed
    const toDelete = currentVolunteers
      .filter((v) => !selectedVolunteers.includes(v.id_volunteer))
      .map((v) => v.id);

    // Volunteers added
    const toAdd = selectedVolunteers.filter((id) => !currentIds.includes(id));

    // Delete the ones removed
    if (toDelete.length > 0) {
      deleteEventVolunteers({
        resource: "event_volunteer",
        ids: toDelete,
      });
    }

    // Add the new ones
    toAdd.forEach((id_volunteer) => {
      createEventVolunteer({
        resource: "event_volunteer",
        values: {
          id_event: record?.id,
          id_volunteer,
        },
      });
    });
  };

  return (
    <Edit
      title="Editar Evento"
      isLoading={!record}
      saveButtonProps={{ onClick: handleSubmit(onSubmit) }}
    >
      <Box
        component="form"
        autoComplete="off"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          {...register("eventtype", { required: "Tipo de evento obrigatório" })}
          label="Tipo de Evento"
          InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
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
    </Edit>
  );
};