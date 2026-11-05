"use client";
import { Edit2, Trash2 } from "lucide-react";

export interface CategoryItem {
  id?: number;
  name: string;
  slug: string;
  description: string;
  postsCount: number;
  color: string; 
}

interface CategoriesTableProps {
  categories: CategoryItem[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function CategoriesTable({ categories, onEdit, onDelete }: CategoriesTableProps) {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Categories</h2>
          <p className="text-xs text-navgray mt-0.5">Each post belongs to exactly one category</p>
        </div>
        <span className="text-xs text-navgray">{categories.length} total</span>
      </div>

      {/* Table Structure */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-navgray font-medium uppercase tracking-wider">
              <th className="pb-3 w-1/4">Name</th>
              <th className="pb-3 w-1/5">Slug</th>
              <th className="pb-3 w-1/3">Description</th>
              <th className="pb-3 text-center w-1/12">Posts</th>
              <th className="pb-3 text-center w-1/12">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-gray-600">
            {categories.length > 0 ? categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 font-semibold text-gray-900 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${category.color}`} />
                  {category.name}
                </td>
                <td className="py-4 text-navgray">{category.slug}</td>
                <td className="py-4 text-navgray truncate max-w-xs">{category.description}</td>
                <td className="py-4 text-center font-medium text-gray-900">{category.postsCount}</td>
                <td className="py-4">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      onClick={() => category?.id && onEdit(category?.id)}
                      className="p-1 text-navgray hover:text-gray-600 transition-colors"
                      title="Edit Category"
                    >
                    <Edit2 className="w-5"/>
                    </button>
                    <button
                      onClick={() => category?.id &&onDelete(category?.id)}
                      className="p-1 text-navgray hover:text-red-500 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-5"/>
                    </button>
                  </div>
                </td>
              </tr>
            )): <tr>
              <td colSpan={5} className="text-center text-lighttext font-medium text-sm pt-4">No category yet</td>
              </tr>}
          </tbody>
        </table>
      </div>

      {/* Notice Footer */}
      <p className="text-[11px] text-navgray leading-relaxed mt-6 pt-4 border-t border-gray-100">
        Deleting a category moves its posts to <span className="font-medium text-gray-500">Uncategorised</span>. 
        Slugs are used in public URLs — changing one breaks existing links unless a redirect is added.
      </p>
    </div>
  );
}
