import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push('/login');
    }
  }, []);
  if (token) {
    return <div className=' w-full flex flex-col items-center justify-center  h-screen'></div>;
  } else {
    return <div>Redirecting to login...</div>;
  }
};

export default Index;
