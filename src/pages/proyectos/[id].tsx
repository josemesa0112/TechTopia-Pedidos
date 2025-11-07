import React from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>Proyecto ID: {id}</div>;
};

export default Index;
