import { useCallback, useEffect, useState } from 'react';

export function useTimeZone(timeZone: string) {
  const fmt = useCallback(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date()),
    [timeZone],
  );
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = window.setInterval(() => setTime(fmt()), 1000);
    return () => window.clearInterval(id);
  }, [fmt]);
  return time;
}
