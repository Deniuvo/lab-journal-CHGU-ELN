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
import { Add, Edit, Delete, Visibility, Download } from '@mui/icons-material';

const Protocols: React.FC = () => {
  // Mock data for demonstration
  const protocols = [
    {
      id: 1,
      name: 'Protein Extraction Protocol',
      description: 'Standard protocol for protein extraction from bacterial cells',
      category: 'Molecular Biology',
      version: '2.1',
      author: 'Dr. Smith',
      lastUpdated: '2024-01-15',
      status: 'Active',
      downloads: 45,
    },
    {
      id: 2,
      name: 'Cell Culture Maintenance',
      description: 'Protocol for maintaining mammalian cell cultures',
      category: 'Cell Biology',
      version: '1.5',
      author: 'Dr. Johnson',
      lastUpdated: '2024-01-10',
      status: 'Active',
      downloads: 32,
    },
    {
      id: 3,
      name: 'DNA Sequencing Preparation',
      description: 'Sample preparation for next-generation sequencing',
      category: 'Genomics',
      version: '3.0',
      author: 'Dr. Williams',
      lastUpdated: '2024-01-08',
      status: 'Draft',
      downloads: 18,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Draft':
        return 'warning';
      case 'Archived':
        return 'default';
      default:
        return 'default';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Molecular Biology':
        return 'primary';
      case 'Cell Biology':
        return 'secondary';
      case 'Genomics':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          Protocols
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ borderRadius: 2 }}
        >
          New Protocol
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
              {protocols.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Protocols
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main" sx={{ fontWeight: 600 }}>
              {protocols.filter(p => p.status === 'Active').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main" sx={{ fontWeight: 600 }}>
              {protocols.filter(p => p.status === 'Draft').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Draft
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="info.main" sx={{ fontWeight: 600 }}>
              {protocols.reduce((sum, p) => sum + p.downloads, 0)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Downloads
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Protocols Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Downloads</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {protocols.map((protocol) => (
                <TableRow key={protocol.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {protocol.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {protocol.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={protocol.category}
                      color={getCategoryColor(protocol.category) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      v{protocol.version}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {protocol.author}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={protocol.status}
                      color={getStatusColor(protocol.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {protocol.downloads}
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
                      <IconButton size="small" color="info">
                        <Download />
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

export default Protocols;
