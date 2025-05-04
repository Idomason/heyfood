'use client';

import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const OpenRestaurantsInfo = () => {
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        mb: 2,
        flexWrap: 'wrap'
      }}
    >
      <Chip
        icon={<AccessTimeIcon />}
        label="Open now"
        color="success"
        variant="outlined"
        sx={{ 
          borderRadius: 1,
          '& .MuiChip-label': { px: 1 },
          '& .MuiChip-icon': { color: 'inherit' }
        }}
      />
      
      <Typography variant="body2" color="text.secondary">
        30 restaurants open now in Lagos
      </Typography>
    </Box>
  );
};

export default OpenRestaurantsInfo; 