import { Box, Typography, Container, Button } from "@mui/material";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import theme from "@/theme/theme";
import { RestaurantMenu } from "@mui/icons-material";


const SubNav = () => {
  return <Box className='font-sans' sx={{ backgroundColor: theme.palette.primary.contrastText, padding: 2, mt: .2, mb: .2 }}>
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText, borderRadius: 100, ":hover": { backgroundColor: theme.palette.secondary.main } }} color="inherit"> 
            <RestaurantMenu sx={{marginRight: 1}} />
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              Restaurant
            </Typography>
        </Button>
        <Button sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText, borderRadius: 100, ":hover": { backgroundColor: theme.palette.secondary.main } }} color="inherit"> 
            <LocalGroceryStoreIcon sx={{marginRight: 1}} />
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              Grocery
            </Typography> 
        </Button>
 
      </Box>
    </Container>
  </Box>;
};

export default SubNav;