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
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import { Add, Edit, Delete, Visibility, Email, Phone, LocationOn, Science } from '@mui/icons-material';

const Users: React.FC = () => {
  // Mock data for demonstration
  const users = [
    {
      id: 1,
      name: 'Dr. Sarah Smith',
      email: 'sarah.smith@lab.com',
      role: 'Senior Researcher',
      department: 'Molecular Biology',
      status: 'Active',
      experiments: 8,
      joinDate: '2022-03-15',
      avatar: 'SS',
    },
    {
      id: 2,
      name: 'Dr. Michael Johnson',
      email: 'michael.johnson@lab.com',
      role: 'Research Associate',
      department: 'Cell Biology',
      status: 'Active',
      experiments: 6,
      joinDate: '2023-01-10',
      avatar: 'MJ',
    },
    {
      id: 3,
      name: 'Dr. Emily Williams',
      email: 'emily.williams@lab.com',
      role: 'Postdoctoral Fellow',
      department: 'Genomics',
      status: 'Active',
      experiments: 5,
      joinDate: '2023-06-20',
      avatar: 'EW',
    },
    {
      id: 4,
      name: 'Dr. David Brown',
      email: 'david.brown@lab.com',
      role: 'Research Assistant',
      department: 'Biochemistry',
      status: 'Inactive',
      experiments: 3,
      joinDate: '2023-09-05',
      avatar: 'DB',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'default';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Senior Researcher':
        return 'primary';
      case 'Research Associate':
        return 'secondary';
      case 'Postdoctoral Fellow':
        return 'info';
      case 'Research Assistant':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          Team Members
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ borderRadius: 2 }}
        >
          Add User
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
              {users.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Members
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main" sx={{ fontWeight: 600 }}>
              {users.filter(u => u.status === 'Active').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Members
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="info.main" sx={{ fontWeight: 600 }}>
              {users.filter(u => u.role === 'Senior Researcher').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Senior Researchers
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main" sx={{ fontWeight: 600 }}>
              {users.reduce((sum, u) => sum + u.experiments, 0)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Experiments
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Users Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Experiments</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {user.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={getRoleColor(user.role) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {user.department}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={getStatusColor(user.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {user.experiments}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {user.joinDate}
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

      {/* Department Overview */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Department Overview
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Science />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Molecular Biology"
                    secondary={`${users.filter(u => u.department === 'Molecular Biology').length} members`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      <Science />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Cell Biology"
                    secondary={`${users.filter(u => u.department === 'Cell Biology').length} members`}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                      <Science />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Genomics"
                    secondary={`${users.filter(u => u.department === 'Genomics').length} members`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                      <Science />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Biochemistry"
                    secondary={`${users.filter(u => u.department === 'Biochemistry').length} members`}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Users;
