"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "../../components/data-table/table-features"
import { Button } from "@/components/ui/button";
import moment from 'moment';
import { Eye, Pencil, X } from "lucide-react";
import { deleteAction } from "./actions";
import Link from "next/link";



// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Student>()


export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "ID",
  }),

  columnHelper.accessor("name", {
    header: "Name",
  }),

  columnHelper.accessor("email", {
    header: "Email",
  }),

  columnHelper.accessor("phone", {
    header: "Phone",
  }),

  columnHelper.accessor("address", {
    header: "Address",
  }),

  columnHelper.accessor("batch_id", {
    header: "Batch",
    cell: ({ getValue }) => getValue() ?? "-",
  }),

  columnHelper.accessor("enrolled_at", {
    header: "Enrolled At",
    cell: ({ getValue }) => getValue() ?? "-",
  }),

  columnHelper.accessor("status", {
    header: "Status",
  }),

  columnHelper.accessor("created_at", {
    header: "Created At",
    cell: ({ row }) => <>{moment(row.original.created_at).format("YYYY-MM-DD")}</>
  }),

  columnHelper.accessor("updated_at", {
    header: "Updated At",
    cell: ({ getValue }) => {
      const value = getValue()
      return <>{moment(value).fromNow()}</>
    }
  }),

  columnHelper.display({
    header: "Actions",
    cell: ({ row }) => {

      return <div className="flex gap-2">
        <Button ><Pencil /></Button>
        <Link href={"/students/" + row.original.id}>
          <Button >
            <Eye />
          </Button>
        </Link>
        <Button onClick={() => deleteAction(row.original.id)} ><X /></Button>

      </div>
    }
  })
]);