import { useEffect, useState } from "react";

// Ensures localStorage reads only happen after the component has mounted in the browser,
// otherwise localStorage might appear empty or cause hydration mismatches
export function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}