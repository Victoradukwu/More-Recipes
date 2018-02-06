import React from 'react';
const NotFoundPage = (props) => {
  return (
    <div className="page-container">
      <div className="bg" style={{ backgroundColor: '#888888'}}></div>
      <div id = "404text">
      <h1 className="title">404</h1>
      <h5>Page not found</h5>
      </div>
    </div>
  );
};
export default NotFoundPage;