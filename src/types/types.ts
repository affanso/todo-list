import type { Dispatch, SetStateAction } from "react";
import type { Table } from "@tanstack/react-table";

export interface Todo {
  id: string;
  title: string;
  description: string;
  created_at: string;
  expiry_date: string;
}

export interface formProps {
  //setIsAddTask: (value: boolean) => void;
  setIsAddTask: Dispatch<SetStateAction<boolean>>;
}

export interface DeleteButtonProps {
  deleteSelectedTasks: () => void;
}

type StatusFilter = "all" | "expired" | "pending";

export interface FilterGroupButtonsProps {
  statusFilter: StatusFilter;
  setStatusFilter: Dispatch<SetStateAction<StatusFilter>>;
}

export interface PaginationBarProps {
  table: Table<Todo>;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: Dispatch<
    SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
}

export interface SearchBarProps {
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
}
