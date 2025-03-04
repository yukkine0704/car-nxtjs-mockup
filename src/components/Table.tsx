// components/DynamicTable.js

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
  Checkbox,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { useRouter } from 'next/navigation';

const DynamicTable = ({ route, title, columns, data, showCheckboxes }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const router = useRouter();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleEdit = () => {
    if (selectedItem) {
        console.log(selectedItem.id)
      router.push(`../${route}/editar/${selectedItem.id}`); 
    }
  };

  const handleDelete = () => {
    if (selectedItem) {
      console.log("Eliminar item:", selectedItem.id);
    }
    handleMenuClose();
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    console.log("Eliminar filas seleccionadas:", selectedRows);
    setSelectedRows([]);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper className="p-4 rounded-lg shadow-md w-full relative">
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="font-bold" style={{ color: "#2498ff" }}>
          {title}
        </Typography>
        {selectedRows.length > 1 ? (
            <div className="hidden md:block">
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteSelected}
          >
            Eliminar
          </Button>
          </div>
        ) : (
          <div className="hidden md:block">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => router.push(`../${route}/crear`)} 
            >
              Añadir
            </Button>
          </div>
        )}
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {showCheckboxes && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setSelectedRows(data.map((item) => item.id));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
                </TableCell>
              )}
              {columns.map((column, index) => (
                <TableCell key={index} style={{ color: "#91a4b2" }}>
                  {column}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((item) => (
              <TableRow key={item.id} hover>
                {showCheckboxes && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column}>
                    {item[column.toLowerCase()]}
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton
                    aria-label="acciones"
                    onClick={(e) => handleMenuOpen(e, item)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={columns.length + (showCheckboxes ? 1 : 0) + 1} />
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
      />
      {/* Floating Action Button para móviles */}
      <div className="fixed bottom-5 right-5 md:hidden">
        {selectedRows.length > 1 ? (
          <Button
            variant="outlined"
            color="error"
            className="rounded-full w-14 h-14 flex items-center justify-center"
            onClick={handleDeleteSelected}
          >
            <DeleteIcon />
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className="rounded-full w-14 h-14 flex items-center justify-center"
            onClick={() => router.push("/crear")}
          >
            <AddIcon />
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default DynamicTable;