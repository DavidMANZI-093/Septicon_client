import { useState } from "react";

const useShowPass = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return {
        isVisible,
        toggleVisibility,
    }
}

export default useShowPass;