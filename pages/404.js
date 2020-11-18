import React from 'react';

export default function PageNotFound() {
  return (
    <div className="error-404">
      <img src="/img/error_page/404.png"/>
      <span>Page Not Found</span>
      <p>We are sorry but the page you are looking for does not exist or an other error occured.</p>
    </div>
  )
}