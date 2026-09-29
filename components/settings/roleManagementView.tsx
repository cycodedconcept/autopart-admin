import React, { useState } from 'react';
import { RoleCard } from './roleCard';
import { PermissionMatrix, MatrixRow } from './permissionMatrix';
import { PermissionType } from './permissionCell';

const API_ACCESS_LEVELS = {
  FULL: 'write',
  VIEW_ONLY: 'read_only',
  NONE: 'none',
} as const;

interface PendingPatch {
  moduleId: string;
  roleId: string;
  accessLevel: 'write' | 'read_only' | 'none';
}

const ROLES_DATA = [
  { id: 'super_admin', label: 'Super Admin', count: 2, status: 'LOCKED' },
  { id: 'operations', label: 'Operations', count: 5 },
  { id: 'finance', label: 'Finance', count: 3 },
  { id: 'content_editor', label: 'Content Editor', count: 2 },
  { id: 'support', label: 'Support', count: 2 },
];

const INITIAL_MATRIX_DATA: MatrixRow[] = [
  { id: 'dash', moduleName: 'Dashboard & analytics', permissions: { super_admin: 'FULL', operations: 'FULL', support: 'FULL' } },
  { id: 'sellers', moduleName: 'Sellers & verification', permissions: { super_admin: 'FULL', operations: 'FULL', support: 'VIEW_ONLY' } },
  { id: 'orders', moduleName: 'Orders & delivery', permissions: { super_admin: 'FULL', operations: 'FULL', finance: 'VIEW_ONLY', support: 'FULL' } },
  { id: 'disputes', moduleName: 'Disputes & returns', permissions: { super_admin: 'FULL', operations: 'FULL', support: 'FULL' } },
  { id: 'payouts', moduleName: 'Finance & payouts', permissions: { super_admin: 'FULL', finance: 'FULL' } },
  { id: 'blog', moduleName: 'Blog & content', permissions: { super_admin: 'FULL', finance: 'FULL' } },
  { id: 'comment', moduleName: 'comment moderation', permissions: { super_admin: 'FULL', finance: 'FULL' } },
  { id: 'users', moduleName: 'Users & Buyers', permissions: { super_admin: 'FULL', finance: 'FULL' } },
  { id: 'settings', moduleName: 'System settings', permissions: { super_admin: 'FULL', finance: 'FULL' } },
  { id: 'audit', moduleName: 'Audit log', permissions: { super_admin: 'FULL', finance: 'FULL' } },
];

export const RolesManagementView: React.FC = () => {
  const [matrixData, setMatrixData] = useState<MatrixRow[]>(INITIAL_MATRIX_DATA);
  
  // 1. Maintain a master record of the raw DB state to compare changes against
  const [initialDbSnapshot] = useState<MatrixRow[]>(JSON.parse(JSON.stringify(INITIAL_MATRIX_DATA)));
  
  // 2. Local memory buffer holding your active modifications
  const [pendingChanges, setPendingChanges] = useState<Record<string, PendingPatch>>({});

  const handlePermissionChange = (rowId: string, roleId: string, nextType: PermissionType) => {
    // Instantly reflect state changes visually in the table grid UI
    setMatrixData((prevRows) =>
      prevRows.map((row) => {
        if (row.id !== rowId) return row;
        return {
          ...row,
          permissions: { ...row.permissions, [roleId]: nextType },
        };
      })
    );

    const changeKey = `${rowId}_${roleId}`;
    
    // Find what value this cell originally held in the database snapshot
    const originalRow = initialDbSnapshot.find(r => r.id === rowId);
    const originalDbValue = originalRow?.permissions[roleId] || 'NONE';

    // 3. Optimization Check: If the user toggled back to the original value, remove it from the queue
    if (nextType === originalDbValue) {
      setPendingChanges((prev) => {
        const updated = { ...prev };
        delete updated[changeKey];
        return updated;
      });
    } else {
      // Otherwise, update or append the payload object inside our pending local queue
      setPendingChanges((prev) => ({
        ...prev,
        [changeKey]: {
          moduleId: rowId,
          roleId: roleId,
          accessLevel: API_ACCESS_LEVELS[nextType],
        },
      }));
    }
  };

  // 4. Execution: Dispatches the prepared payload changes objects straight to the DB layer
  const handleSaveMatrix = async () => {
    // Extract our finalized payload objects list
    const preparedPayloads = Object.values(pendingChanges);

    if (preparedPayloads.length === 0) {
      alert('No database modifications detected to execute.');
      return;
    }

    try {
      // Map all payload objects to concurrent PATCH requests execution promises
      const databaseUpdates = preparedPayloads.map((payload) =>
        fetch('/api/admin/roles/permissions', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload), // Sends the exact payload format object required
        }).then((res) => {
          if (!res.ok) throw new Error(`DB Write failed for module ${payload.moduleId}`);
          return res;
        })
      );

      // Save changes to database concurrently
      await Promise.all(databaseUpdates);

      alert('Database updated successfully!');
      
      // Wipe the changes queue clean and synchronize current state as the new database baseline snapshot
      setPendingChanges({});
      // window.location.reload(); // Optional: or re-fetch initial server state here
    } catch (error) {
      console.error('Database write exception:', error);
      alert('Database update transaction suspended due to write error.');
    }
  };

  const hasUnsavedChanges = Object.keys(pendingChanges).length > 0;

  return (
    <div className=" min-h-screen">
      <div className="flex flex-wrap gap-4 mb-4">
        {ROLES_DATA.map((role) => (
          <RoleCard 
            key={role.id}
            title={role.label}
            count={role.count}
            statusText={role.status}
          />
        ))}
      </div>

      <PermissionMatrix 
        roles={ROLES_DATA} 
        rows={matrixData} 
        onCellChange={handlePermissionChange} 
      />

      {/* Action Footer Button with Dynamic Styles */}
      <div className="flex justify-end mt-6">
        <button 
          onClick={handleSaveMatrix}
          disabled={!hasUnsavedChanges}
          className={`text-xs font-bold px-6 py-2.5 rounded-md transition-all shadow-sm ${
            hasUnsavedChanges 
              ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
          }`}
        >
          {hasUnsavedChanges ? `Save matrix (${hasUnsavedChanges} changes)` : 'Save matrix'}
        </button>
      </div>
    </div>
  );
};
