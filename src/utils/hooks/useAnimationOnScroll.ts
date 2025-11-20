import AOS from "aos";
import { useEffect } from "react";

export const useAnimationOnScroll = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200, // Animation duration in ms
            once: false, // Whether animation should happen only once
        });
    }, []);
}
