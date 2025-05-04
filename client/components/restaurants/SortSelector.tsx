'use client';

import React from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  SelectChangeEvent
} from '@mui/material';

interface SortOption {
  value: string;
  label: string;
}

interface SortSelectorProps {
  selectedSort: string;
  onSortChange: (sort: string) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ selectedSort, onSortChange }) => {
  const sortOptions: SortOption[] = [
    { value: 'rating', label: 'Rating' },
    { value: 'deliveryTime', label: 'Delivery Time' },
    { value: 'deliveryFee', label: 'Delivery Fee' },
    { value: 'minimumOrder', label: 'Minimum Order' }
  ];

  const handleChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value);
  };

  return (
    <Box sx={{ mb: { xs: 2, md: 3 }, minWidth: 180 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="sort-selector-label">Sort By</InputLabel>
        <Select
          labelId="sort-selector-label"
          id="sort-selector"
          value={selectedSort}
          label="Sort By"
          onChange={handleChange}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortSelector; 