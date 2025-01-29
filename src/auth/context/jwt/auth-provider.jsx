import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------
const userData = {
  id: '8864c717-587d-472a-929a-8e5f298024da-0',
  displayName: 'Jaydon Frankie',
  email: 'frothid',
  password: 'kapptek1234.',
  photoURL: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
  phoneNumber: '+40 777666555',
  country: 'United States',
  address: '90210 Broadway Blvd',
  state: 'California',
  city: 'San Francisco',
  zipCode: '94116',
  about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
  role: 'admin',
  isPublic: true,
};
const hardCodedAccessToken = 'true';

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    sessionStorage.removeItem('accessToken');
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        // const response = await axios.get(endpoints.auth.me);

        // const { user } = response.data;

        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...userData,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  // const login = useCallback(async (email, password) => {
  //   const data = {
  //     email,
  //     password,
  //   };

  //   const response = await axios.post(endpoints.auth.login, data);

  //   const { accessToken, user } = response.data;
  //   console.log('accessToken', accessToken, user);

  //   setSession(hardCodedAccessToken);

  //   dispatch({
  //     type: 'LOGIN',
  //     payload: {
  //       userData: {
  //         ...userData,
  //         hardCodedAccessToken,
  //       },
  //     },
  //   });
  // }, []);
  const login = useCallback(async (email, password) => {
    if (email === userData.email && password === userData.password) {
      setSession(hardCodedAccessToken);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: {
            ...userData,
            accessToken: hardCodedAccessToken,
          },
        },
      });
    } else {
      throw new Error('Username or Password is incorrect');
    }
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const data = {
      email,
      password,
      firstName,
      lastName,
    };

    const response = await axios.post(endpoints.auth.register, data);

    const { accessToken, user } = response.data;

    sessionStorage.setItem(STORAGE_KEY, accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user: {
          ...user,
          accessToken,
        },
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
