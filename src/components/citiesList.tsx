import { FC } from 'react';
import { CitiesListProps } from '../interface/interface';

export const CitiesList: FC<CitiesListProps> = ({
  cities,
  currentCity,
  onClick,
}) => (
  <div className="tabs">
    <section className="locations container">
      <h1 className="visually-hidden">Cities</h1>
      <ul className="locations__list tabs__list">
        {cities.map((city) => {
          const isActive = city.name === currentCity.name;

          return (
            <li className="locations__item" key={city.name}>
              <a
                className={`locations__item-link tabs__item ${
                  isActive ? 'tabs__item--active' : ''
                }`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onClick(city);
                }}
              >
                <span>{city.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  </div>
);
