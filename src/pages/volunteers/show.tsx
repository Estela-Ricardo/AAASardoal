// src/pages/volunteers/show.tsx
import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import {
  EmailField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

export const VolunteerShow = () => {
  const { query } = useShow({
    meta: {
      select: "*, user:id_user(*)",
    },
  });

  const { data, isLoading } = query;
  const record = data?.data;

  const capitalize = (value?: string) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : "-";

  return (
    <Show title="Detalhes do Voluntário" isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="600">
          {"ID"}
        </Typography>
        <TextField value={record?.id} />

        <Typography variant="body1" fontWeight="600">
          {"Nome"}
        </Typography>
        <TextField value={record?.user?.name ?? ""} />

        <Typography variant="body1" fontWeight="600">
          {"Email"}
        </Typography>
        <EmailField
          value={record?.user?.email ?? ""}
          style={{ textDecoration: "none" }}
        />

        <Typography variant="body1" fontWeight="600">
          {"Telefone"}
        </Typography>
        <Typography variant="body2" color="primary">
          <a
            href={`tel:${record?.user?.phone}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {record?.user?.phone ?? ""}
          </a>
        </Typography>

        <Typography variant="body1" fontWeight="600">
          {"Tipo de Transporte"}
        </Typography>
        <TextField value={record?.transporttype ?? ""} />

        <Typography variant="body1" fontWeight="600">
          {"Atividades"}
        </Typography>
        <TextField value={record?.activities ?? ""} />

       {/* Additional example if there are fields like status or other info */}
        {record?.user?.status && (
          <>
            <Typography variant="body1" fontWeight="600">
              {"Status"}
            </Typography>
            <TextField value={capitalize(record.user.status)} />
          </>
        )}
      </Stack>
    </Show>
  );
};
