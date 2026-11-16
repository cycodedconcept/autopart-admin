import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // 👈 Imported query tools
import { RoleCard } from './roleCard';
import { PermissionMatrix, MatrixRow } from './permissionMatrix';
import { PermissionType } from './permissionCell';
import { useAdminProfileQuery } from '@/lib/queries';

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

// Helper function to translate backend string arrays into internal UI grid state types
const getPermissionFromBackend = (
  permissions: string[], 
  prefixes: string[], 
  writeSuffixes: string[] = ['.manage', '.verify', '.resolve', '.approve'], 
  readSuffixes: string[] = ['.read', '.read_self']
): PermissionType => {
  const hasFull = permissions.some(p => 
    prefixes.some(prefix => writeSuffixes.some(suffix => p === `${prefix}${suffix}`))
  );
  if (hasFull) return 'FULL';

  const hasReadOnly = permissions.some(p => 
    prefixes.some(prefix => readSuffixes.some(suffix => p === `${prefix}${suffix}`))
  );
  if (hasReadOnly) return 'VIEW_ONLY';

  return 'NONE';
};

const buildMatrixFromPermissions = (rawPermissions: string[]): MatrixRow[] => [
  { id: 'dash', moduleName: 'Dashboard & analytics', permissions: { super_admin: 'FULL', support: getPermissionFromBackend(rawPermissions, ['dashboard']) } },
  { id: 'sellers', moduleName: 'Sellers & verification', permissions: { super_admin: 'FULL', support: getPermissionFromBackend(rawPermissions, ['sellers']) } },
  { id: 'orders', moduleName: 'Orders & delivery', permissions: { super_admin: 'FULL', support: getPermissionFromBackend(rawPermissions, ['orders', 'logistics']) } },
  { id: 'disputes', moduleName: 'Disputes & returns', permissions: { super_admin: 'FULL', support: getPermissionFromBackend(rawPermissions, ['disputes']) } },
  { id: 'payouts', moduleName: 'Finance & payouts', permissions: { super_admin: 'FULL', support: getPermissionFromBackend(rawPermissions, ['payouts']) } },
  { id: 'blog', moduleName: 'Blog & content', permissions: { super_admin: 'FULL', support: getPermissionFromBackend(rawPermissions, ['blog_posts', 'blog_categories', 'blog_tags']) } },
  { id: 'comment', moduleName: 'comment moderation', permissions: { super_admin: 'FULL', support: getPermissionFromBackend(rawPermissions, ['blog_comments']) } },
  { id: 'users', moduleName: 'Users & Buyers', permissions: { super_admin: 'FULL', support: getPermissionFromBackend(rawPermissions, ['users']) } },
  { id: 'settings', moduleName: 'System settings', permissions: { super_admin: 'FULL', support: getPermissionFromBackend(rawPermissions, ['config']) } },
  { id: 'audit', moduleName: 'Audit log', permissions: { super_admin: 'FULL', support: getPermissionFromBackend(rawPermissions, ['audit_logs']) } },
];

export const RolesManagementView: React.FC = () => {
  // 1. Core local states for matrix manipulation tracking
  const [matrixData, setMatrixData] = useState<MatrixRow[]>([]);
  const [initialDbSnapshot, setInitialDbSnapshot] = useState<MatrixRow[]>([]);
  const [pendingChanges, setPendingChanges] = useState<Record<string, PendingPatch>>({});

  // 2. TanStack Query fetching the source array
  const { data, isLoading, error } = useAdminProfileQuery()

  // 3. Synchronize TanStack query cache array down into your interactive local view grid
  useEffect(() => {
    if (data?.data?.permissions) {
      const structuralMatrix = buildMatrixFromPermissions(data?.data?.permissions);
      setMatrixData(structuralMatrix);
      setInitialDbSnapshot(JSON.parse(JSON.stringify(structuralMatrix)));
      setPendingChanges({}); // Clear any residual changes when fresh server data loads
    }
  }, [data?.data?.permissions]);

  const getFullAccessCountForRole = (roleId: string): number => {
    return matrixData.reduce((total, row) => {
      return row.permissions[roleId] === 'FULL' ? total + 1 : total;
    }, 0);
  };

  // 4. TanStack Mutation handles background pipeline network updates
//   const saveMatrixMutation = useMutation({
//     mutationFn: async (payloads: PendingPatch[]) => {
//       const updates = payloads.map((payload) =>
//         fetch('/api/admin/roles/permissions', {
//           method: 'PATCH',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload),
//         }).then((res) => {
//           if (!res.ok) throw new Error(`Write failed for ${payload.moduleId}`);
//           return res;
//         })
//       );
//       await Promise.all(updates);
//     },
//     onSuccess: () => {
//       alert('Database updated successfully!');
//       // Invalidate the cache to trigger a clean background refresh cycle
//       queryClient.invalidateQueries({ queryKey: ['adminPermissions'] });
//     },
//     onError: (err) => {
//       console.error(err);
//       alert('Failed to sync updates down to database storage.');
//     }
//   });

  const handlePermissionChange = (rowId: string, roleId: string, nextType: PermissionType) => {
    if (roleId === 'super_admin') return;

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
    const originalRow = initialDbSnapshot.find(r => r.id === rowId);
    const originalDbValue = originalRow?.permissions[roleId] || 'NONE';

    if (nextType === originalDbValue) {
      setPendingChanges((prev) => {
        const updated = { ...prev };
        delete updated[changeKey];
        return updated;
      });
    } else {
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

  const handleSaveMatrix = () => {
    const preparedPayloads = Object.values(pendingChanges);
    if (preparedPayloads.length === 0) return;
    
    // Execute the TanStack mutation trigger loop
    // saveMatrixMutation.mutate(preparedPayloads);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-xs font-medium text-gray-400">Loading permission profiles matrix...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-xs font-semibold text-red-500">Error: {(error as Error).message}</div>;
  }

  const hasUnsavedChanges = Object.keys(pendingChanges).length > 0;

  return (
    <div className="min-h-screen">
      <div className="flex flex-wrap gap-4 mb-4">
        {ROLES_DATA.map((role) => (
          <RoleCard 
            key={role.id}
            title={role.label}
            count={getFullAccessCountForRole(role.id)} 
            statusText={role.status}
          />
        ))}
      </div>

      <PermissionMatrix 
        roles={ROLES_DATA} 
        rows={matrixData} 
        onCellChange={handlePermissionChange} 
      />

      {/* <div className="flex justify-end mt-6">
        <button 
          onClick={handleSaveMatrix}
          disabled={!hasUnsavedChanges || saveMatrixMutation.isPending}
          className={`text-xs font-bold px-6 py-2.5 rounded-md transition-all shadow-sm ${
            hasUnsavedChanges && !saveMatrixMutation.isPending
              ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
          }`}
        >
          {saveMatrixMutation.isPending 
            ? 'Saving matrix changes...' 
            : hasUnsavedChanges 
            ? `Save matrix (${Object.keys(pendingChanges).length} changes)` 
            : 'Save matrix'}
        </button>
      </div> */}
    </div>
  );
};
