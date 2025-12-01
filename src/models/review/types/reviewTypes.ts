import { User } from '../../user/types/userTypes';

export type Review = {
  id: string;
  user: User;
  rating: number;
  comment: string;
  date: string;
};
