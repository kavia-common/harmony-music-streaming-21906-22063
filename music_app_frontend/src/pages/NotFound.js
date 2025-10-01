import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <div className="h1">404</div>
      <div className="muted" style={{ marginBottom: 12 }}>Page not found</div>
      <Link to="/browse" className="btn">Go Home</Link>
    </div>
  );
}
