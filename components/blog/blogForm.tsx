"use client";

import React, { useState, useEffect } from "react";
import { SidebarCard, ImageUploadZone } from "./sidebarCard";
import { ArrowLeft } from "lucide-react";
import { PostData } from "../../types/post";
import { RichTextEditor } from "./richText";
import { useCategoryQuery, useDraftPostQueryMutation, usePublishBlogQueryMutation } from "@/lib/queries";
import { toast } from "react-toastify";

export type BlogFormPayload = Pick<
  PostData,
  | "title"
  | "slug"
  | "readTimeMinutes"
  | "body"
  | "status"
  | "publishedAt"
  | "categoryId"
  | "authorDisplayName"
  | "featuredImageUrl"
  | "featuredImageAlt"
> & {
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  file: File | null;
  author?: {displayName: string, avatarUrl: string | null}
};

interface PostEditorFormProps {
  initialData?: Partial<PostData>;
    onSave: (id:number,data: BlogFormPayload) => Promise<void>;
  onCancel: () => void;
}

export const BlogForm: React.FC<PostEditorFormProps> = ({
  initialData,
    onSave,
  onCancel,
}) => {
  const isEditMode = !!initialData?.id;
 
  // 2. Fetch system categories from the marketplace backend cache
  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useCategoryQuery();

  // Adapt this safely depending on whether your API returns a flat array or a nested object wrapper (e.g., categoriesResponse.data)
  const categoriesList = Array.isArray(categoriesResponse)
    ? categoriesResponse
    : categoriesResponse?.data?.categories || [];

  const [formData, setFormData] = useState<BlogFormPayload>({
    title: "",
    slug: "",
    readTimeMinutes: 1,
    body: "",
    status: "draft",
    publishedAt: "",
    categoryId: null,
    authorDisplayName: "",
    featuredImageAlt: "",
    featuredImageUrl: "",
    tags: [],
    metaTitle: "",
    metaDescription: "",
    file: null,
  });

  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPreview, setShowPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const draftPost = useDraftPostQueryMutation()

  useEffect(() => {
    if (initialData) {
      const transformedTags = Array.isArray(initialData.tags)
        ? initialData.tags.map((tag) =>
            typeof tag === "string" ? tag : tag.name,
          )
        : [];

         let formattedPublishDate = "";
      if (initialData.publishedAt) {
        formattedPublishDate = initialData.publishedAt.split("T")[0]; 
      }
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        readTimeMinutes: initialData.readTimeMinutes || 1,
        body: initialData.body || "",
        status: (initialData.status as BlogFormPayload["status"]) || "draft",
        publishedAt: formattedPublishDate,
        categoryId: initialData.categoryId || null,

        authorDisplayName: initialData?.author?.displayName || "",
        featuredImageUrl: initialData.featuredImageUrl || "",
        featuredImageAlt: initialData.featuredImageAlt || "",
        tags:
          transformedTags.length > 0
            ? transformedTags
            : ["Brakes", "Counterfeit", "Lagos"],
        metaTitle: initialData.title || initialData.title || "",
        metaDescription: initialData.excerpt || initialData.excerpt || "",
        file: null,
      });
    }
  }, [initialData]);

  // Set default category automatically once lists load if not already set by edit mode
  useEffect(() => {
    if (!formData.categoryId && categoriesList.length > 0 && !isEditMode) {
      setFormData((prev) => ({
        ...prev,
        categoryId: Number(categoriesList[0].id),
      }));
    }
  }, [categoriesList, formData.categoryId, isEditMode]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: rawTitle,
      //   slug: isEditMode
      //     ? prev.slug
      //     : rawTitle
      //         .toLowerCase()
      //         .replace(/[^a-z0-9]+/g, "-")
      //         .replace(/(^-|-$)+/g, ""),
    }));
  };

  const handleImageChange = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      file: file, // Keeps the raw binary file synchronized with the rest of your state fields
    }));
  };

  const handleOpenPreview = (e: React.MouseEvent) => {
    e.preventDefault();

    if (formData.file) {
      setPreviewImageUrl(URL.createObjectURL(formData.file));
    } else {
      setPreviewImageUrl(formData.featuredImageUrl || "");
    }

    setShowPreview(true);
  };

  const handleSubmit =  async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      //   const multipartPayload = new FormData();

      //   if (formData.file) {
      //     multipartPayload.append("featuredImageUrl", formData.file);
      //   } else {
      //     multipartPayload.append(
      //       "featuredImageUrl",
      //       formData.featuredImageUrl || "",
      //     );
      //   }
      //   multipartPayload.append("title", formData.title);
      //   multipartPayload.append("slug", formData.slug);
      //   multipartPayload.append(
      //     "readTimeMinutes",
      //     String(formData.readTimeMinutes),
      //   );
      //   multipartPayload.append("body", formData.body);
      //   multipartPayload.append("status", formData.status);
      //   multipartPayload.append("publishedAt", formData.publishedAt || "");

      //   // If categoryId is null, send an empty string so the backend doesn't crash on parsing
      //   multipartPayload.append(
      //     "categoryId",
      //     formData.categoryId ? String(formData.categoryId) : "",
      //   );

      //   multipartPayload.append("authorDisplayName", formData.authorDisplayName);
      //   multipartPayload.append(
      //     "featuredImageAlt",
      //     formData.featuredImageAlt || "",
      //   );

      //   // Convert text tags array to a string value your backend can split/parse
      //   multipartPayload.append("tags", JSON.stringify(formData.tags));

      //   // Fallback metadata to the main title if the SEO title is left empty
      //   multipartPayload.append(
      //     "metaTitle",
      //     formData.metaTitle || formData.title,
      //   );
      //   multipartPayload.append(
      //     "metaDescription",
      //     formData.metaDescription || "",
      //   );
      const jsonPayload = {
        ...formData,
        // Convert to ISO 8601 right at the finish line
        publishedAt: formData.publishedAt
          ? new Date(formData.publishedAt).toISOString()
          : null,
        // Ensure numeric primitives are sent safely
        readTimeMinutes: Number(formData.readTimeMinutes),
        categoryId: formData.categoryId ? Number(formData.categoryId) : null,
      };
      if (initialData?.id) {
       await onSave(initialData?.id,jsonPayload);
      }else{
             toast.error("Cannot publish. No post Id");
      }
    } catch (error) {
      console.error("Failed to compile form stream:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDraft = () => {
     try {
      setIsSubmitting(true);

      const jsonPayload = {
        ...formData,
        // Convert to ISO 8601 right at the finish line
        publishedAt: formData.publishedAt
          ? new Date(formData.publishedAt).toISOString()
          : null,
        // Ensure numeric primitives are sent safely
        readTimeMinutes: Number(formData.readTimeMinutes),
        categoryId: formData.categoryId ? Number(formData.categoryId) : null,
      };
    
        draftPost.mutate({  data: jsonPayload });
      
    } catch (error) {
      console.error("Failed to save draft", error);
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col min-w-0 bg-gray-50"
    >
      {/* Top Header Bar */}
      <header className="px-4 py-3 flex items-center justify-between shrink-0 border-b border-lightborder bg-white">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 hover:bg-gray-50 rounded-lg border border-lightborder text-navgray"
          >
            <ArrowLeft size={14} />
          </button>
          <div>
            <h1 className="text-sm font-semibold text-dark">
              {isEditMode ? "Edit post" : "Create new post"}
            </h1>
            <p className="text-[10px] text-navgray">
              {isEditMode
                ? `Modifying ID: ${initialData?.id}`
                : "Drafting clean template"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleOpenPreview}
            className="px-3 py-1.5 border border-lightborder text-navgray rounded-lg text-xs font-semibold hover:bg-gray-50"
          >
            Preview
          </button>
          <button
            type="button"
            onClick={handleDraft}
            className="px-3 py-1.5 border border-lightborder text-navgray rounded-lg text-xs font-semibold hover:bg-gray-50"
          >
            Save Draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-1.5 bg-aorange hover:bg-orange-600 text-white rounded-lg text-xs font-semibold disabled:bg-orange-300"
          >
            {isSubmitting
              ? "Saving..."
              : isEditMode
                ? "Update post"
                : "Publish post"}
          </button>
        </div>
      </header>

      {/* Main Layout Grid */}
      <main className="flex-1 overflow-y-auto p-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white border border-lightborder rounded-lg p-4 space-y-4">
            <div>
              <label className="text-[10px] font-semibold text-navgray uppercase tracking-wider block mb-1">
                Post Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter title text here..."
                required
                className="w-full text-base font-semibold text-dark border border-lightborder rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-aorange"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="text-[10px] font-semibold text-navgray uppercase tracking-wider block mb-1">
                  URL Slug
                </label>
                <div className="flex rounded-lg border border-lightborder overflow-hidden text-xs">
                  <span className="bg-gray-50 px-2.5 py-2 text-navgray border-r border-lightborder select-none">
                    autoparts.ng/blog/
                  </span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    className="w-full px-2 py-2 focus:outline-none text-dark"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-navgray uppercase tracking-wider block mb-1">
                  Read Time (Mins)
                </label>
                <input
                  type="number"
                  value={formData.readTimeMinutes}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      readTimeMinutes: Number(e.target.value),
                    }))
                  }
                  min={1}
                  className="w-full text-xs text-dark border border-lightborder rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-aorange"
                />
              </div>
            </div>
          </div>

          <RichTextEditor
            content={formData.body}
            onChange={(htmlOutput) =>
              setFormData((prev) => ({ ...prev, body: htmlOutput }))
            }
          />
        </div>

        {/* Sidebar Panel */}
        <div className="space-y-4">
          <SidebarCard title="Publishing">
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-semibold text-navgray uppercase tracking-wider block mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as BlogFormPayload["status"],
                    }))
                  }
                  className="w-full text-xs text-dark bg-white border border-lightborder rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-aorange"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-navgray uppercase tracking-wider block mb-1">
                  Publish date
                </label>
                <input
                  type="date"
                  value={formData.publishedAt || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      publishedAt: e.target.value,
                    }))
                  }
                  className="w-full text-xs text-dark border border-lightborder rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-aorange"
                />
              </div>
            </div>
          </SidebarCard>

          <SidebarCard title="Organization">
            <div className="space-y-4">
              {/* Category Dropdown Selection */}
              <div>
                <label className="text-[10px] font-semibold text-navgray uppercase tracking-wider block mb-1">
                  Category
                </label>
                <select
                  disabled={categoriesLoading}
                  value={formData.categoryId ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      categoryId: e.target.value
                        ? Number(e.target.value)
                        : null,
                    }))
                  }
                  className="w-full text-xs text-dark bg-white border border-lightborder rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-aorange disabled:opacity-50"
                >
                  {categoriesLoading ? (
                    <option value="">Loading categories...</option>
                  ) : (
                    <>
                      <option value="">Select a Category</option>
                      {categoriesList.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-navgray uppercase tracking-wider block mb-1">
                  Author
                </label>
                <input
                    type="text"
                    value={formData.authorDisplayName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, authorDisplayName: e.target.value }))
                    }
                    className="w-full text-xs text-dark bg-white border border-lightborder rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-aorange"
                  />
                {/* <select
                  value={formData.authorDisplayName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      authorDisplayName: e.target.value,
                    }))
                  }
                  className="w-full text-xs text-dark bg-white border border-lightborder rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-aorange"
                >
                  <option value="Adebayo Okafor">Adebayo Okafor</option>
                  <option value="Other Author">Other Administrator</option>
                </select> */}
              </div>

              {/* Dynamic Interactive Chip Tags Entry Field */}
              <div>
                <label className="text-[10px] font-semibold text-navgray uppercase tracking-wider block mb-1">
                  Tags
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-orange-50 text-aorange text-[10px] font-medium px-2 py-0.5 rounded border border-orange-100"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            tags: prev.tags.filter((t) => t !== tag),
                          }))
                        }
                        className="hover:text-orange-800 font-bold select-none cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add a tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tagInput.trim()) {
                      e.preventDefault();
                      if (!formData.tags.includes(tagInput.trim())) {
                        setFormData((prev) => ({
                          ...prev,
                          tags: [...prev.tags, tagInput.trim()],
                        }));
                      }
                      setTagInput("");
                    }
                  }}
                  className="w-full text-xs text-dark border border-lightborder rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-aorange"
                />
              </div>
            </div>
          </SidebarCard>

          {/* 3. Media & Brand Asset Card */}
          <SidebarCard title="Featured Image">
            <div className="space-y-3">
              <ImageUploadZone
                // 1. Pass the existing string URL when editing an existing post
                initialImageUrl={formData.featuredImageUrl}
                // 2. Capture the raw File object when the user selects a new image
                onImageChange={handleImageChange}
              />
              <div>
                <label className="text-[10px] font-semibold text-navgray uppercase tracking-wider block mb-1">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  value={formData.featuredImageAlt || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      featuredImageAlt: e.target.value,
                    }))
                  }
                  placeholder="Describe image context..."
                  className="w-full text-xs text-dark border border-lightborder rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-aorange"
                />
              </div>
            </div>
          </SidebarCard>

          <SidebarCard title="SEO">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-semibold text-navgray uppercase tracking-wider block">
                    Meta Title
                  </label>
                  <span className="text-[9px] text-navgray font-medium">
                    {formData.metaTitle.length}/60
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={60}
                  placeholder="Enter clean search engine headline..."
                  value={formData.metaTitle}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      metaTitle: e.target.value,
                    }))
                  }
                  className="w-full text-xs text-dark border border-lightborder rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-aorange"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-semibold text-navgray uppercase tracking-wider block">
                    Meta Description
                  </label>
                  <span className="text-[9px] text-navgray font-medium">
                    {formData.metaDescription.length}/160
                  </span>
                </div>
                <textarea
                  maxLength={160}
                  rows={3}
                  placeholder="Summarize the article content context parameters safely here..."
                  value={formData.metaDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      metaDescription: e.target.value,
                    }))
                  }
                  className="w-full text-xs text-dark border border-lightborder rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-aorange resize-none"
                />
              </div>
            </div>
          </SidebarCard>
        </div>
      </main>

      {/* Dynamic Preview Modal Component Backdrop Overlay */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden animate-slide-up border border-lightborder">
            {/* Modal Control Sticky Header */}
            <div className="px-4 py-3 bg-gray-50 border-b border-lightborder flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="bg-orange-50 text-aorange text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider border border-orange-100">
                  Preview Sandbox
                </span>
                <p className="text-xs text-navgray">
                  Visual layout snapshot of your current inputs.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="text-xs font-semibold text-navgray hover:text-dark px-2.5 py-1.5 bg-white border border-lightborder rounded-lg shadow-2xs hover:bg-gray-50 transition-colors"
              >
                Close Preview
              </button>
            </div>

            {/* Scrollable Layout Content View container */}
            <div className="flex-1 overflow-y-auto p-6 bg-white space-y-6">
              {/* Meta metrics read rows */}
              <div className="flex items-center gap-2 text-xs text-navgray">
                <span className="font-semibold text-aorange uppercase tracking-wider">
                  Market Insights
                </span>
                <span>•</span>
                <span>{formData.readTimeMinutes || 1} Min Read</span>
              </div>

              {/* Dynamic Title */}
              <h1 className="text-2xl font-extrabold text-dark tracking-tight leading-snug">
                {formData.title || "Untitled Blog Post"}
              </h1>

              {/* Author Data info column */}
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center font-bold text-xs text-aorange uppercase">
                  {formData.authorDisplayName?.charAt(0) || "A"}
                </div>
                <div>
                  <p className="text-xs font-semibold text-dark">
                    {formData.authorDisplayName}
                  </p>
                  <p className="text-[9px] text-navgray">
                    Drafted on{" "}
                    {new Date().toLocaleDateString("en-NG", {
                      dateStyle: "medium",
                    })}
                  </p>
                </div>
              </div>

              {/* Live Preview System Image Render Block */}
              {previewImageUrl && (
                <div className="w-full aspect-video rounded-lg overflow-hidden border border-lightborder bg-gray-50 shadow-2xs">
                  <img
                    src={previewImageUrl}
                    alt={
                      formData.featuredImageAlt ||
                      "Post layout featured media visual banner graphic assets"
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Form RichText content output parsing wrapper */}
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    formData.body ||
                    "<p className='text-slate-300 italic text-xs'>Write some content inside the editor panel to populate this layout preview body block...</p>",
                }}
                className="prose prose-orange max-w-none text-dark leading-relaxed text-xs space-y-3"
              />

              {/* Mapped string preview tag array labels loop */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-50 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded border border-gray-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
