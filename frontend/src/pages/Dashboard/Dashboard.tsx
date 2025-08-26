import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Container,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Science,
  Assignment,
  TrendingUp,
  People,
  Schedule,
  CheckCircle,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  // Mock data for demonstration
  const stats = [
    { title: 'Total Experiments', value: '24', icon: Science, color: '#007AFF' },
    { title: 'Active Protocols', value: '12', icon: Assignment, color: '#5856D6' },
    { title: 'Success Rate', value: '87%', icon: TrendingUp, color: '#34C759' },
    { title: 'Team Members', value: '8', icon: People, color: '#FF9500' },
  ];

  const recentExperiments = [
    { id: 1, name: 'Protein Synthesis Study', status: 'In Progress', date: '2024-01-15' },
    { id: 2, name: 'Cell Culture Analysis', status: 'Completed', date: '2024-01-14' },
    { id: 3, name: 'DNA Sequencing', status: 'Planning', date: '2024-01-13' },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Review experiment results', priority: 'High', due: 'Today' },
    { id: 2, task: 'Update protocol documentation', priority: 'Medium', due: 'Tomorrow' },
    { id: 3, task: 'Prepare presentation', priority: 'Low', due: 'Next week' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: stat.color,
                      width: 56,
                      height: 56,
                    }}
                  >
                    <stat.icon sx={{ fontSize: 28 }} />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Recent Experiments */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Recent Experiments
            </Typography>
            <List>
              {recentExperiments.map((experiment) => (
                <ListItem key={experiment.id} divider>
                  <ListItemIcon>
                    <Science color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={experiment.name}
                    secondary={`${experiment.date} • ${experiment.status}`}
                  />
                  <Chip
                    label={experiment.status}
                    color={
                      experiment.status === 'Completed'
                        ? 'success'
                        : experiment.status === 'In Progress'
                        ? 'warning'
                        : 'default'
                    }
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Tasks */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Upcoming Tasks
            </Typography>
            <List>
              {upcomingTasks.map((task) => (
                <ListItem key={task.id} divider>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={task.task}
                    secondary={`Due: ${task.due}`}
                  />
                  <Chip
                    label={task.priority}
                    color={
                      task.priority === 'High'
                        ? 'error'
                        : task.priority === 'Medium'
                        ? 'warning'
                        : 'default'
                    }
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Chip
                icon={<Science />}
                label="New Experiment"
                clickable
                color="primary"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Chip
                icon={<Assignment />}
                label="Create Protocol"
                clickable
                color="secondary"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Chip
                icon={<Schedule />}
                label="Schedule Meeting"
                clickable
                color="info"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
