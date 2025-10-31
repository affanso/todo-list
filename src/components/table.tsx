import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type {
  SortingState,
  PaginationState,
  ColumnDef,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { SearchBar } from "../ui/searchBar";
import { FilterGroupButtons } from "../ui/filterGroupButtons";
import { DeleteButton } from "../ui/deleteButton";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";
import { PaginationBar } from "../ui/paginationBar";
import { deleteTasks } from "../services/deleteTasks";
import { updateTask } from "../services/updateTask";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { Todo } from "../types/types";

export const Table = () => {
  const isExpired = (expiry: string) => new Date(expiry) < new Date();

  const data = useAppSelector((state) => state.todos);

  const dispatch = useAppDispatch();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editedRow, setEditedRow] = useState<{
    id: string;
    title: string;
    description: string;
  }>({
    id: "",
    title: "",
    description: "",
  });

  const [statusFilter, setStatusFilter] = useState<
    "all" | "expired" | "pending"
  >("all");

  const filteredData = useMemo(() => {
    if (statusFilter === "expired")
      return data.filter((t) => isExpired(t.expiry_date));
    if (statusFilter === "pending")
      return data.filter((t) => !isExpired(t.expiry_date));
    return data;
  }, [data, statusFilter]);

  const deleteSelectedTasks = async () => {
    if (!selectedTasks) {
      return;
    }
    await deleteTasks(selectedTasks);
    dispatch(removeTodo(selectedTasks));
    setSelectedTasks([]);
  };

  const columnHelper = createColumnHelper<Todo>();

  const columns: ColumnDef<Todo, string>[] = useMemo(
    () => [
      {
        id: "select",
        enableSorting: false,
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedTasks.includes(row.original.id)}
            onChange={() =>
              setSelectedTasks((prev) =>
                prev.includes(row.original.id)
                  ? prev.filter((id) => id !== row.original.id)
                  : [...prev, row.original.id]
              )
            }
          />
        ),
      },
      columnHelper.accessor("title", {
        header: "Title",
        cell: ({ row }) =>
          row.original.id === editingRowId ? (
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={editedRow.title}
              onBlur={(e) =>
                setEditedRow((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          ) : (
            row.original.title
          ),
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: ({ row }) =>
          row.original.id === editingRowId ? (
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={editedRow.description}
              onBlur={(e) => {
                setEditedRow((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
          ) : (
            row.original.description
          ),
      }),
      columnHelper.accessor("created_at", {
        header: "Created at",
        cell: (info) => new Date(info.getValue()).toLocaleString(),
      }),
      columnHelper.accessor("expiry_date", {
        header: "Expiry",
        cell: (info) => new Date(info.getValue()).toLocaleString(),
      }),
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const isEditing = row.original.id === editingRowId;

          return isEditing ? (
            <button
              className="cursor-pointer"
              onClick={async () => {
                await updateTask(
                  editedRow.id,
                  editedRow.title,
                  editedRow.description,
                  row.original.created_at,
                  row.original.expiry_date
                );

                dispatch(
                  updateTodo({
                    id: editedRow.id,
                    title: editedRow.title,
                    description: editedRow.description,
                  })
                );

                setEditingRowId(null);
                setEditedRow({ id: "", title: "", description: "" });
              }}
            >
              Save
            </button>
          ) : (
            <button
              className="cursor-pointer"
              onClick={() => {
                setEditingRowId(row.original.id);
                setEditedRow({
                  id: row.original.id,
                  title: row.original.title,
                  description: row.original.description,
                });
              }}
            >
              Edit
            </button>
          );
        },
      },
    ],
    [editingRowId, selectedTasks, editedRow, setEditedRow]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <SearchBar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <FilterGroupButtons
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <div className="mt-2 mb-2 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 border-b text-left">
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex item-center"
                          : "",
                        onClick: () => {
                          const currentSort = sorting.find(
                            (s) => s.id === header.column.id
                          );
                          if (currentSort) {
                            const newSort = {
                              id: header.column.id,
                              desc: !currentSort.desc,
                            };
                            setSorting([newSort]);
                          } else {
                            setSorting([{ id: header.column.id, desc: false }]);
                          }
                        },
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <ArrowUpDown className="ml-2" size={14} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getPaginationRowModel().rows.map((row) => (
              <tr
                key={row.original.id}
                className={
                  isExpired(row.original.expiry_date)
                    ? "bg-red-200 hover:bg-red-100"
                    : "bg-green-200 hover:bg-green-100"
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationBar
        table={table}
        pagination={pagination}
        setPagination={setPagination}
      />
      {selectedTasks.length !== 0 ? (
        <DeleteButton deleteSelectedTasks={deleteSelectedTasks} />
      ) : (
        ""
      )}
    </>
  );
};
