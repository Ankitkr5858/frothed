import { Navigate, useRoutes } from 'react-router-dom';

import MainLayout from 'src/layouts/main';
import { PATH_AFTER_LOGIN } from 'src/config-global';
import OverviewoperatorPage from 'src/pages/dashboard/operator';

import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    {
      path: '/',
      element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    },

    // ----------------------------------------------------------------------

    {
      path: '/dashboard',
      element: <Navigate to="/dashboard/operator" replace />,
    },

    // SET INDEX PAGE WITH HOME PAGE
    {
      path: '/',
      element: (
        <MainLayout>
          <OverviewoperatorPage />
        </MainLayout>
      ),
    },

    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
