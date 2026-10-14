interface Author {
  displayName: string;
  avatarUrl: string | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  author: Author;
  category: Category;
  readTimeMinutes: number;
  publishedAt: string; // ISO 8601 Date string
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BlogPostsResponse {
  success: boolean;
  data: {
    posts: BlogPost[];
    pagination: Pagination;
  };
  message: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  status: 'active' | 'inactive';
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

export interface BlogCategoryFilters {
  status: 'all' | 'active' | 'inactive';
  search: string | null;
}

export interface BlogCategoriesResponse {
  success: boolean;
  data: {
    categories: BlogCategory[];
    filters: BlogCategoryFilters;
  };
  message: string;
}

// Blog comments (GET /admin/blog/comments)
export type BlogCommentStatus = "pending" | "approved" | "spam" | "rejected";

export interface BlogComment {
  id: number;
  postId?: number;
  parentId?: number | null;
  post?: { id: number; title: string; slug: string } | null;
  postTitle?: string;
  name?: string;
  email?: string;
  authorName?: string;
  authorEmail?: string;
  isAuthor?: boolean;
  body: string;
  status: BlogCommentStatus;
  createdAt: string; // ISO Date String
  replies?: BlogComment[];
}

export interface BlogCommentFilters {
  postId: number | null;
  status: BlogCommentStatus | null;
  search: string | null;
}

export interface BlogCommentsResponse {
  success: boolean;
  data: {
    comments: BlogComment[];
    pagination: Pagination;
    filters: BlogCommentFilters;
  };
  message: string;
}
