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
    header: "Reorder point",
  },
  {
    accessorKey: "unitOfMeasure",
    header: "Unit of measure",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
]