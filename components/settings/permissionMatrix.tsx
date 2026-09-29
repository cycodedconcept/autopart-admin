import React from 'react';
import { PermissionCell, PermissionType } from './permissionCell';

export interface MatrixRow {
  id: string; // Added ID unique identifier for safer array lookups
  moduleName: string;
  permissions: Record<string, PermissionType>;
}

interface PermissionMatrixProps {
  roles: { id: string; label: string }[];
  rows: MatrixRow[];
  onCellChange: (rowId: string, roleId: string, nextType: PermissionType) => void;
}

export const PermissionMatrix: React.FC<PermissionMatrixProps> = ({ roles, rows, onCellChange }) => {
  // Cycle order logic: NONE -> FULL -> VIEW_ONLY -> NONE
  const getNextPermission = (current: PermissionType): PermissionType => {
    if (current === 'NONE') return 'FULL';
    if (current === 'FULL') return 'VIEW_ONLY';
    return 'NONE';
  };

  return (
    <div className="w-full bg-white rounded-lg border border-lightborder p-4  mt-4">
      <div className="mb-6">
        <h2 className="text-sm font-medium text-dark">Permission matrix</h2>
        <p className="text-xs text-navgray mt-1">Tick to grant. A grayed row means the module is unavailable to that role entirely.</p>
      </div>

      <div className="overflow-x-auto ">
        <table className="w-full table-fixed text-left border-collapse min-w-lg">
          <thead>
            <tr className="border-b border-lightborder">
              <th className="w-1/4 pb-3 text-xs font-medium text-navgray uppercase ">Module</th>
              {roles.map((role) => (
                <th key={role.id} className="pb-3 text-center text-xs font-medium text-navgray uppercase ">
                  {role.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/20 transition-colors">
                <td className="py-2 pr-3 text-sm font-medium text-dark border-b border-lightborder">
                  {row.moduleName}
                </td>
                {roles.map((role) => {
                  const currentType = row.permissions[role.id] || 'NONE';
                  return (
                    <PermissionCell 
                      key={role.id} 
                      type={currentType}
                      onClick={() => onCellChange(row.id, role.id, getNextPermission(currentType))}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
