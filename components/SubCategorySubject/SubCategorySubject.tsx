'use client';

import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
} from '@mui/material';

const SubCategorySubject = () => {
  const [subject, setSubject] = useState('opcao2');
  const [year, setYear] = useState('opcao1');
  const [college, setCollege] = useState('opcao1');

  const handleSubjectChange = (event: SelectChangeEvent) => {
    setSubject(event.target.value);
  };

  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  const handleCollegeChange = (event: SelectChangeEvent) => {
    setCollege(event.target.value);
  };
  

  return (
    <Stack direction="row" spacing={2} flexWrap="wrap" >
      <Box sx={{ maxWidth: 200 }}>
        <FormControl fullWidth >
          <InputLabel id="select-subject-label">Disciplina</InputLabel>
          <Select
            labelId="select-subject-label"
            value={subject}
            onChange={handleSubjectChange}
            label="Disciplina"
          >
            <MenuItem value="opcao1">Todos</MenuItem>
            <MenuItem value="opcao2">Matemática</MenuItem>
            <MenuItem value="opcao3">Física</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ maxWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="select-year-label">Ano</InputLabel>
          <Select
            labelId="select-year-label"
            value={year}
            onChange={handleYearChange}
            label="Ano"
          >
            <MenuItem value="opcao1">Todos</MenuItem>
            <MenuItem value="opcao2">1º Ano</MenuItem>
            <MenuItem value="opcao3">2º Ano</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ maxWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="select-college-label">Instituição</InputLabel>
          <Select
            labelId="select-college-label"
            value={college}
            onChange={handleCollegeChange}
            label="Instituição"
          >
            <MenuItem value="opcao1">Todas</MenuItem>
            <MenuItem value="opcao2">Universidade X</MenuItem>
            <MenuItem value="opcao3">Instituto Y</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default SubCategorySubject;
