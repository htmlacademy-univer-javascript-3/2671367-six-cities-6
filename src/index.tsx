import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { nearOffers } from './mocks/nearOffers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offers} reviews={reviews} nearOffers={nearOffers} />
  </React.StrictMode>
);
