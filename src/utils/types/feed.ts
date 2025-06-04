export interface Post {
  id: number;
  title: string;
  content: string;
  media_url: string;
  media_upload_time: string;
  account_id: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_deleted: boolean;
}
