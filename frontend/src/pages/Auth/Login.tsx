import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Science,
  Lock,
  Person,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.username, formData.password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card
          sx={{
            width: { xs: '100%', sm: 400 },
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            overflow: 'visible',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: '0 8px 32px rgba(0, 122, 255, 0.3)',
                  }}
                >
                  <Science sx={{ fontSize: 40, color: 'white' }} />
                </Box>
              </motion.div>
              
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Lab Journal
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to your laboratory workspace
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              </motion.div>
            )}

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <TextField
                  fullWidth
                  name="username"
                  label="Username"
                  value={formData.username}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                    boxShadow: '0 8px 24px rgba(0, 122, 255, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0056CC 0%, #3E3D99 100%)',
                      boxShadow: '0 12px 32px rgba(0, 122, 255, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </motion.div>
            </Box>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center', mt: 2 }}
              >
                Secure access to your laboratory data
              </Typography>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Login;
