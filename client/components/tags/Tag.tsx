import theme from "@/theme/theme";
import { Box, Typography } from "@mui/material"

interface TagProps {
  name: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  onClick: (tagName: string) => void;
}

const Tag = ({ name, icon, isSelected = false, onClick }: TagProps) => {
    return <Box 
        className='font-sans' 
        onClick={() => onClick(name)}
        sx={{
            padding: 2, 
            borderRadius: 3, 
            minWidth: "5rem",
            display: "flex", 
            flexDirection: "column",
            alignItems: "center", 
            gap: 1,
        
            backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.grey[200],
            color: isSelected ? theme.palette.primary.contrastText : "inherit",
            cursor: "pointer",
            transition: "all 0.2s ease",
            ":hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText
            }
        }}
    >
        {icon}
        <Typography 
            variant="body2" 
            sx={{ 
                whiteSpace: "nowrap", 
                fontWeight: isSelected ? 700 : 500 
            }}
        >
            {name}
        </Typography>
    </Box>
}

export default Tag;