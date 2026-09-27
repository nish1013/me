import React, { useEffect, useState } from 'react';

interface CountUpProps {
  to: number;
}

const STEP_MS = 110;

export default function CountUp({ to }: CountUpProps) {
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    let n = 0;
    setValue(0);
    const timer = window.setInterval(() => {
      n += 1;
      setValue(n);
      if (n >= to) window.clearInterval(timer);
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [to]);

  return <b className="ln-display">{value}</b>;
}
