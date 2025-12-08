import { User } from '../../user/model/userTypes';

export type Review = {
  id: string;
  user: User;
  rating: number;
  comment: string;
  date: string;
};
