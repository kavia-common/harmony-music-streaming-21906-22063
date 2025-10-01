/* SearchBar skeuomorphic:
   - Debounced navigation; input is recessed with soft inner shadow.
   - Accepts optional `variant="sunken"` to ensure correct class composition. */
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchBar({ variant = 'sunken' }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [value, setValue] = useState(params.get('q') || '');
  const debounced = useDebounce(value, 300);

  useEffect(() => {
    if (debounced) {
      navigate(`/search?q=${encodeURIComponent(debounced)}`);
    }
  }, [debounced, navigate]);

  const cls = ['input'];
  if (variant === 'sunken') cls.push('skeu-sunken');

  return (
    <input
      className={cls.join(' ')}
      placeholder="Search songs or artists..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      aria-label="Search"
      style={{ paddingLeft: '14px', backgroundPosition: '10px center' }}
    />
  );
}

function useDebounce(val, delayMs) {
  const [v, setV] = useState(val);
  useEffect(() => {
    const t = setTimeout(() => setV(val), delayMs);
    return () => clearTimeout(t);
  }, [val, delayMs]);
  return useMemo(() => v, [v]);
}
