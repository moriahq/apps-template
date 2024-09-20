import React from 'react';

const routes = [
  {
    path: '/',
    Component: React.lazy(() => import('../pages/demo/Demo')),
  },
];

export default routes;
