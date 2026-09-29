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

interface BlogPostsResponse {
  success: boolean;
  data: {
    posts: BlogPost[];
    pagination: Pagination;
  };
  message: string;
}
