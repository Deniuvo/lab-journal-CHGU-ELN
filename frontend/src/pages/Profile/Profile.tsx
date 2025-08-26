import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Card,
  CardContent,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  Person,
  Email,
  Phone,
  LocationOn,
  Science,
  Assignment,
  TrendingUp,
  Schedule,
} from '@mui/icons-material';

const Profile: React.FC = () => {
  // Mock data for demonstration
  const user = {
    name: 'Dr. Sarah Smith',
    email: 'sarah.smith@lab.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    role: 'Senior Researcher',
    department: 'Molecular Biology',
    joinDate: '2022-03-15',
    avatar: 'SS',
    bio: 'Experienced molecular biologist with expertise in protein synthesis and cell culture techniques.',
    expertise: ['Protein Synthesis', 'Cell Culture', 'Molecular Biology', 'Biochemistry'],
  };

  const stats = [
    { label: 'Experiments', value: '24', icon: Science, color: '#007AFF' },
    { label: 'Protocols', value: '12', icon: Assignment, color: '#5856D6' },
    { label: 'Success Rate', value: '94%', icon: TrendingUp, color: '#34C759' },
    { label: 'Active Projects', value: '3', icon: Schedule, color: '#FF9500' },
  ];

  const recentActivity = [
    { id: 1, action: 'Experiment completed', item: 'Protein Synthesis Study', time: '2 hours ago' },
    { id: 2, action: 'Protocol updated', item: 'Cell Culture Maintenance', time: '1 day ago' },
    { id: 3, action: 'New experiment started', item: 'DNA Sequencing', time: '3 days ago' },
    { id: 4, action: 'Results published', item: 'Cell Culture Analysis', time: '1 week ago' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={3}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: '3rem',
                  bgcolor: 'primary.main',
                }}
              >
                {user.avatar}
              </Avatar>
              <Box flex={1}>
                <Typography variant="h4" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {user.role}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {user.department}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Member since {user.joinDate}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                sx={{ borderRadius: 2 }}
              >
                Edit Profile
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Statistics */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Box
                    sx={{
                      bgcolor: stat.color,
                      borderRadius: '50%',
                      p: 2,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <stat.icon sx={{ color: 'white', fontSize: 32 }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Personal Information */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={user.name}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={user.email}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={user.phone}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={user.location}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Bio"
                  value={user.bio}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Expertise */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Areas of Expertise
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {user.expertise.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  color="primary"
                  variant="outlined"
                  size="medium"
                />
              ))}
            </Box>
          </Paper>

          {/* Recent Activity */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Recent Activity
            </Typography>
            <List>
              {recentActivity.map((activity) => (
                <ListItem key={activity.id} divider>
                  <ListItemIcon>
                    <Box
                      sx={{
                        bgcolor: 'primary.main',
                        borderRadius: '50%',
                        p: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Science sx={{ color: 'white', fontSize: 16 }} />
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.action}
                    secondary={`${activity.item} • ${activity.time}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Contact Information */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Contact Information
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Email color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Email"
                  secondary={user.email}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Phone color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Phone"
                  secondary={user.phone}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOn color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Location"
                  secondary={user.location}
                />
              </ListItem>
            </List>
          </Paper>

          {/* Quick Actions */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Quick Actions
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Science />}
              >
                Start New Experiment
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Assignment />}
              >
                Create Protocol
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<TrendingUp />}
              >
                View Analytics
              </Button>
            </Box>
          </Paper>

          {/* Profile Completion */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Profile Completion
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Profile is 85% complete
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: 8,
                  bgcolor: 'grey.200',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: '85%',
                    height: '100%',
                    bgcolor: 'primary.main',
                    borderRadius: 4,
                  }}
                />
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Add more information to complete your profile
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
