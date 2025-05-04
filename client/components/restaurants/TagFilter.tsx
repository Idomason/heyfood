'use client';

import React from 'react';
import { Box, Chip, Typography, Skeleton, Button } from '@mui/material';
import { Tag } from '@/app/api/restaurantApi';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import theme from '@/theme/theme';

interface TagFilterProps {
  tags: Tag[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  isLoading: boolean;
}

const TagFilter: React.FC<TagFilterProps> = ({ 
  tags, 
  selectedTag, 
  onTagSelect,
  isLoading
}) => {
  // Handle click on tag
  const handleTagClick = (tagName: string) => {
    if (selectedTag === tagName) {
      onTagSelect(null); // Clear filter if clicking the same tag
    } else {
      onTagSelect(tagName);
    }
  };

  // Handle reset
  const handleReset = () => {
    onTagSelect(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1, color: 'text.secondary' }}>
          Categories
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} width={80} height={32} variant="rounded" />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography variant="subtitle1" fontWeight="medium" sx={{ color: 'text.secondary' }}>
          Categories
        </Typography>
        
        {selectedTag && (
          <Button
            size="small"
            variant="text"
            color="inherit"
            startIcon={<FilterAltOffIcon fontSize="small" />}
            onClick={handleReset}
            sx={{ 
              fontSize: '0.75rem', 
              color: 'text.secondary',
              textTransform: 'none',
              p: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            Reset
          </Button>
        )}
      </Box>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
        {tags.map((tag) => (
          <Chip
            key={tag.id}
            label={`${tag.name} (${tag.count})`}
            onClick={() => handleTagClick(tag.name)}
            variant={selectedTag === tag.name ? "filled" : "outlined"}
            size="small"
            sx={{
              borderRadius: '16px',
              fontSize: '0.75rem',
              height: '28px',
              backgroundColor: selectedTag === tag.name ? theme.palette.primary.light : 'transparent',
              borderColor: selectedTag === tag.name ? 'transparent' : 'rgba(0, 0, 0, 0.12)',
              color: selectedTag === tag.name ? 'text.primary' : 'text.secondary',
              fontWeight: selectedTag === tag.name ? 'medium' : 'normal',
              '&:hover': {
                backgroundColor: selectedTag === tag.name 
                  ? 'rgba(0, 0, 0, 0.12)' 
                  : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TagFilter; 