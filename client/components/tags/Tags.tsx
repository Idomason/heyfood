import { Box, Container, IconButton, Skeleton } from "@mui/material";
import Tag from "./Tag";
import { Fastfood, ChevronLeft, ChevronRight, FilterAltOff, LocalPizza, Restaurant as RestaurantIcon, RamenDining, Grass, Coffee, EggAlt, EmojiFoodBeverage, LocalBar } from "@mui/icons-material";
import theme from "@/theme/theme";
import { useRef, useState, useEffect } from "react";
import { useSlider } from "@/hooks/useSlider";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import restaurantApi from "@/app/api/restaurantApi";

// Map tag names to appropriate icons
const getIconForTag = (tagName: string) => {
  const tagNameLower = tagName.toLowerCase();
  
  if (tagNameLower.includes('pizza')) return <LocalPizza />;
  if (tagNameLower.includes('beef') || tagNameLower.includes('meat')) return <RestaurantIcon />;
  if (tagNameLower.includes('vegan') || tagNameLower.includes('salad')) return <Grass />;
  if (tagNameLower.includes('pasta') || tagNameLower.includes('noodle')) return <RamenDining />;
  if (tagNameLower.includes('drink') || tagNameLower.includes('beverage')) return <LocalBar />;
  if (tagNameLower.includes('coffee') || tagNameLower.includes('tea')) return <Coffee />;
  if (tagNameLower.includes('breakfast') || tagNameLower.includes('egg')) return <EggAlt />;
  if (tagNameLower.includes('soup')) return <EmojiFoodBeverage />;
  
  // Default icon
  return <Fastfood />;
};

const Tags = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const scrollRef = useRef<HTMLDivElement>(null);
    const { showLeftArrow, showRightArrow, scroll, handleScroll } = useSlider(scrollRef as React.RefObject<HTMLDivElement>);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Fetch tags from backend
    const { data: tags = [], isLoading: isLoadingTags } = useQuery({
      queryKey: ['tags'],
      queryFn: restaurantApi.getTags
    });

    // Initialize selected tag from URL params
    useEffect(() => {
        const tagParam = searchParams.get('tag');
        if (tagParam) {
            setSelectedTag(tagParam);
        }
    }, [searchParams]);

    // Handle tag selection
    const handleTagClick = (tagName: string) => {
        const newTag = selectedTag === tagName ? null : tagName;
        setSelectedTag(newTag);
        
        // Update URL with tag filter
        if (newTag) {
            router.push(`?tag=${encodeURIComponent(newTag)}`);
        } else {
            router.push('/');
        }
    };

    // Handle resetting the filter
    const handleResetFilter = () => {
        setSelectedTag(null);
        router.push('/');
    };

    return <Box className='font-sans' sx={{backgroundColor: theme.palette.primary.contrastText, padding: 2, width: '100%', mt: .3, position: 'relative'}}>
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
            {selectedTag && (
                <IconButton 
                    onClick={handleResetFilter}
                    sx={{ 
                        position: 'absolute', 
                        left: -10, 
                        top: -10, 
                        zIndex: 3,
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        '&:hover': { bgcolor: theme.palette.primary.dark }
                    }}
                    size="small"
                >
                    <FilterAltOff fontSize="small" />
                </IconButton>
            )}
            
            {showLeftArrow && (
                <IconButton 
                    onClick={() => scroll('left')}
                    sx={{ 
                        position: 'absolute', 
                        left: 0, 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        zIndex: 2,
                        bgcolor: 'rgba(255,255,255,0.7)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.7)' }
                    }}
                >
                    <ChevronLeft />
                </IconButton>
            )}
            
            <Box 
                ref={scrollRef}
                onScroll={handleScroll}
                sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    padding: '0 30px',
                    position: 'relative',
                    scrollSnapType: 'x mandatory',
                    '& > *': {
                        scrollSnapAlign: 'start'
                    }
                }}
            >
                {isLoadingTags ? (
                    // Show loading skeletons while tags are being fetched
                    Array.from(new Array(8)).map((_, index) => (
                        <Skeleton 
                            key={index} 
                            variant="rounded" 
                            width={80} 
                            height={80} 
                            sx={{ minWidth: '5rem', borderRadius: 3 }}
                        />
                    ))
                ) : (
                    // Render actual tags once loaded
                    tags.map((tag) => (
                        <Tag 
                            key={tag.id}
                            name={tag.name}
                            icon={getIconForTag(tag.name)}
                            isSelected={selectedTag === tag.name}
                            onClick={handleTagClick}
                        />
                    ))
                )}
            </Box>
            
            {showRightArrow && (
                <IconButton 
                    onClick={() => scroll('right')}
                    sx={{ 
                        position: 'absolute', 
                        right: 0, 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        zIndex: 2,
                        bgcolor: 'rgba(255,255,255,0.7)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.7)' }
                    }}
                >
                    <ChevronRight />
                </IconButton>
            )}
        </Container>
    </Box>
}

export default Tags;