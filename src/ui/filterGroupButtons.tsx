import type { FilterGroupButtonsProps } from "../types/types";

export const FilterGroupButtons = ({
  statusFilter,
  setStatusFilter,
}: FilterGroupButtonsProps) => {
  return (
    <div className="mt-2 inline-flex rounded-md shadow-xs" role="group">
      <button
        type="button"
        onClick={() => setStatusFilter("all")}
        className={
          statusFilter === "all"
            ? "px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg bg-gray-100"
            : "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100"
        }
      >
        Show All
      </button>
      <button
        type="button"
        onClick={() => setStatusFilter("expired")}
        className={
          statusFilter === "expired"
            ? "px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 bg-gray-100"
            : "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100"
        }
      >
        Expired
      </button>
      <button
        type="button"
        onClick={() => setStatusFilter("pending")}
        className={
          statusFilter === "pending"
            ? "px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-e-lg bg-gray-100"
            : "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100"
        }
      >
        Pending
      </button>
    </div>
  );
};
