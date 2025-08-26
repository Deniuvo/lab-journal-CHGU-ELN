import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';

const Experiments: React.FC = () => {
  // Mock data for demonstration
  const experiments = [
    {
      id: 1,
      name: 'Protein Synthesis Study',
      description: 'Study of protein synthesis in E. coli',
      status: 'In Progress',
      startDate: '2024-01-10',
      endDate: '2024-02-15',
      researcher: 'Dr. Smith',
      priority: 'High',
    },
    {
      id: 2,
      name: 'Cell Culture Analysis',
      description: 'Analysis of cell culture growth patterns',
      status: 'Completed',
      startDate: '2024-01-05',
      endDate: '2024-01-20',
      researcher: 'Dr. Johnson',
      priority: 'Medium',
    },
    {
      id: 3,
      name: 'DNA Sequencing',
      description: 'Sequencing of bacterial DNA samples',
      status: 'Planning',
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      researcher: 'Dr. Williams',
      priority: 'Low',
    },
  ];

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
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          Experiments
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ borderRadius: 2 }}
        >
          New Experiment
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
              {experiments.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Experiments
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main" sx={{ fontWeight: 600 }}>
              {experiments.filter(e => e.status === 'In Progress').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              In Progress
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main" sx={{ fontWeight: 600 }}>
              {experiments.filter(e => e.status === 'Completed').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completed
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="info.main" sx={{ fontWeight: 600 }}>
              {experiments.filter(e => e.status === 'Planning').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Planning
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Experiments Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Researcher</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {experiments.map((experiment) => (
                <TableRow key={experiment.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {experiment.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {experiment.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={experiment.status}
                      color={getStatusColor(experiment.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {experiment.researcher}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={experiment.priority}
                      color={getPriorityColor(experiment.priority) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {experiment.startDate} - {experiment.endDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <IconButton size="small" color="primary">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small" color="secondary">
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Experiments;
