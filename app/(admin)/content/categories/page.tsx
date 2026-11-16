"use client";

import React, { useState } from "react";
import CategoriesTable, { CategoryItem } from "@/components/blog/category/table";
import AddCategoryForm, { CategoryFormData } from "@/components/blog/category/form";
import { useBlogCategoryQueryMutation } from "@/lib/queries";

const INITIAL_MOCK_DATA: CategoryItem[] = [
  // { id: "1", name: "Fake Parts", slug: "fake-parts", description: "Counterfeit detection", postsCount: 14, color: "bg-orange-500" },
  // { id: "2", name: "Buying Guides", slug: "buying-guides", description: "How to choose parts", postsCount: 12, color: "bg-blue-600" },
  // { id: "3", name: "Maintenance", slug: "maintenance", description: "Servicing and repair", postsCount: 11, color: "bg-emerald-600" },
  // { id: "4", name: "Seller Stories", slug: "seller-stories", description: "Vendor spotlights", postsCount: 6, color: "bg-indigo-600" },
  // { id: "5", name: "Company News", slug: "company-news", description: "Platform announcements", postsCount: 4, color: "bg-amber-800" },
];

export default function CategoriesDashboard() {
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_MOCK_DATA);
  const blogMutataion = useBlogCategoryQueryMutation()

  const handleAddCategory = (formData: CategoryFormData) => {
    const newCategory: CategoryItem = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      postsCount: 0,
      color: formData.color,
    };
    blogMutataion.mutate({data: newCategory})
  };

  const handleEdit = (id: number) => {
    console.log("Trigger edit modal/action for ID:", id);
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Table View */}
        <div className="lg:col-span-2">
          <CategoriesTable 
            categories={categories} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        </div>
        
        {/* Right Side: Form View */}
        <div className="lg:col-span-1">
          <AddCategoryForm onSubmit={handleAddCategory} />
        </div>
      </div>
    </main>
  );
}
