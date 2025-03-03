'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    FormHelperText,
    CircularProgress
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

export default function BuildingsForm(isEditing: boolean, buildingId: number) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        floors: '',
        description: '',
    });

    const [mainImage, setMainImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(isEditing);


    // Añadir este efecto para cargar datos en modo edición
    useEffect(() => {
        if (isEditing && buildingId) {
            setLoading(true);

            // Simulación de carga de datos de un edificio existente
            setTimeout(() => {
                // Buscar el edificio en los datos de ejemplo
                const building = buildings.find(b => b.id === parseInt(buildingId));

                if (building) {
                    setFormData({
                        name: building.name,
                        floors: building.floors.toString(),
                        description: "Descripción del edificio " + building.name
                    });

                    // Crear un objeto de imagen para la vista previa
                    fetch(building.image)
                        .then(res => res.blob())
                        .then(blob => {
                            const file = new File([blob], "main-image.jpg", { type: "image/jpeg" });
                            setMainImage(Object.assign(file, { preview: building.image }));
                            // También simulamos una galería
                            setGalleryImages([Object.assign(file, { preview: building.image })]);
                        });
                } else {
                    alert('Edificio no encontrado');
                    router.push('/edificaciones');
                }

                setLoading(false);
            }, 500);
        }
    }, [isEditing, buildingId, router]);


    // Validación
    const validate = (fieldValues = formData) => {
        const temp = { ...errors };

        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "El nombre es requerido";

        if ('floors' in fieldValues) {
            temp.floors = fieldValues.floors ? "" : "El número de pisos es requerido";
            if (fieldValues.floors && (isNaN(fieldValues.floors) || parseInt(fieldValues.floors) <= 0))
                temp.floors = "Ingresa un número válido de pisos";
        }

        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "La descripción es requerida";

        setErrors({
            ...temp
        });

        if (fieldValues === formData)
            return Object.values(temp).every(x => x === "");
    };

    // Manejador para cambios en campos de texto/número
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        setTouched({
            ...touched,
            [name]: true
        });

        validate({ [name]: value });
    };

    // Configuración para el dropzone de la imagen principal
    const onMainImageDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setMainImage(Object.assign(file, {
                preview: URL.createObjectURL(file)
            }));
        }
    }, []);

    // Configuración para el dropzone de la galería
    const onGalleryDrop = useCallback(acceptedFiles => {
        const newImages = acceptedFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        );
        setGalleryImages(prev => [...prev, ...newImages]);
    }, []);

    // Configuración de los dropzones
    const mainImageDropzone = useDropzone({
        onDrop: onMainImageDrop,
        accept: {
            'image/*': ['.jpg', '.jpeg', '.png', '.gif']
        },
        maxFiles: 1
    });

    const galleryDropzone = useDropzone({
        onDrop: onGalleryDrop,
        accept: {
            'image/*': ['.jpg', '.jpeg', '.png', '.gif']
        }
    });

    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Marcar todos los campos como tocados para mostrar errores
        const touchedFields = {};
        Object.keys(formData).forEach(key => touchedFields[key] = true);
        setTouched(touchedFields);

        if (validate() && mainImage && galleryImages.length > 0) {
            if (isEditing) {
                console.log('Actualizando edificación:', buildingId, formData);
            } else {
                console.log('Creando edificación:', formData);
            }
            router.push('/edificaciones');
        }
    };

    const handleCancel = () => {
        router.push('/edificaciones');
    };

    // Añadir este condicional antes del return
    // if (loading) {
    //     return (
    //         <Paper className="p-6 rounded-lg shadow-md w-full flex justify-center items-center" style={{ minHeight: '300px' }}>
    //             <CircularProgress />
    //         </Paper>
    //     );
    // }

    return (
        <Paper className="p-6 rounded-lg shadow-md w-full">
            <Typography variant="h5" className="mb-6 font-bold" style={{ color: "#2498ff" }}>
                {isEditing ? 'Editar Edificación' : 'Nueva Edificación'}
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {/* Nombre del edificio */}
                    <Grid size={{ xs: 4, sm: 4, md: 6 }}>
                        <TextField
                            name="name"
                            label="Nombre del Edificio"
                            variant="outlined"
                            fullWidth
                            value={formData.name}
                            onChange={handleChange}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            required
                        />
                    </Grid>

                    {/* Número de pisos */}
                    <Grid size={{ xs: 4, sm: 4, md: 6 }}>
                        <TextField
                            name="floors"
                            label="Número de Pisos"
                            variant="outlined"
                            fullWidth
                            type="number"
                            inputProps={{ min: 1 }}
                            value={formData.floors}
                            onChange={handleChange}
                            error={touched.floors && Boolean(errors.floors)}
                            helperText={touched.floors && errors.floors}
                            required
                        />
                    </Grid>

                    {/* Imagen principal */}
                    <Grid size={{ xs: 4, sm: 8, md: 6 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Imagen Principal*
                        </Typography>
                        <Box
                            {...mainImageDropzone.getRootProps()}
                            className="p-4 border-2 border-dashed rounded-md cursor-pointer text-center hover:bg-gray-50"
                            style={{
                                borderColor: errors.mainImage ? '#d32f2f' : '#ccc',
                                minHeight: '150px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <input {...mainImageDropzone.getInputProps()} />
                            {mainImage ? (
                                <Box className="flex flex-col items-center">
                                    <img
                                        src={mainImage.preview}
                                        alt="Vista previa"
                                        style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }}
                                    />
                                    <Typography variant="body2" className="mt-2">
                                        {mainImage.name}
                                    </Typography>
                                </Box>
                            ) : (
                                <Box className="flex flex-col items-center">
                                    <CloudUploadIcon style={{ fontSize: 48, color: '#2498ff' }} />
                                    <Typography variant="body1" className="mt-2">
                                        Arrastra una imagen aquí o haz clic para seleccionarla
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        {errors.mainImage && (
                            <FormHelperText error>{errors.mainImage}</FormHelperText>
                        )}
                    </Grid>

                    {/* Galería de imágenes */}
                    <Grid size={{ xs: 4, sm: 8, md: 6 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Galería de Imágenes*
                        </Typography>
                        <Box
                            {...galleryDropzone.getRootProps()}
                            className="p-4 border-2 border-dashed rounded-md cursor-pointer text-center hover:bg-gray-50"
                            style={{
                                borderColor: errors.gallery ? '#d32f2f' : '#ccc',
                                minHeight: '150px'
                            }}
                        >
                            <input {...galleryDropzone.getInputProps()} />
                            <Box className="flex flex-col items-center justify-center">
                                <CloudUploadIcon style={{ fontSize: 48, color: '#2498ff' }} />
                                <Typography variant="body1" className="mt-2">
                                    Arrastra imágenes aquí o haz clic para seleccionarlas
                                </Typography>
                            </Box>
                        </Box>
                        {errors.gallery && (
                            <FormHelperText error>{errors.gallery}</FormHelperText>
                        )}

                        {/* Previsualizaciones de la galería */}
                        {galleryImages.length > 0 && (
                            <Box className="mt-4 flex flex-wrap gap-2">
                                {galleryImages.map((file, index) => (
                                    <Box key={index} className="relative">
                                        <img
                                            src={file.preview}
                                            alt={`Imagen ${index + 1}`}
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            className="rounded"
                                        />
                                        <Button
                                            size="small"
                                            color="error"
                                            variant="contained"
                                            style={{
                                                position: 'absolute',
                                                top: '5px',
                                                right: '5px',
                                                minWidth: '24px',
                                                width: '24px',
                                                height: '24px',
                                                padding: 0
                                            }}
                                            onClick={() => {
                                                setGalleryImages(galleryImages.filter((_, i) => i !== index));
                                            }}
                                        >
                                            ×
                                        </Button>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Grid>

                    {/* Descripción con textarea normal */}
                    <Grid size={{ xs: 4, sm: 8, md: 12 }}>
                        <TextField
                            name="description"
                            label="Descripción"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={6}
                            value={formData.description}
                            onChange={handleChange}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
                            required
                        />
                    </Grid>

                    {/* Botones de acción */}
                    <Grid size={{ xs: 4, sm: 8, md: 12 }}>
                        <Box className="flex justify-end space-x-2 gap-4 mt-4">
                            <Button
                                variant="outlined"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Guardar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
