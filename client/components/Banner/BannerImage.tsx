
import { Box, Typography } from '@mui/material';

interface BannerImageProps {
  imageUrl: string;
}

const BannerImage = ({ imageUrl }: BannerImageProps) => {
  return (
    <Box 
    className='font-sans'
    component="img"
    src={imageUrl}
    alt="Food Delivery"
    sx={{ 
      width: { xs: '100%', md: '300px' }, 
      height: 'auto',
      mt: { xs: 2, md: 0 },
      borderRadius: 2 
    }}
  />
  );
};

export default BannerImage;


