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
import SubCategorySubject from '../SubCategorySubject/SubCategorySubject';


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
      <AppBar position="sticky" sx={{ bgcolor: 'white', boxShadow: 'none', borderBottom: '1px solid #ddd', paddingY: 1 }}>
        <Toolbar sx={{ display: 'flex', flexDirection:{md: 'row', xs: 'column', }, justifyContent: 'space-between', boxShadow: 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
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
              <SubCategorySubject />            
          </Box>
        </Toolbar>
        
        
      </AppBar>
     
    </Box>
  );
}