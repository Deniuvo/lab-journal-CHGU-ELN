import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Delete,
  Science,
  Schedule,
  Person,
  Assignment,
  TrendingUp,
} from '@mui/icons-material';

const ExperimentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data for demonstration
  const experiment = {
    id: parseInt(id || '1'),
    name: 'Protein Synthesis Study',
    description: 'Study of protein synthesis in E. coli under various conditions',
    status: 'In Progress',
    startDate: '2024-01-10',
    endDate: '2024-02-15',
    researcher: 'Dr. Smith',
    priority: 'High',
    objective: 'To understand the factors affecting protein synthesis in E. coli',
    methodology: 'Bacterial culture, protein extraction, SDS-PAGE analysis',
    results: 'Initial results show increased protein production under optimal conditions',
    notes: 'Requires daily monitoring and pH adjustment',
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Planning':
        return 'info';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => window.history.back()}
          >
            Back
          </Button>
          <Typography variant="h4" component="h1">
            {experiment.name}
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            color="secondary"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<Delete />}
            color="error"
          >
            Delete
          </Button>
        </Box>
      </Box>

      {/* Status and Priority */}
      <Box display="flex" gap={2} sx={{ mb: 3 }}>
        <Chip
          label={experiment.status}
          color={getStatusColor(experiment.status) as any}
          size="medium"
        />
        <Chip
          label={experiment.priority}
          color={getPriorityColor(experiment.priority) as any}
          size="medium"
        />
      </Box>

      <Grid container spacing={3}>
        {/* Main Information */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" paragraph>
              {experiment.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Objective
            </Typography>
            <Typography variant="body1" paragraph>
              {experiment.objective}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Methodology
            </Typography>
            <Typography variant="body1" paragraph>
              {experiment.methodology}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Results
            </Typography>
            <Typography variant="body1" paragraph>
              {experiment.results}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
            <Typography variant="body1">
              {experiment.notes}
            </Typography>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Basic Info */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Person color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Researcher"
                  secondary={experiment.researcher}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Schedule color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Duration"
                  secondary={`${experiment.startDate} - ${experiment.endDate}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Science color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Experiment ID"
                  secondary={`#${experiment.id}`}
                />
              </ListItem>
            </List>
          </Paper>

          {/* Progress */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Progress
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Timeline Progress
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
                    width: '60%',
                    height: '100%',
                    bgcolor: 'primary.main',
                    borderRadius: 4,
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                60% Complete
              </Typography>
            </Box>
          </Paper>

          {/* Quick Actions */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Assignment />}
              >
                View Protocol
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<TrendingUp />}
              >
                View Results
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Schedule />}
              >
                Schedule Follow-up
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExperimentDetail;
