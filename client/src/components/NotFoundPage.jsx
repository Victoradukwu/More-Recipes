import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="page-container">
    <div>
      <h1 id="notFoundtext">404</h1>
      <h5 id="notFoundtext1">Page not found</h5>
      <p id="notFoundtext2">
        <Link to="/">
          <span className="fa fa-caret-left fa-lg">Back home</span>
        </Link>
      </p>
    </div>
  </div>
);
export default NotFoundPage;
