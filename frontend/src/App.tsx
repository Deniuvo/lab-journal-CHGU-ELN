import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Components
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Experiments from './pages/Experiments/Experiments';
import ExperimentDetail from './pages/Experiments/ExperimentDetail';
import Protocols from './pages/Protocols/Protocols';
import Analytics from './pages/Analytics/Analytics';
import Users from './pages/Users/Users';
import Profile from './pages/Profile/Profile';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Theme configuration
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007AFF',
      light: '#4DA3FF',
      dark: '#0056CC',
    },
    secondary: {
      main: '#5856D6',
      light: '#7B7AFF',
      dark: '#3E3D99',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F2F2F7',
    },
    text: {
      primary: '#000000',
      secondary: '#8E8E93',
    },
    error: {
      main: '#FF3B30',
    },
    warning: {
      main: '#FF9500',
    },
    success: {
      main: '#34C759',
    },
  },
  typography: {
    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 122, 255, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="experiments" element={<Experiments />} />
                <Route path="experiments/:id" element={<ExperimentDetail />} />
                <Route path="protocols" element={<Protocols />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="users" element={<Users />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: 12,
            },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
