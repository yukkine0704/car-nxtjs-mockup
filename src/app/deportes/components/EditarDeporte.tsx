'use client';

import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useParams } from "next/navigation";

const EditarDeporte = () => {
  const params = useParams();
  const deporteId = params.id;
  const [deporte, setDeporte] = useState(null);
  const [nombre, setNombre] = useState("");
  const [nuevaImagen, setNuevaImagen] = useState("");

  const deportes = [
    {
      id: '1',
      nombre: "Natación",
      imagen: "https://loremflickr.com/100/100/swimming",
    },
    {
      id: '2',
      nombre: "GYM",
      imagen: "https://loremflickr.com/100/100/gym",
    },
    {
      id: '3',
      nombre: "Atletismo",
      imagen: "https://loremflickr.com/100/100/athletics",
    },
    {
      id: '4',
      nombre: "Atletismo inclusivo",
      imagen: "https://loremflickr.com/100/100/disabled_athletics",
    },
    {
      id: '5',
      nombre: "Boccia",
      imagen: "https://loremflickr.com/100/100/boccia",
    },
    {
      id: '6',
      nombre: "Billar",
      imagen: "https://loremflickr.com/100/100/billiards",
    },
    {
      id: '7',
      nombre: "Boxeo",
      imagen: "https://loremflickr.com/100/100/boxing",
    },
    {
      id: '8',
      nombre: "Lucha",
      imagen: "https://loremflickr.com/100/100/wrestling",
    },
    {
      id: '9',
      nombre: "Piragüismo",
      imagen: "https://loremflickr.com/100/100/canoeing",
    },
    {
      id: '10',
      nombre: "Remo",
      imagen: "https://loremflickr.com/100/100/rowing",
    },
    {
      id: '11',
      nombre: "Tenis",
      imagen: "https://loremflickr.com/100/100/tennis",
    },
  ];

  useEffect(() => {
    const deporteEncontrado = deportes.find((deporte) => deporte.id === deporteId);
    setDeporte(deporteEncontrado);
    if (deporteEncontrado) {
      setNombre(deporteEncontrado.nombre);
      setNuevaImagen(deporteEncontrado.imagen);
    }
  }, [deporteId]);

  if (!deporte) {
    return (
      <Paper className="p-4 rounded-lg shadow-md w-full">
        <Typography variant="h6" className="font-bold mb-4">
          Deporte no encontrado
        </Typography>
      </Paper>
    );
  }

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleImagenChange = (e) => {
    setNuevaImagen(e.target.value);
  };

  return (
    <Paper className="p-4 rounded-lg shadow-md w-full">
      <form>
        <TextField
          label="Nombre del Deporte"
          value={nombre}
          onChange={handleNombreChange}
          fullWidth
          margin="normal"
          style={{ textAlign: "center" }}
        />
        <Box display="flex" flexDirection="column" alignItems="center" marginBottom="1rem" position="relative">
          <img
            src={nuevaImagen}
            alt={nombre}
            style={{ maxWidth: "300px", maxHeight: "300px", marginBottom: "1rem" }}
          />
          <IconButton component="label" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "rgba(255, 255, 255, 0.7)", borderRadius: "50%" }}>
            <CloudUpload style={{ fontSize: "2rem" }} />
            <input type="file" accept="image/*" hidden />
          </IconButton>
        </Box>
        <TextField
          label="URL de la Imagen"
          value={nuevaImagen}
          onChange={handleImagenChange}
          fullWidth
          margin="normal"
        />
        <Box className="flex justify-end mt-4">
          <Button variant="contained" color="primary" type="submit">
            Guardar Cambios
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EditarDeporte;