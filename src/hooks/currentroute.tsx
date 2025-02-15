import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const useCurrentRoute = () => {
  const [currentRoute, setCurrentRoute] = useState('');
  const router = usePathname();

  useEffect(() => {
      setCurrentRoute(router.charAt(1).toUpperCase() + router.split('/')[1].slice(1));
  }, [router]);

  return {
    router,
    currentRoute,
    setCurrentRoute,
  };
};

export default useCurrentRoute;