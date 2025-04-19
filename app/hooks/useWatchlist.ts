import { useEffect, useState } from "react";
import { useHasMounted } from "@/app/hooks/useHasMounted";

export function useWatchlist() {
    const [watchlist, setWatchlist] = useState<Movie[]>([]);
    const hasMounted = useHasMounted();

    // Load from localStorage
    useEffect(() => {
        if (hasMounted) {
            const stored = localStorage.getItem("watchlist");
            if (stored) {
                setWatchlist(JSON.parse(stored));
            }
        }
    }, [hasMounted]);

    const saveToLocalStorage = (items: Movie[]) => {
        localStorage.setItem("watchlist", JSON.stringify(items));
    };

    // Checks if any movie in the list has the same id as the one passed in.
    const isInWatchlist = (movie: Movie) => {
        return watchlist.some((m) => m.id === movie.id);
    };

    // If the movie is already in the list, it removes it. If the movie is not in the list, it adds it.
    const toggleWatchlist = (movie: Movie) => {
        const isInList = watchlist.some((m) => m.id === movie.id);
        const updated = isInList
            ? watchlist.filter((m) => m.id !== movie.id)
            : [...watchlist, movie];

        setWatchlist(updated);
        saveToLocalStorage(updated);
    };

    return { watchlist, toggleWatchlist, isInWatchlist };
}