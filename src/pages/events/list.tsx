// src/pages/events/list.tsx
import React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  List,
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/mui";

export const EventList = () => {
  const { dataGridProps } = useDataGrid({
    resource: "events",
    meta: {
      select: "*, event_volunteer(*)",
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        minWidth: 60,
        type: "number",
      },
      {
        field: "eventtype",
        headerName: "Tipo de Evento",
        minWidth: 200,
        flex: 1,
        renderCell: ({ row }) => row.eventtype ?? "-",
      },
      {
        field: "startingdate",
        headerName: "Data Início",
        minWidth: 150,
        renderCell: ({ row }) =>
          row.startingdate
            ? new Date(row.startingdate).toLocaleDateString("pt-PT")
            : "-",
      },
      {
        field: "endingdate",
        headerName: "Data Fim",
        minWidth: 150,
        renderCell: ({ row }) =>
          row.endingdate
            ? new Date(row.endingdate).toLocaleDateString("pt-PT")
            : "-",
      },
      {
        field: "volunteersCount",
        headerName: "N.º Voluntários",
        minWidth: 140,
        renderCell: ({ row }) => row.event_volunteer?.length ?? 0,
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
          // return?!
          <>
            <EditButton hideText recordItemId={row.id} resource="events" />
            <ShowButton hideText recordItemId={row.id} resource="events" />
            <DeleteButton hideText recordItemId={row.id} resource="events" />
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
        getRowId={(row) => row.id}
        columns={columns}
        autoHeight
      />
    </List>
  );
};