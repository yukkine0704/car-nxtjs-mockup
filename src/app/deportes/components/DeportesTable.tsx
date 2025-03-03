'use client';

import React, { useState } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { useRouter } from 'next/navigation';

const DeportesTable = ({ deportes }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDeporte, setSelectedDeporte] = useState(null);
  const router = useRouter();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event, deporte) => {
    setAnchorEl(event.currentTarget);
    setSelectedDeporte(deporte);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDeporte(null);
  };

  const handleEdit = (deporte) => {
    console.log(selectedDeporte.id);
    router.push(`/deportes/editar/${selectedDeporte.id}`);
  };


  const handleDelete = () => {
    if (selectedDeporte) {
      console.log("Eliminar deporte:", selectedDeporte.id);
    }
    handleMenuClose();
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - deportes.length) : 0;

  const visibleRows = deportes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper className="p-4 rounded-lg shadow-md w-full">
      <Box className="flex justify-between items-center mb-4">
        <Typography
          variant="h6"
          className="font-bold"
          style={{ color: "#2498ff" }}
        >
          Listado de Deportes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/reservas/crear")}
        >
          Añadir deporte
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#91a4b2" }}>Nombre</TableCell>
              <TableCell style={{ color: "#91a4b2" }}>Imagen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((deporte) => (
               <TableRow key={deporte.id} hover>
                <TableCell style={{ color: "#274967" }}>
                  {deporte.nombre}
                </TableCell>
                <TableCell>
                  <img
                    src={deporte.imagen}
                    alt={deporte.nombre}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="acciones"
                    onClick={(e) => handleMenuOpen(e, deporte)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Editar" />
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Eliminar" style={{ color: "#d32f2f" }} />
        </MenuItem>
      </Menu>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={deportes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
      />
    </Paper>
  );
};

export default DeportesTable;
