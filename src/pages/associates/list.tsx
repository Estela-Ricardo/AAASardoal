// src/pages/associates/list.tsx
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

export const AssociateList = () => {
  const { dataGridProps } = useDataGrid({
    resource: "associates_full", // View with combined data
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
        field: "quotastatus",
        headerName: "Quota",
        minWidth: 120,
        flex: 1,
        renderCell: ({ value }) =>
          value
            ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            : "-",
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
            <EditButton hideText resource="associates" recordItemId={row.id} />
            <ShowButton hideText resource="associates" recordItemId={row.id} />
            <DeleteButton
              hideText
              resource="associates"
              recordItemId={row.id}
              onSuccess={() => {
                invalidate({
                  resource: "associates_full",
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
    <List resource="associates">
      <DataGrid
        {...dataGridProps}
        getRowId={(row) => row.id} // important to keep the correct ID from the associates table
        columns={columns}
        autoHeight
      />
    </List>
  );
};
