/* SearchBar modernized:
   - Debounced navigation, improved placeholder and touch target spacing. */
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [value, setValue] = useState(params.get('q') || '');
  const debounced = useDebounce(value, 300);

  useEffect(() => {
    if (debounced) {
      navigate(`/search?q=${encodeURIComponent(debounced)}`);
    }
  }, [debounced, navigate]);

  return (
    <input
      className="input"
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
