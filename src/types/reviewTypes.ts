export type Review = {
  id: string;
  user: user;
  rating: number;
  comment: string;
  date: string;
};

export type user = {
  name: string;
  avatarUrl: string;
};

export type Reviews = Review[];
