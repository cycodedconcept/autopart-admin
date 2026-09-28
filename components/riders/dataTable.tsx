import { useState } from "react";
import { ActionsMenuSeller } from "../atoms/actionMenuSeller";
import { ActionsMenuLogistics } from "./actionMenu";

export interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
  align?: "left" | "right" | "center";
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onActionClick?: (id: number, action: string) => void;
}

export function DataTable<T extends { id: number }>({
  columns,
  data,
  onActionClick,
}: DataTableProps<T>) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  return (
    <div className="w-full overflow-x-auto bg-white border border-lightborder rounded-lg min-h-60">
      <table className="w-full min-w-max table-auto text-left border-collapse capitalize">
        <thead>
          <tr className="border-b border-gray-100 bg-background">
            {columns.map((column, idx) => (
              <th
                key={idx}
                className={`p-4 text-xs font-medium text-navgray tracking-wider ${
                  column.align === "right"
                    ? "text-right"
                    : column.align === "center"
                      ? "text-center"
                      : "text-left"
                }`}
              >
                {column.header}
              </th>
            ))}
            <th className="p-4 w-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((item: T, rowIdx: number) => {
              return (
                <tr
                  key={rowIdx}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {columns.map((column, colIdx) => (
                    <td
                      key={colIdx}
                      className={`p-4 text-sm  ${
                        column.align === "right"
                          ? "text-right"
                          : column.align === "center"
                            ? "text-center"
                            : "text-left"
                      } ${colIdx === 0 ? "text-dark font-medium" : "text-navgray"}`}
                    >
                      {column.accessor(item)}
                    </td>
                  ))}
                  <td className="p-4 text-right">
                    {columns[0].header === "Company" ? <ActionsMenuLogistics
                      isOpen={openMenuId === item.id}
                      onToggle={() =>
                        setOpenMenuId(openMenuId === item.id ? null : item.id)
                      }
                      onAction={(action) => onActionClick?.(item.id, action)}
                    /> : <ActionsMenuSeller
                      isOpen={openMenuId === item.id}
                      onToggle={() =>
                        setOpenMenuId(openMenuId === item.id ? null : item.id)
                      }
                      onAction={(action) => onActionClick?.(item.id, action)}
                    />
                  }
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="">
              <td colSpan={7} className="py-8 text-center text-navgray">
                No Company or Rider data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
