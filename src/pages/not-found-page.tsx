import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => (
  <div>
    <main id="main" className="grid md:grid-cols-2 place-content-center py-6">
      <div className="text-center px-6 relative z-10">
        <h1 className="text-8xl font-bold mb-2">404</h1>
        <div className="text-3xl mb-2">uh oh page not found</div>
        <div className="mb-2">
          while you&apos;re here, you can check out some of our amazing
          apartments!
        </div>
        <Link to="/" className="text-orange-600 hover:text-orange-500">
          Take me home &rarr;
        </Link>
      </div>
      <div className="hidden md:grid"></div>
    </main>
  </div>
);

export default NotFoundPage;
