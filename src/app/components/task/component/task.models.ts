import { Row } from '@shared/components/table/table.types';

export type UserInfo = {
  _id: number;
  name: string;
  total_posts: number;
  total_comments_on_posts: number;
};
export type UserInfoRow = UserInfo & Row;
