"use client"

import { Items } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Items>[] = [
  {
    accessorKey: "id",
    header: () => undefined,
    cell: () => undefined,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "reorderPoint",
    header: "Reorder Point",
  },
  {
    accessorKey: "unitOfMeasure",
    header: "Unit of Measure",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
]