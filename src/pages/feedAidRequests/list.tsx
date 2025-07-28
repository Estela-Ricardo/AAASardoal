import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { ptPT } from "@mui/x-data-grid/locales";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export const FeedAidRequestList = () => {
  const { dataGridProps } = useDataGrid({
    meta: {
      select: "*, user:id_user(name, email, phone, address)",
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        headerName: "Nome",
        minWidth: 200,
        flex: 1,
        renderCell: ({ row }) => row.user?.name ?? "-",
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 200,
        flex: 1,
        renderCell: ({ row }) => row.user?.email ?? "-",
      },
      {
        field: "phone",
        headerName: "Telefone",
        minWidth: 150,
        flex: 1,
        renderCell: ({ row }) => row.user?.phone ?? "-",
      },
      {
        field: "address",
        headerName: "Morada",
        minWidth: 200,
        flex: 1,
        renderCell: ({ row }) => row.user?.address ?? "-",
      },
      {
        field: "iscolony",
        headerName: "Colónia?",
        minWidth: 120,
        renderCell: ({ row }) => (row.iscolony ? "Sim" : "Não"),
      },
      {
        field: "numbercats",
        headerName: "N.º de Gatos",
        minWidth: 130,
        renderCell: ({ row }) => row.numbercats ?? "-",
      },
      {
        field: "isdomesticrequest",
        headerName: "Doméstico?",
        minWidth: 130,
        renderCell: ({ row }) => (row.isdomesticrequest ? "Sim" : "Não"),
      },
      {
        field: "typeofpet",
        headerName: "Tipo de Animal",
        minWidth: 150,
        renderCell: ({ row }) => row.typeofpet ?? "-",
      },
      {
        field: "numberofpets",
        headerName: "N.º de Animais",
        minWidth: 150,
        renderCell: ({ row }) => row.numberofpets ?? "-",
      },
      {
        field: "sterilizationsituation",
        headerName: "Esterilização",
        minWidth: 150,
        renderCell: ({ row }) => row.sterilizationsituation ?? "-",
      },
      {
        field: "comments",
        headerName: "Observações",
        minWidth: 200,
        flex: 1,
        renderCell: ({ row }) => row.comments ?? "-",
      },
      {
        field: "actions",
        headerName: "Ações",
        align: "right",
        headerAlign: "right",
        minWidth: 140,
        sortable: false,
        disableColumnMenu: true,
        display: "flex",
        renderCell: ({ row }) => (
          <>
            <EditButton hideText recordItemId={row.id} />
            <ShowButton hideText recordItemId={row.id} />
            <DeleteButton hideText recordItemId={row.id} />
          </>
        ),
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        localeText={ptPT.components.MuiDataGrid.defaultProps.localeText}
        autoHeight
      />
    </List>
  );
};