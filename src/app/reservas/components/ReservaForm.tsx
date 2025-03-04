'use client';

import React, { useState, useEffect } from "react";
import {
    Paper,
    Typography,
    Box,
    TextField,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Select,
    CircularProgress
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

// Datos de ejemplo para la simulación
const mockReservations = [
    {
        id: "1",
        name: "Laura M.",
        date: dayjs("2025-02-11"),
        startTime: dayjs("2025-02-11T13:00:00"),
        endTime: dayjs("2025-02-11T15:00:00"),
        building: "Edificio 1",
        local: "Gym",
        sport: "Baloncesto",
        status: "Pendiente",
        user: "Juan Pérez",
        notes: "Reserva para entrenamiento semanal"
    },
    {
        id: "2",
        name: "Carlos R.",
        date: dayjs("2025-02-12"),
        startTime: dayjs("2025-02-12T09:00:00"),
        endTime: dayjs("2025-02-12T11:00:00"),
        building: "Edificio 2",
        local: "Sala de Reuniones",
        sport: "Yoga",
        status: "Confirmada",
        user: "María González",
        notes: "Sesión de yoga corporativa"
    },
    // Añade más reservas de ejemplo si lo necesitas
];

export default function ReservaForm({ isEditing = false, reservaId }: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(isEditing);
    const [formData, setFormData] = useState({
        name: '',
        date: null,
        startTime: null,
        endTime: null,
        building: '',
        local: '',
        sport: '',
        status: '',
        user: '',
        notes: ''
    });

    // Definir listas de opciones específicas para cada campo
    const buildings = ["Edificio 1", "Edificio 2", "Edificio 3"];
    const locals = ["Gym", "Sala de Reuniones", "Piscina", "Auditorio", "Comedor"];
    const sports = ["Fútbol", "Baloncesto", "Tenis", "Natación", "Yoga", "Atletismo"];
    const statuses = ["Pendiente", "Confirmada", "Cancelada", "Completada"];
    const users = ["Juan Pérez", "María González", "Carlos Rodríguez", "Ana Torres", "Pedro Sánchez"];

    // Cargar datos si estamos en modo edición
    useEffect(() => {
        if (isEditing && reservaId) {
            // Simulación de carga de datos - en una app real harías una llamada a API
            setLoading(true);

            // Simular un pequeño retraso como si fuera una llamada a API
            setTimeout(() => {
                const reserva = mockReservations.find(r => r.id === reservaId);

                if (reserva) {
                    setFormData(reserva);
                } else {
                    // Si no se encuentra la reserva, redirigir a la lista
                    alert('Reserva no encontrada');
                    router.push('/reservas');
                }

                setLoading(false);
            }, 500);
        }
    }, [isEditing, reservaId, router]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            date
        });
    };

    const handleTimeChange = (name, time) => {
        setFormData({
            ...formData,
            [name]: time
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Lógica diferente según si estamos creando o editando
        if (isEditing) {
            console.log('Actualizando reserva:', reservaId, formData);
            // Aquí harías tu llamada a API para actualizar
        } else {
            console.log('Creando nueva reserva:', formData);
            // Aquí harías tu llamada a API para crear
        }

        router.push('/reservas');
    };

    if (loading) {
        return (
            <Paper className="p-6 rounded-lg shadow-md w-full flex justify-center items-center" style={{ minHeight: '300px' }}>
                <CircularProgress />
            </Paper>
        );
    }

    return (
        <Paper className="p-6 rounded-lg shadow-md w-full">
            <Box className="mb-6">
                <Typography variant="h6" className="font-bold" style={{ color: "#2498ff" }}>
                    {isEditing ? 'Editar Reserva' : 'Nueva Reserva'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {isEditing
                        ? 'Actualiza los datos de la reserva'
                        : 'Completa el formulario para crear una nueva reserva'}
                </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 4, sm: 4, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Nombre del solicitante"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid size={{ xs: 4, sm: 4, md: 6 }}>
                        <DatePicker
                            label="Fecha"
                            value={formData.date}
                            onChange={handleDateChange}
                            slotProps={{ textField: { fullWidth: true, required: true } }}
                        />
                    </Grid>

                    <Grid size={{ xs: 4, sm: 4, md: 6 }}>
                        <TimePicker
                            label="Hora de inicio"
                            value={formData.startTime}
                            onChange={(time) => handleTimeChange('startTime', time)}
                            slotProps={{ textField: { fullWidth: true, required: true } }}
                        />
                    </Grid>

                    <Grid size={{ xs: 4, sm: 4, md: 6 }}>
                        <TimePicker
                            label="Hora de fin"
                            value={formData.endTime}
                            onChange={(time) => handleTimeChange('endTime', time)}
                            slotProps={{ textField: { fullWidth: true, required: true } }}
                        />
                    </Grid>

                    <Grid size={{ xs: 4, sm: 4, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel required>Edificio</InputLabel>
                            <Select
                                name="building"
                                value={formData.building}
                                onChange={handleChange}
                                required
                                label="Edificio"
                            >
                                {buildings.map((building) => (
                                    <MenuItem key={building} value={building}>
                                        {building}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 4, sm: 4, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel required>Sala</InputLabel>
                            <Select
                                name="local"
                                value={formData.local}
                                onChange={handleChange}
                                required
                                label="Sala"
                            >
                                {locals.map((local) => (
                                    <MenuItem key={local} value={local}>
                                        {local}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 4, sm: 4, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel required>Deporte</InputLabel>
                            <Select
                                name="sport"
                                value={formData.sport}
                                onChange={handleChange}
                                required
                                label="Deporte"
                            >
                                {sports.map((sport) => (
                                    <MenuItem key={sport} value={sport}>
                                        {sport}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 4, sm: 4, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                                label="Estado"
                            >
                                {statuses.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 4, sm: 4, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel>Usuario</InputLabel>
                            <Select
                                name="user"
                                value={formData.user}
                                onChange={handleChange}
                                required
                                label="Usuario"
                            >
                                {users.map((user) => (
                                    <MenuItem key={user} value={user}>
                                        {user}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 4, sm: 8, md: 12 }}>
                        <TextField
                            fullWidth
                            label="Notas adicionales"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid size={{ xs: 4, sm: 8, md: 12 }}>
                        <Box className="flex justify-end space-x-2 gap-4 mt-4">
                            <Button
                                variant="outlined"
                                onClick={() => router.push('/reservas')}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                {isEditing ? 'Actualizar Reserva' : 'Crear Reserva'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
