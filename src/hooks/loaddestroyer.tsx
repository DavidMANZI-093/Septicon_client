import { useState } from "react";

const useLoadKiller = () => {
    const [isLoading, setIsLoading] = useState(true);

    const killLoader = (state: boolean) => {
        setTimeout(() => setIsLoading(state), 2000);
    };

    return {
        isLoading,
        killLoader,
    }
}

export default useLoadKiller;