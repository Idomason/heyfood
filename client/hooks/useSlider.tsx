import { useState } from "react";


export const useSlider = (scrollRef: React.RefObject<HTMLDivElement>, scrollAmount: number = 200) => {
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    function scroll(direction: 'left' | 'right') {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -200 : 200;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

            // Update arrow visibility after scrolling
            setTimeout(() => {
                if (current.scrollLeft <= 0) {
                    setShowLeftArrow(false);
                } else {
                    setShowLeftArrow(true);
                }

                if (current.scrollLeft >= current.scrollWidth - current.clientWidth) {
                    setShowRightArrow(false);
                } else {
                    setShowRightArrow(true);
                }
            }, 300);
        }
    };


    
    const handleScroll = () => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            setShowLeftArrow(current.scrollLeft > 0);
            setShowRightArrow(current.scrollLeft + current.clientWidth < current.scrollWidth - 5);
        }
    };

    return { scrollRef, showLeftArrow, showRightArrow, scroll, handleScroll };
};
