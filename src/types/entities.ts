export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  birthdate?: Date;
  phone?: string;
  gender?: string;
  avatar?: string;
  bio?: string;
}

export interface IPost {
  id: string;
  user_id: string;
  media?: string;
  description?: string;
  created_at: Date;
  updated_at?: Date;
}

export interface ILike {
  id: string;
  user_id: string;
  target_id: string;
  target_type: string;
  created_at: Date;
}

export interface IShare {
  id: string;
  user_id: string;
  post_id: string;
  created_at: Date;
}

export interface IComment {
  id: string;
  post_id: string;
  user_id: string;
  parent_comment_id?: string;
  content: string;
  created_at: Date;
  updated_at?: Date;
}

export interface IFollow {
  id: string;
  follower_id: string;
  followed_id: string;
  created_at: Date;
}

export interface ITag {
  id: string;
  name: string;
}

export interface IPostTag {
  id: string;
  post_id: string;
  tag_id: string;
}

export interface IReport {
  id: string;
  target_id: string;
  target_type: string;
  user_id: string;
  reason: string;
  created_at: Date;
  status: string;
}

export interface IReportCounter {
  target_id: string;
  target_type: string;
  count: number;
  updated_at: Date;
}
