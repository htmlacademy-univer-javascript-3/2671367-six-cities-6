import { Review } from '../types/reviewTypes';

export const reviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
    },
    rating: 4,
    comment:
      'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24',
  },
  {
    id: '2',
    user: {
      name: 'Anna',
      avatarUrl: 'img/avatar-max.jpg',
    },
    rating: 5,
    comment:
      'Beautiful place with great atmosphere. The host was friendly and helpful. Highly recommend for a weekend stay.',
    date: '2020-08-10',
  },
  {
    id: '3',
    user: {
      name: 'John',
      avatarUrl: 'img/avatar-max.jpg',
    },
    rating: 3,
    comment:
      'The location is nice, but the apartment needs renovation. Still, the view from the balcony was amazing.',
    date: '2021-03-15',
  },
];
