// components/DynamicTable.js

/**
 * DynamicTable es un componente reutilizable que renderiza una tabla dinámica utilizando Material-UI.
 *
 * Props:
 * - route: Una cadena que representa la ruta base para la navegación (utilizada para editar y crear elementos).
 * - title: Una cadena que establece el título de la tabla.
 * - columns: Un arreglo de cadenas que define los encabezados de las columnas de la tabla.
 * - data: Un arreglo de objetos que contiene los datos a mostrar en la tabla. Cada objeto debe tener claves que correspondan a los nombres de las columnas.
 * - showCheckboxes: Un booleano que determina si se deben mostrar casillas de verificación para la selección de filas.
 *
 * Características:
 * - **Paginación**: La tabla admite paginación, lo que permite al usuario navegar a través de páginas de datos.
 * - **Selección de Filas**: Los usuarios pueden seleccionar filas individuales o todas las filas usando casillas de verificación, lo que permite acciones en lote.
 * - **Menú Contextual**: Cada fila tiene un menú contextual (abierto con un ícono de elipsis vertical) que ofrece opciones para editar y eliminar el elemento seleccionado.
 * - **Diseño Responsivo**: La tabla incluye un botón de acción flotante para dispositivos móviles que permite un acceso rápido a las funciones de agregar o eliminar.
 *
 * Uso:
 * 1. Importa el componente y pasa las props requeridas.
 * 2. Asegúrate de que la prop `data` contenga objetos con claves que coincidan con los encabezados de las columnas.
 * 3. Maneja acciones como editar y eliminar en el componente padre para gestionar el estado y las actualizaciones de datos.
 *
 * Ejemplo:
 * <DynamicTable
 *   route="items"
 *   title="Lista de Elementos"
 *   columns={["Nombre", "Descripción", "Precio"]}
 *   data={listaDeElementos}
 *   showCheckboxes={true}
 * />
 */

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
import { useRouter } from "next/navigation";

interface TableItem {
  id: string | number;
  [key: string]: any;
}

interface DynamicTableProps {
  route: string;
  title: string;
  columns: string[];
  data: TableItem[];
  showCheckboxes?: boolean;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  route,
  title,
  columns,
  data,
  showCheckboxes = false,
}) => {
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
      console.log(selectedItem.id);
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

  const isImageUrl = (value: any): boolean => {
    if (typeof value !== 'string') return false;

    // Verifica si la cadena parece una URL
    if (value.startsWith('http') || value.startsWith('https')) {
      // Comprueba extensiones de imagen comunes o palabras clave en la URL
      const isImageExtension = /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(value);
      const containsImageKeywords = /(image|photo|img|picture)/i.test(value);

      return isImageExtension || containsImageKeywords;
    }

    return false;
  };
  return (
    <Paper className="p-4 rounded-lg shadow-md w-full relative">
      <Box className="flex justify-between items-center mb-4">
        <Typography
          variant="h6"
          className="font-bold"
          style={{ color: "#2498ff" }}
        >
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
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < data.length
                    }
                    checked={
                      data.length > 0 && selectedRows.length === data.length
                    }
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
              <TableCell align="right" style={{ width: '60px', padding: '0 8px' }} />
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
                    {isImageUrl(item[column.toLowerCase()]) ? (
                      <img
                        src={item[column.toLowerCase()]}
                        alt={`${column} image`}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    ) : (
                      item[column.toLowerCase()]
                    )}
                  </TableCell>
                ))}
                <TableCell align="right" style={{ width: '60px', padding: '0 8px' }}>
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
                <TableCell
                  colSpan={columns.length + (showCheckboxes ? 1 : 0) + 1}
                />
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
