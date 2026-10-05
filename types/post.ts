// export interface PostData {
//   id?: string;
//   title: string;
//   slug: string;
//   readTime: string;
//   content: string;
//   status: 'Draft' | 'Published';
//   publishDate: string;
//   category: string;
// }

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  status?: 'active' | 'inactive';
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  status: 'active' | 'inactive';
}

export interface PostData {
  id: number;
  categoryId: number | null;
  category: BlogCategory;
  title: string;
  slug: string;
  excerpt: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  author?: {
     displayName: string;
  avatarUrl: string | null;
  }
  authorDisplayName: string;
  authorAvatarUrl: string;
  readTimeMinutes: number;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null; // ISO Date string or null when draft
  viewCount: number;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  body: string; // HTML content string
  tags: BlogTag[];
  commentCount: number;
}

// Complete main API response wrapper
export interface CreateBlogPostResponse {
  success: boolean;
  data: PostData;
  message: string;
}


export interface CommentAuthor {
  name: string;
  email: string;
  avatarInitials: string;
  isAuthor?: boolean;
}

export interface CommentItem {
  id: string;
  author: CommentAuthor;
  status: 'PENDING' | 'APPROVED' | 'SPAM';
  timeAgo: string;
  postTitle: string;
  content: string;
  replies?: CommentItem[];
}
