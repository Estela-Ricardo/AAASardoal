// src/pages/feedaidrequests/show.tsx
import {
  Typography,
  Stack,
} from "@mui/material";
import {
  Show,
  TextFieldComponent as TextField,
  EmailField,
} from "@refinedev/mui";
import { useShow } from "@refinedev/core";

export const FeedAidRequestShow = () => {
  const { query } = useShow({
    meta: {
      select: "*, user:id_user(*)",
    },
  });

  const { data, isLoading } = query;
  const record = data?.data;

  const renderBoolean = (value?: boolean) => (value ? "Sim" : "Não");

  return (
    <Show
      title="Detalhes do Pedido de Apoio Alimentar"
      isLoading={isLoading}
    >
      <Stack gap={2}>
        <Typography variant="h6">Dados do Responsável</Typography>

        <Typography fontWeight="600">Nome</Typography>
        <TextField value={record?.user?.name ?? "-"} />

        <Typography fontWeight="600">Email</Typography>
        <EmailField value={record?.user?.email ?? "-"} />

        <Typography fontWeight="600">Telefone</Typography>
        <TextField value={record?.user?.phone ?? "-"} />

        <Typography fontWeight="600">Morada</Typography>
        <TextField value={record?.user?.address ?? "-"} />

        <Typography variant="h6" sx={{ pt: 2 }}>
          Detalhes do Pedido
        </Typography>

        <Typography fontWeight="600">É uma colónia?</Typography>
        <TextField value={renderBoolean(record?.iscolony)} />

        <Typography fontWeight="600">N.º de Gatos</Typography>
        <TextField value={record?.numbercats ?? 0} />

        <Typography fontWeight="600">É um pedido doméstico?</Typography>
        <TextField value={renderBoolean(record?.isdomesticrequest)} />

        <Typography fontWeight="600">Tipo de Animal</Typography>
        <TextField value={record?.typeofpet ?? "-"} />

        <Typography fontWeight="600">N.º Total de Animais</Typography>
        <TextField value={record?.numberofpets ?? 0} />

        <Typography fontWeight="600">Situação da Esterilização</Typography>
        <TextField value={record?.sterilizationsituation ?? "-"} />

        <Typography fontWeight="600">Observações</Typography>
        <TextField value={record?.comments ?? "-"} />

        <Typography fontWeight="600">Aprovado?</Typography>
        <TextField value={renderBoolean(record?.approval)} />
      </Stack>
    </Show>
  );
};
