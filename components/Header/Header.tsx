'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Home, Menu, PlusSquare, Search, User } from 'lucide-react';
import Link from 'next/link';
import logo from '../../public/logo.png'
import Image from 'next/image';
import { useFetchPosts } from '@/utils/Post/FetchPosts';
import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, TextField, Box, InputAdornment, Button, IconButton, Drawer } from '@mui/material';
import { ButtonWithRef, IconButtonWithRef } from '../Wrapper/Wrapper';


export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClickedForSearch, setIsClickedForSearch] = useState(false);
  const { posts, loading, error } = useFetchPosts();
  const [searchValue, setSearchValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const subjectListRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonSubjectRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    const formattedSearchTerm = searchTerm.replace(/ /g, '+');
    router.push(`/results?search_query=${formattedSearchTerm}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      (formRef.current && !formRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node))
    ) {
      setIsClickedForSearch(false);
    }

    if (
      (subjectListRef.current && !subjectListRef.current.contains(event.target as Node) &&
        buttonSubjectRef.current &&
        !buttonSubjectRef.current.contains(event.target as Node))
    ) {
      setIsHovered(false);
    }
  };

  const normalizeString = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const uniquePosts = Array.from(
    new Map(filteredPosts.map((post) => [post.title, post])).values()
  );

  return (
    <Box sx={{ flexGrow: 1, zIndex: 40}}>
      <AppBar position="sticky" sx={{ bgcolor: 'white', boxShadow: 'none', borderBottom: '1px solid #ddd' }}>
        <Toolbar sx={{ display: 'flex', flexDirection:{md: 'row', xs: 'column'}, justifyContent: 'space-between', boxShadow: 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'start', width: '100%', gap: 2 }}>
            <Image
              alt="Logo"
              src={logo}
              placeholder='blur'
              height={0}
              width={0}
              className='md:h-10 h-6 pt-1 md:pt-0 w-auto'
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: { xs: '100%', md: 'fit-content' } }}>
            <IconButton href="/" sx={{ marginRight: { xs: 0, md: 10 } }}>
              <Home />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconButton href="/newpost" sx={{display: 'none'}}>
                <PlusSquare />
              </IconButton>
              <ButtonWithRef
                ref={buttonSubjectRef}
                onClick={() => setIsHovered(!isHovered)}
                sx={{
                  color: 'black',
                  border: '1px solid', // Define uma borda
                  borderColor: 'rgba(0, 0, 0, 0.12)', // Similar ao Tailwind
                  borderRadius: '0.375rem', // Arredondamento similar ao Tailwind (md)
                  padding: '0.5rem 1rem', // Espaçamento interno
                  transition: 'all 0.3s ease', // Transição suave
                  '&:hover': {
                    borderColor: 'rgba(0, 0, 0, 0.3)', // Muda a cor ao passar o mouse
                  },
                  display: { xs: 'none', md: 'block' }
                }}
              >
                Filtrar
              </ButtonWithRef>

              <IconButtonWithRef
                ref={buttonRef}
                onClick={() => setIsClickedForSearch(!isClickedForSearch)}
              >
                <Search />
              </IconButtonWithRef>
              <IconButton
                onClick={toggleDrawer}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <Menu color='#3d70a2' />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
        {isHovered && (
          <Box
          ref={subjectListRef}
          sx={{
            position: 'absolute',
            top: {xs:80, md:56},
            left: 0,
            width: '100%',
            bgcolor: 'background.paper',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 10,
            p: 2,
            transition: 'transform 0.3s ease',
          }}
        >
          <TextField
            fullWidth
            placeholder="Pesquisar disciplina"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={() => console.log('Pesquisar:', searchValue)}>Pesquisar</Button>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              maxHeight: 200,
              overflowY: 'auto',
              mt: 2,
              display: 'flex', // Define layout flexível
              flexWrap: 'wrap', // Permite o wrap
              gap: 1, // Espaçamento entre os itens
            }}
          >
            {!loading &&
              !error &&
              uniquePosts.map((item) => (
                <Link
                  key={item._id}
                  href={`/posts/${normalizeString(item.title)}`}
                  onClick={() => setIsHovered(false)}
                  
                  className='hover:text-[#3d70a2] hover:scale-105 text-black p-2 transition-all duration-75'
                >
                  {item.title}
                </Link>
              ))}
          </Box>
        </Box>
        
        )}
        {isClickedForSearch && (
          <form
            ref={formRef}
            onSubmit={handleSearch}
            className='top-20 md:top-14'
            style={{
              position: 'absolute',
              
              left: 0,
              width: '100%',
              background: 'white',
              padding: 16,
              zIndex: 10,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <TextField
              fullWidth
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button type="submit">Pesquisar</Button>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        )}
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: '80vw',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
          }}
          role="presentation"
          onClick={toggleDrawer}
        >
          {/* Header */}
          

          {/* Search Field */}
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              placeholder="Pesquisar disciplina"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={() => console.log('Pesquisar:', searchValue)}>Pesquisar</Button>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Scrollable Subjects List */}
          <Box
            ref={subjectListRef}
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 2,
              bgcolor: 'background.paper',
              color: 'black'
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {loading && <li>Carregando...</li>}
              {error && <li>Erro ao carregar disciplinas.</li>}
              {!loading &&
                !error &&
                uniquePosts.map((item) => (
                  <li key={item._id} style={{ marginBottom: '8px' }}>
                    <Link
                      href={`/posts/${item.title}`}
                      onClick={() => setIsHovered(false)}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}