'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { z } from 'zod';
import axios from 'axios';

const formSchema = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório' }),
  year: z
    .number({ invalid_type_error: 'O ano deve ser um número' })
    .min(2000, { message: 'Ano mínimo permitido: 2000' })
    .max(2100, { message: 'Ano máximo permitido: 2100' }),
  institution: z.string().min(1, { message: 'A instituição é obrigatória' }),
  images: z
    .array(z.instanceof(File).refine((file) => file.type.startsWith('image/'), {
      message: 'Apenas imagens são permitidas',
    }))
    .min(1, { message: 'Adicione pelo menos uma imagem' }),
});

export default function Form() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [institution, setInstitution] = useState('');
  const [images, setImages] = useState<(File | null)[]>([null]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleImageChange = (index: number, file: File | null) => {
    const updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  const addImageField = () => {
    setImages([...images, null]);
  };

  const removeImageField = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors([]);

    try {
      // Validação
      const validImages = images.filter((img): img is File => img !== null);
      formSchema.parse({
        title,
        year: Number(year),
        institution,
        images: validImages,
      });

      const formData = new FormData();
      formData.append('title', title);
      formData.append('year', year);
      formData.append('institution', institution);
      validImages.forEach((img, index) => {
        formData.append(`images`, img); // ou use `images[${index}]` se o backend diferenciar
      });

      const response = await axios.post('https://upload-api-nodejs.vercel.app/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Sucesso:', response.data);
      alert('Formulário enviado com sucesso!');
    } catch (e) {
      if (e instanceof z.ZodError) {
        const messages = e.errors.map((err) => err.message);
        setErrors(messages);
      } else {
        console.error('Erro ao enviar:', e);
        alert('Erro ao enviar os dados.');
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Formulário de Adição de Disciplina
      </Typography>

      {errors.length > 0 && (
        <Box sx={{ bgcolor: 'error.main', color: 'white', p: 2, mb: 2 }}>
          {errors.map((error, i) => (
            <Typography key={i}>{error}</Typography>
          ))}
        </Box>
      )}

      <TextField
        label="Título (Disciplina)"
        fullWidth
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Ano"
        fullWidth
        required
        type="number"
        inputProps={{ min: 2000, max: 2100 }}
        value={year}
        onChange={(e) => setYear(e.target.value)}
        sx={{ mb: 2 }}
      />



      <TextField
        label="Instituição"
        fullWidth
        required
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Imagens da Disciplina
        </Typography>

        {images.map((image, index) => (
          <Grid container spacing={1} alignItems="center" key={index} sx={{ mb: 1 }}>
            <Grid item xs={10}>
              <Button component="label" variant="outlined" fullWidth>
                {image ? image.name : 'Escolher imagem'}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    handleImageChange(index, file);
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => removeImageField(index)} disabled={images.length === 1}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Button onClick={addImageField} startIcon={<AddIcon />} sx={{ mb: 2 }}>
          Adicionar imagem
        </Button>
      </Box>


      <Button type="submit" variant="contained">
        Enviar
      </Button>
    </Box>
  );
}
