'use client'
import { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { z } from 'zod';
import axios from 'axios';

const formSchema = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório' }),
  description: z.string().min(1, { message: 'A descrição é obrigatória' }),
  pdfFile: z.instanceof(File).refine((file) => file.type === 'application/pdf', {
    message: 'Por favor, carregue um ficheiro PDF',
  }),
  imageFile: z.instanceof(File).refine((file) => file.type.startsWith('image'), {
    message: 'Por favor, carregue um ficheiro de imagem',
  }),
});

export default function Form() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { getRootProps: getDropzoneProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const pdf = acceptedFiles.find((file) => file.type === 'application/pdf');
      const image = acceptedFiles.find((file) => file.type.startsWith('image'));
      if (pdf) setPdfFile(pdf);
      if (image) {
        setImageFile(image);
        const previewUrl = URL.createObjectURL(image);
        setImagePreview(previewUrl);
      }
    },
    multiple: true,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors([]);

    try {
      // Validação do esquema
      formSchema.parse({
        title,
        description,
        pdfFile,
        imageFile,
      });

      // Criar o FormData
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (pdfFile) formData.append('pdfFile', pdfFile);
      if (imageFile) formData.append('imageFile', imageFile);

      // Enviar os dados para o servidor
      const response = await axios.post('https://upload-api-nodejs.vercel.app/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Dados enviados com sucesso:', response.data);
      alert('Formulário enviado com sucesso!');
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errorMessages = e.errors.map((err) => err.message);
        setErrors(errorMessages);
      } else {
        console.error('Erro ao enviar os dados:', e);
        alert('Erro ao enviar os dados. Tente novamente.');
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Formulário de Adição de Disciplina
      </Typography>

      {errors.length > 0 && (
        <Box sx={{ backgroundColor: 'error.main', color: 'white', padding: 2, marginBottom: 2 }}>
          {errors.map((error, index) => (
            <Typography key={index}>{error}</Typography>
          ))}
        </Box>
      )}

      <TextField
        label="Título (Disciplina)"
        fullWidth
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Descrição"
        fullWidth
        required
        multiline
        minRows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: 2,
              border: '2px dashed grey',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 100,
            }}
            {...getDropzoneProps()}
          >
            <input {...getInputProps()} />
            <Typography variant="body1" textAlign="center">
              Arraste ou clique para carregar os ficheiros PDF e de Imagem
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          {pdfFile && <Typography variant="body2">Ficheiro PDF: {pdfFile.name}</Typography>}
        </Grid>

        <Grid item xs={6}>
          {imageFile && (
            <div>
              <Typography variant="body2">Ficheiro de Capa: {imageFile.name}</Typography>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Imagem de Capa"
                  style={{ width: '100%', maxHeight: 300, objectFit: 'cover', marginTop: 10 }}
                />
              )}
            </div>
          )}
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
        Enviar
      </Button>
    </Box>
  );
}
