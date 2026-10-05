"use client";

import { BlogForm } from "@/components/blog/blogForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useBlogsQuery, usePublishBlogQueryMutation } from "@/lib/queries";

export default function AddEditPage() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const getId = Number(searchParams.get("postid"));
  const getPage = Number(searchParams.get("page"));

  const { data } = useBlogsQuery(
    getPage,
    10,
    "",
    "",
  );

  const activeEdit = data?.data?.posts?.find((each) => each.id === getId);

 
  const publishPost = usePublishBlogQueryMutation();

  const handleDataPersistenceSubmit = async (
    id: number,
    finalizedPayload: any,
  ) => {
    if (!activeEdit) {
      return publishPost.mutate({ id: id, data: finalizedPayload });
    }
  };
  const handleClose = () => {
    router.push("/content/blog-posts");
  };

  return (
    <div className="min-h-screen ">
      <BlogForm
        initialData={activeEdit}
        onSave={handleDataPersistenceSubmit}
        onCancel={handleClose}
      />
    </div>
  );
}
