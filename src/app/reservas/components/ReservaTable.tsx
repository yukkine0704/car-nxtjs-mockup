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
    Chip,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const ReservaTable = () => {
    const router = useRouter();
    // Datos de ejemplo
    const reservations = [
        {
            id: 1,
            name: "Laura M.",
            date: "2025-02-11",
            start: "13:00:00",
            end: "15:00:00",
            building: "Edificio 1",
            local: "Gym",
            status: 'Pending'
        },
        {
            id: 2,
            name: "Carlos R.",
            date: "2025-02-12",
            start: "09:00:00",
            end: "11:00:00",
            building: "Edificio 2",
            local: "Sala de Reuniones",
            status: 'Confirmed'
        },
        {
            id: 3,
            name: "Ana P.",
            date: "2025-02-13",
            start: "10:00:00",
            end: "12:00:00",
            building: "Edificio 1",
            local: "Piscina",
            status: 'Cancelled'
        },
        {
            id: 4,
            name: "Miguel G.",
            date: "2025-02-14",
            start: "14:00:00",
            end: "16:00:00",
            building: "Edificio 3",
            local: "Auditorio",
            status: 'Pending'
        },
        {
            id: 5,
            name: "Sofia T.",
            date: "2025-02-15",
            start: "15:00:00",
            end: "17:00:00",
            building: "Edificio 2",
            local: "Comedor",
            status: 'Confirmed'
        },
    ];

    // Estado para la paginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Estado para el menú contextual
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedReservation, setSelectedReservation] = useState(null);

    // Manejadores para la paginación
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Manejadores para el menú
    const handleMenuOpen = (event, reservation) => {
        setAnchorEl(event.currentTarget);
        setSelectedReservation(reservation);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedReservation(null);
    };

    // Acciones del menú
    const handleEdit = () => {
        if (selectedReservation) {
            router.push(`/reservas/editar/${selectedReservation.id}`);
        }
        handleMenuClose();
    };

    const handleDelete = () => {
        if (selectedReservation) {
            // Aquí iría la lógica para eliminar la reserva
            console.log('Eliminando reserva:', selectedReservation.id);
            // Por ahora solo simularemos la eliminación cerrando el menú
        }
        handleMenuClose();
    };

    // Calcular filas para mostrar en la página actual
    const emptyRows = page > 0
        ? Math.max(0, (1 + page) * rowsPerPage - reservations.length)
        : 0;

    const visibleRows = reservations.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // Función para determinar el color del chip según el estado
    const getChipColor = (status) => {
        switch (status) {
            case "Confirmed": return "success";
            case "Cancelled": return "error";
            case "Pending": return "warning";
            default: return "default";
        }
    };

    return (
        <Paper className="p-4 rounded-lg shadow-md w-full">
            <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="font-bold" style={{ color: "#2498ff" }}>
                    Listado de Reservas
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => router.push('/reservas/crear')}
                >
                    Nueva Reserva
                </Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: "#91a4b2" }}>Nombre</TableCell>
                            <TableCell style={{ color: "#91a4b2" }}>Fecha</TableCell>
                            <TableCell style={{ color: "#91a4b2" }}>Inicio</TableCell>
                            <TableCell style={{ color: "#91a4b2" }}>Fin</TableCell>
                            <TableCell style={{ color: "#91a4b2" }}>Edificio</TableCell>
                            <TableCell style={{ color: "#91a4b2" }}>Sala</TableCell>
                            <TableCell style={{ color: "#91a4b2" }}>Estado</TableCell>
                            <TableCell style={{ color: "#91a4b2" }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((reservation) => (
                            <TableRow key={reservation.id} hover>
                                <TableCell style={{ color: "#274967" }}>
                                    {reservation.name}
                                </TableCell>
                                <TableCell style={{ color: "#274967" }}>
                                    {reservation.date}
                                </TableCell>
                                <TableCell style={{ color: "#274967" }}>
                                    {reservation.start}
                                </TableCell>
                                <TableCell style={{ color: "#274967" }}>
                                    {reservation.end}
                                </TableCell>
                                <TableCell style={{ color: "#274967" }}>
                                    {reservation.building}
                                </TableCell>
                                <TableCell style={{ color: "#274967" }}>
                                    {reservation.local}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={reservation.status}
                                        color={getChipColor(reservation.status)}
                                        variant="outlined"
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="acciones"
                                        onClick={(e) => handleMenuOpen(e, reservation)}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={8} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Menú de acciones */}
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

            {/* Componente de paginación */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={reservations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                className=""
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Filas por página:"
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
            />
        </Paper>
    );
};

export default ReservaTable;
