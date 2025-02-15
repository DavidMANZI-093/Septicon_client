import { useState } from "react";

const useRunSpinner = () => {
    const [isSpinning, setIsSpinning] = useState(false);

    const toggleSpinner = (bool: boolean) => {
        setIsSpinning(bool);
    };

    return {
        isSpinning,
        toggleSpinner,
    }
}

export default useRunSpinner;