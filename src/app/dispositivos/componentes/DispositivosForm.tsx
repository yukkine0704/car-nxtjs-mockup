'use client';

import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, TextField, Button, CircularProgress, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText  } from "@mui/material";
import { useRouter } from 'next/navigation';

// Datos de ejemplo para la simulación
const dispositivos = [
    { id: 1, nodo: 101, salas: "Sala de Natación", puertas: "1,2" },
    { id: 2, nodo: 102, salas: "Sala de GYM", puertas: "3" },
    { id: 3, nodo: 103, salas: "Sala de Atletismo", puertas: "4,5" },
    { id: 4, nodo: 104, salas: "Sala de Boxeo", puertas: "6" },
    { id: 5, nodo: 105, salas: "Sala de Tenis", puertas: "7,8" },
    { id: 6, nodo: 106, salas: "Sala de Lucha", puertas: "9" },
    { id: 7, nodo: 107, salas: "Sala de Remo", puertas: "10,11" },
    { id: 8, nodo: 108, salas: "Sala de Piragüismo", puertas: "12" },
    { id: 9, nodo: 109, salas: "Sala de Boccia", puertas: "13,14" },
    { id: 10, nodo: 110, salas: "Sala de Billar", puertas: "15" },
    { id: 11, nodo: 111, salas: "Sala de Atletismo Inclusivo", puertas: "16,17" },
];

const availableDoors = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"]; // Puertas disponibles

export default function DispositivoForm({ isEditing = false, dispositivoId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(isEditing);
    const [formData, setFormData] = useState({
        nodo: '',
        salas: '',
        puertas: [],
    });

    // Cargar datos si estamos en modo edición
    useEffect(() => {
        if (isEditing && dispositivoId) {
            setLoading(true);
            setTimeout(() => {
                const dispositivo = dispositivos.find(d => d.id === parseInt(dispositivoId));

                if (dispositivo) {
                    setFormData({
                        ...dispositivo,
                        puertas: dispositivo.puertas.split(',') // Convertir las puertas a un array
                    });
                } else {
                    alert('Dispositivo no encontrado');
                    router.push('/dispositivos');
                }

                setLoading(false);
            }, 500);
        }
    }, [isEditing, dispositivoId, router]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Datos del dispositivo:', formData);
        router.push('/dispositivos');
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
                <Typography variant="h6" className="font-bold text-blue-600">
                    {isEditing ? 'Editar Dispositivo' : 'Nuevo Dispositivo'}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                    {isEditing
                        ? 'Actualiza los datos del dispositivo'
                        : 'Completa el formulario para crear un nuevo dispositivo'}
                </Typography>
            </Box>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <TextField
                        fullWidth
                        label="Nodo"
                        name="nodo"
                        value={formData.nodo}
                        onChange={handleChange}
                        required
                        variant="outlined"
                    />
                </div>

                <div className="flex mb-4">
                    <div className="flex-1 pr-2">
                        <TextField
                            fullWidth
                            label="Salas"
                            name="salas"
                            value={formData.salas}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                    </div>

                    <div className="flex-1 pl-2">
                    <FormControl fullWidth variant="outlined">
                            <InputLabel>Puertas</InputLabel>
                            <Select
                                multiple
                                label="Puertas"
                                value={formData.puertas}
                                onChange={handleChange}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {availableDoors.map(door => (
                                    <MenuItem key={door} value={door}>
                                        <Checkbox checked={formData.puertas.includes(door)} />
                                        <ListItemText primary={`Puerta ${door}`} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className="flex justify-end mt-4">

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        {isEditing ? 'Actualizar Dispositivo' : 'Crear Dispositivo'}
                    </Button>
                </div>
            </form>
        </Paper>
    );
}