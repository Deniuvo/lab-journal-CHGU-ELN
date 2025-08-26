import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  TrendingUp,
  Science,
  Assignment,
  People,
  Schedule,
  CheckCircle,
  Warning,
  Error,
} from '@mui/icons-material';

const Analytics: React.FC = () => {
  // Mock data for demonstration
  const metrics = [
    { title: 'Total Experiments', value: '24', change: '+12%', icon: Science, color: '#007AFF' },
    { title: 'Success Rate', value: '87%', change: '+5%', icon: CheckCircle, color: '#34C759' },
    { title: 'Active Protocols', value: '12', change: '+3%', icon: Assignment, color: '#5856D6' },
    { title: 'Team Productivity', value: '92%', change: '+8%', icon: TrendingUp, color: '#FF9500' },
  ];

  const recentActivity = [
    { id: 1, action: 'Experiment completed', item: 'Protein Synthesis Study', time: '2 hours ago', type: 'success' },
    { id: 2, action: 'Protocol updated', item: 'Cell Culture Maintenance', time: '4 hours ago', type: 'info' },
    { id: 3, action: 'New experiment started', item: 'DNA Sequencing', time: '6 hours ago', type: 'primary' },
    { id: 4, action: 'Issue reported', item: 'Equipment malfunction', time: '1 day ago', type: 'warning' },
  ];

  const topPerformers = [
    { name: 'Dr. Smith', experiments: 8, successRate: '94%' },
    { name: 'Dr. Johnson', experiments: 6, successRate: '89%' },
    { name: 'Dr. Williams', experiments: 5, successRate: '87%' },
    { name: 'Dr. Brown', experiments: 4, successRate: '82%' },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      default:
        return 'primary';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Analytics Dashboard
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {metric.title}
                    </Typography>
                    <Chip
                      label={metric.change}
                      color="success"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Box
                    sx={{
                      bgcolor: metric.color,
                      borderRadius: '50%',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <metric.icon sx={{ color: 'white', fontSize: 28 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts and Data */}
      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Recent Activity
            </Typography>
            <List>
              {recentActivity.map((activity) => (
                <ListItem key={activity.id} divider>
                  <ListItemIcon>
                    <Box
                      sx={{
                        bgcolor: `${getActivityColor(activity.type)}.main`,
                        borderRadius: '50%',
                        p: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CheckCircle sx={{ color: 'white', fontSize: 16 }} />
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

        {/* Top Performers */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Top Performers
            </Typography>
            <List>
              {topPerformers.map((performer, index) => (
                <ListItem key={performer.name} divider>
                  <ListItemIcon>
                    <Box
                      sx={{
                        bgcolor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : 'grey.300',
                        borderRadius: '50%',
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 32,
                        height: 32,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {index + 1}
                      </Typography>
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={performer.name}
                    secondary={`${performer.experiments} experiments • ${performer.successRate} success rate`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Performance Overview */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Performance Overview
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h3" color="success.main" sx={{ fontWeight: 600 }}>
                  87%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Overall Success Rate
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h3" color="primary.main" sx={{ fontWeight: 600 }}>
                  24
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Experiments This Month
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h3" color="warning.main" sx={{ fontWeight: 600 }}>
                  3.2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Duration (weeks)
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Quick Insights */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Quick Insights
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Chip
                icon={<TrendingUp />}
                label="Productivity up 12% this month"
                color="success"
                variant="outlined"
                sx={{ height: 'auto', p: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Chip
                icon={<Science />}
                label="New equipment increased efficiency"
                color="info"
                variant="outlined"
                sx={{ height: 'auto', p: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Chip
                icon={<Warning />}
                label="3 experiments need attention"
                color="warning"
                variant="outlined"
                sx={{ height: 'auto', p: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Chip
                icon={<Schedule />}
                label="2 protocols due for review"
                color="secondary"
                variant="outlined"
                sx={{ height: 'auto', p: 1 }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Analytics;
