import React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import { useInvalidate } from "@refinedev/core";

export const VolunteerList = () => {
  const { dataGridProps } = useDataGrid({
    resource: "volunteers_full", // view com dados combinados
  });

  const invalidate = useInvalidate();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        headerName: "Nome",
        minWidth: 200,
        flex: 1,
        renderCell: ({ row }) => row?.name ?? "-",
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 250,
        flex: 1,
        renderCell: ({ row }) => row?.email ?? "-",
      },
      {
        field: "phone",
        headerName: "Telefone",
        minWidth: 150,
        flex: 1,
        renderCell: ({ row }) => row?.phone ?? "-",
      },
      {
        field: "transporttype",
        headerName: "Tipo de Transporte",
        minWidth: 150,
        flex: 1,
        renderCell: ({ row }) => row?.transporttype ?? "-",
      },
      {
        field: "activities",
        headerName: "Atividades",
        minWidth: 150,
        flex: 1,
        renderCell: ({ row }) => row?.activities ?? "-",
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
            <EditButton hideText resource="volunteers" recordItemId={row.volunteer_id} />
            <ShowButton hideText resource="volunteers" recordItemId={row.volunteer_id} />
            <DeleteButton
              hideText
              resource="volunteers"
              recordItemId={row.volunteer_id}
              onSuccess={() => {
                invalidate({
                  resource: "volunteers_full",
                  invalidates: ["list"],
                });
              }}
            />
          </>
        ),
      },
    ],
    [invalidate]
  );

  return (
    <List resource="volunteers">
      <DataGrid
        {...dataGridProps}
        getRowId={(row) => row.volunteer_id}
        columns={columns}
        autoHeight
      />
    </List>
  );
};
