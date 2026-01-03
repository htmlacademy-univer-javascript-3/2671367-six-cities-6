import { User } from '../../user/model/user-types';

export type Review = {
  id: string;
  user: User;
  rating: number;
  comment: string;
  date: string;
};
