'use client';

import { useState } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, TablePagination, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";

import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    TableRows
} from '@mui/icons-material';


export default function BuildingsTable() {
    const router = useRouter();

    // Datos de ejemplo para edificaciones
    const buildings = [
        {
            id: 1,
            name: "Torre Residencial Norte",
            floors: 15,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 2,
            name: "Edificio Central",
            floors: 8,
            image: "https://images.unsplash.com/photo-1554435493-93422e8d1c46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 3,
            name: "Complejo Residencial Sur",
            floors: 12,
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 4,
            name: "Torre Ejecutiva Plaza",
            floors: 20,
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 5,
            name: "Residencial Parque Verde",
            floors: 6,
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
        },
    ];

    // Estado para la paginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Estado para el menú contextual
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedBuilding, setSelectedBuilding] = useState(null);

    // Manejadores para la paginación
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: object) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Manejadores para el menú
    const handleMenuOpen = (event: object, building) => {
        setAnchorEl(event.currentTarget);
        setSelectedBuilding(building);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedBuilding(null);
    };

    // Acciones del menú
    const handleEdit = () => {
        if (selectedBuilding) {
            router.push(`/edificaciones/edit/${selectedBuilding.id}`);
        }
        handleMenuClose();
    };

    const handleDelete = () => {
        if (selectedBuilding) {
            // Aquí iría la lógica para eliminar la edificación
            // console.log('Eliminando edificación:', selectedBuilding.id);
        }
        handleMenuClose();
    };

    // Calcular filas para mostrar en la página actual
    const emptyRows = page > 0
        ? Math.max(0, (1 + page) * rowsPerPage - buildings.length)
        : 0;

    const visibleRows = buildings.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <div>
            <Paper className="p-4 rounded-lg shadow-md w-full">
                <Box className="flex justify-between items-center mb-4">
                    <Typography variant="h6" className="font-bold" style={{ color: "#2498ff" }}>
                        Listado de Edificaciones
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => router.push('/edificaciones/create')}
                    >
                        Nueva Edificación
                    </Button>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: "#91a4b2" }}>Portada</TableCell>
                                <TableCell style={{ color: "#91a4b2" }}>Nombre</TableCell>
                                <TableCell style={{ color: "#91a4b2" }}>Pisos</TableCell>
                                <TableCell style={{ color: "#91a4b2" }}></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {visibleRows.map((building) => (
                                <TableRow key={building.id} hover>
                                    <TableCell>
                                        <Avatar
                                            src={building.image}
                                            alt={building.name}
                                            variant="rounded"
                                            sx={{ width: 60, height: 60 }}
                                        />
                                    </TableCell>
                                    <TableCell style={{ color: "#274967" }}>
                                        {building.name}
                                    </TableCell>
                                    <TableCell style={{ color: "#274967" }}>
                                        {building.floors}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="acciones"
                                            onClick={(e) => handleMenuOpen(e, building)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={4} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Actions menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
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
                        <ListItemText primary="Eliminar" style={{ color: '#d32f2f' }} />
                    </MenuItem>
                </Menu>

                {/* Pagination Component */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={buildings.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Filas por página:"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
                />
            </Paper>
        </div>
    );
}
