// src/pages/events/show.tsx
import {
  Show,
  TextFieldComponent as TextField,
  DateField,
} from "@refinedev/mui";
import { useShow } from "@refinedev/core";
import { Stack, Typography } from "@mui/material";

export const EventShow = () => {
  const { query } = useShow({
    meta: {
      select: "*, event_volunteer(*, volunteers(id_user, user(name, email)))",
    },
  });

  const { data, isLoading } = query;
  const record = data?.data;

  if (isLoading || !record) {
    return <Show isLoading />;
  }

  return (
    <Show title="Detalhes do Evento">
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="600">ID</Typography>
        <TextField value={record.id} />

        <Typography variant="body1" fontWeight="600">Tipo de Evento</Typography>
        <TextField value={record.eventtype} />

        <Typography variant="body1" fontWeight="600">Data de Início</Typography>
        <DateField value={record.startingdate} />

        <Typography variant="body1" fontWeight="600">Data de Fim</Typography>
        <DateField value={record.endingdate} />

        {record.comments && (
          <>
            <Typography variant="body1" fontWeight="600">Comentários</Typography>
            <TextField value={record.comments} />
          </>
        )}

        {record.event_volunteer?.length > 0 && (
          <>
            <Typography variant="body1" fontWeight="600">Voluntários Associados</Typography>
            <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
              {record.event_volunteer.map((ev: any) => (
                <li key={ev.id_volunteer}>
                  <Typography variant="body2">
                    {ev.volunteers?.user?.name ?? "—"} (
                    {ev.volunteers?.user?.email ?? "sem email"})
                  </Typography>
                </li>
              ))}
            </ul>
          </>
        )}
      </Stack>
    </Show>
  );
};