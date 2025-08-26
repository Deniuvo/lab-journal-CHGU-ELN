import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../services/api';

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: string;
  department: string;
  position: string;
  phone: string;
  avatar?: string;
  bio: string;
  is_verified: boolean;
  two_factor_enabled: boolean;
  date_joined: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Context
interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          api.defaults.headers.common['Authorization'] = `Token ${token}`;
          const response = await api.get('/api/users/profile/');
          dispatch({ type: 'AUTH_SUCCESS', payload: response.data });
        } else {
          dispatch({ type: 'AUTH_FAILURE', payload: 'No token found' });
        }
      } catch (error) {
        localStorage.removeItem('authToken');
        delete api.defaults.headers.common['Authorization'];
        dispatch({ type: 'AUTH_FAILURE', payload: 'Authentication failed' });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const response = await api.post('/api/auth/login/', {
        username,
        password,
      });

      const { user } = response.data;
      
      // Store token if provided
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        api.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
      }

      dispatch({ type: 'AUTH_SUCCESS', payload: user });
      toast.success('Login successful!');
      navigate('/');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      toast.error(errorMessage);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post('/api/auth/logout/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      delete api.defaults.headers.common['Authorization'];
      dispatch({ type: 'LOGOUT' });
      toast.success('Logged out successfully');
      navigate('/login');
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Update user function
  const updateUser = (userData: Partial<User>) => {
    if (state.user) {
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { ...state.user, ...userData },
      });
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
