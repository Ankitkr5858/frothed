// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  // AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  page403: '/403',
  page404: '/404',
  page500: '/500',

  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },

  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,

    general: {
      operator: `${ROOTS.DASHBOARD}/operator`,
      health: `${ROOTS.DASHBOARD}/health`,
    },
  },
};
