import { useEffect, useState } from "react";
import { useHasMounted } from "@/app/hooks/useHasMounted";

export function useDiary() {
    const [diary, setDiary] = useState<Movie[]>([]);
    const hasMounted = useHasMounted();

    // Load from localStorage
    useEffect(() => {
        if (hasMounted) {
            const stored = localStorage.getItem("diary");
            if (stored) {
                setDiary(JSON.parse(stored));
            }
        }
    }, [hasMounted])

    const saveToLocalStorage = (items: Movie[]) => {
        localStorage.setItem("diary", JSON.stringify(items));
    };

    const isInDiary = (movie: Movie) => {
        return diary.some((m) => m.id === movie.id);
    };

    // If the movie is already in the list, it removes it. If the movie is not in the list, it adds it.
    const toggleDiary = (movie: Movie) => {
        const isInList = diary.some((m) => m.id === movie.id);
        const updated = isInList
            ? diary.filter((m) => m.id !== movie.id)
            : [...diary, movie];

        setDiary(updated);
        saveToLocalStorage(updated);
    };

    return {diary, toggleDiary, isInDiary};
}