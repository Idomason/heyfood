'use client';

import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  IconButton,
  useMediaQuery,
  useTheme,
  TextField,
  InputAdornment,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  CircularProgress
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import Circle from '@mui/icons-material/Circle';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ClearIcon from '@mui/icons-material/Clear';
import restaurantApi from '@/app/api/restaurantApi';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
};


type RestaurantProp = {
  id: number; // string
  name: string;
  logo?: string;
  coverImage?: string;
  tags?: string[];
};

const Header = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Update searchQuery when searchTerm has 3+ characters
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.length >= 3) {
        setSearchQuery(searchTerm);
        setShowResults(true);
      } else if (searchTerm.length === 0) {
        setSearchQuery('');
        setShowResults(false);
      }
    }, 300); // Debounce delay of 300ms

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Fetch filtered restaurants based on search query
  const { 
    data: restaurants = [], 
    isLoading: isLoadingRestaurants,
  } = useQuery<RestaurantProp[]>({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      const response = await restaurantApi.searchRestaurants(searchQuery);
      return response.data;
    },
    enabled: searchQuery.length >= 3
  });

  // Handle search change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.length >= 3) {
      setSearchQuery(searchTerm);
      setShowResults(true);
    }
  };

  // Handle clear
  const handleClear = () => {
    setSearchTerm('');
    setSearchQuery('');
    setShowResults(false);
  };

  // Handle clicking outside to close results
  useEffect(() => {
    const handleClickOutside = () => {
      setShowResults(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle clicking on search container to stop propagation
  const handleSearchContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Log when results are returned
  useEffect(() => {
    if (restaurants && restaurants.length > 0) {
      console.log('Search results:', restaurants);
    }
  }, [restaurants]);

  return (
    <AppBar className='font-sans' position="static" color="default" elevation={0} sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>

        <MenuIcon />
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ height: 40, width: 120, position: 'relative' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                <Image src="https://heyfood.africa/icons/new/logo-circle-green.svg" alt="HeyFood" fill />
              </Typography>
            </Box>
          </Box>

          {/* Location */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, mr: 2, cursor: 'pointer' }}>
            <LocationOnIcon sx={{ color: theme.palette.primary.dark, mr: 1 }} />
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block', fontWeight: '500' } }}>
              Set Location
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            onClick={handleSearchContainerClick}
            sx={{ 
              flex: 1, 
              display: { xs: 'none', md: 'flex' }, 
              mx: 2,
              position: 'relative'
            }}
          >
            <TextField
              size="small"
              placeholder="Search restaurants or foods..."
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm ? (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClear} edge="end" size="small">
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                  sx: { 
                    borderRadius: 100,
                    backgroundColor: '#eeeeee',
                    '&:hover': { backgroundColor: '#e0e0e0' }
                  }
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  width: '60%',
                },
              }}
            />
            
            {/* Search Results Dropdown */}
            {showResults && searchTerm.length >= 3 && (
              <Paper 
                elevation={3} 
                sx={{ 
                  position: 'absolute', 
                  top: '100%', 
                  left: 0, 
                  right: 0, 
                  zIndex: 1000,
                  mt: 0.5,
                  maxHeight: 400,
                  overflow: 'auto',
                  borderRadius: 1
                }}
              >
                {isLoadingRestaurants ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                    <CircularProgress size={24} />
                  </Box>
                  ) : restaurants.length === 0 ? (        
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <p>No results found for &quot;{searchTerm}&quot;</p>
                    </Typography>
                  </Box>
                ) : (
                  <List sx={{ width: '100%', p: 0 }}>
                    {restaurants.map((restaurant: RestaurantProp, index: number) => (
                      <React.Fragment key={restaurant.id}>
                        <ListItem 
                          component={Link}
                          href={`/restaurants/${restaurant.id}`}
                          sx={{ 
                            py: 1.5, 
                            px: 2,
                            '&:hover': { 
                              backgroundColor: 'rgba(0, 0, 0, 0.04)' 
                            } 
                          }}
                        >
                          <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                            <Avatar 
                              src={restaurant.logo || restaurant.coverImage} 
                              alt={restaurant.name}
                              variant="rounded"
                              sx={{ width: 48, height: 48, mr: 2 }}
                            />
                            <ListItemText 
                              primary={
                                <Typography variant="subtitle1" fontWeight="medium">
                                  {restaurant.name}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                  {restaurant.tags?.slice(0, 2).join(', ')}
                                </Typography>
                              }
                            />
                          </Box>
                        </ListItem>
                        {index < restaurants.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </Paper>
            )}
          </Box>
    

          {/* Actions */}
          {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button sx={{ fontWeight: 'bold' }} color="inherit">
                SIGN IN
            </Button>
            <IconButton sx={{ backgroundColor: theme.palette.primary.dark, color: 'white', borderRadius: 10, ":hover": { backgroundColor: theme.palette.secondary.main } }} color="inherit" aria-label="cart">
              <span className="flex items-center space-x-2 text-sm px-2 py-.5 font-semibold">
                <span>
                  <LocalGroceryStoreIcon sx={{fontSize: 20}} />
                </span>
                <span>
                  CART 
                </span>
                <span>
                  <Circle sx={{ color: theme.palette.primary.contrastText, fontSize: 7 }} />
                </span>
                <span>
                  0
                </span>
              </span>
            </IconButton>
          </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 