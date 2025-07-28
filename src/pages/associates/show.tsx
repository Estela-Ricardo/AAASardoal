// src/pages/associates/show.tsx
import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import {
  DateField,
  EmailField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";


export const AssociateShow = () => {

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
    <Show title="Detalhes do Associado" isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="600">
          {"ID"}
        </Typography>
        <TextField value={record?.id} />

        <Typography variant="body1" fontWeight="600">
          {"Name"}
        </Typography>
        <TextField value={record?.user?.name?? ""} />

        <Typography variant="body1" fontWeight="600">
          {"Email"}
        </Typography>
        <EmailField value={record?.user?.email?? ""} style={{ textDecoration: "none" }} />

        <Typography variant="body1" fontWeight="600">
          {"Telefone"}
        </Typography>
        <Typography variant="body2" color="primary">
          <a
            href={`tel:${record?.user?.phone}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {record?.user?.phone?? ""}
          </a>
        </Typography>

        <Typography variant="body1" fontWeight="600">
          {"NIF"}
        </Typography>
        <TextField value={record?.user?.nif?? ""} />

        <Typography variant="body1" fontWeight="600">
          {"Cartão de Cidadão"}
        </Typography>
        <TextField value={record?.user?.cc?? ""} />

        <Typography variant="body1" fontWeight="600">
          {"Data de Nascimento"}
        </Typography>
        <DateField value={record?.user?.dateofbirth?? ""} />

        <Typography variant="body1" fontWeight="600">
          {"Morada"}
        </Typography>
        <TextField value={record?.user?.address?? ""} />

        <Typography variant="body1" fontWeight="600">
          {"Voluntário"}
          <Typography variant="body2">
            {record?.user?.isvolunteer ? "Sim" : "Não"}
          </Typography>
        </Typography>

        <Typography variant="body1" fontWeight="600">
          {"Quota"}
          <TextField value={capitalize(record?.quotastatus)} />
        </Typography>
        
        <Typography variant="body1" fontWeight="600">
          {"Status"}
        </Typography>
        <TextField value={capitalize(record?.user?.status)} />
      </Stack>
    </Show>
  );
};