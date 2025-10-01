/* NotFound page skeuomorphic:
   - Tactile button and clean spacing. */
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="fade-in-up">
      <div className="h1">404</div>
      <div className="muted" style={{ marginBottom: 12 }}>Page not found</div>
      <Link to="/browse" className="btn skeu-bevel skeu-gloss">Go Home</Link>
    </div>
  );
}
