'use client';

import { DiaryModal } from "@/app/components/diaryModal";
import { useDiary } from "@/app/hooks/useDiary";
import Image from 'next/image';
import { useState } from "react";

export default function DiaryPage(){
    const { diary, toggleDiary } = useDiary();
    const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie>();

    const handleEdit = (movie: Movie) => {
        setSelectedMovie(movie);
        setIsDiaryModalOpen(true);
    }

    return (
        <div className="flex justify-center items-start min-h-screen p-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Movie</th>
                        <th scope="col" className="px-6 py-3">Date Watched</th>
                        <th scope="col" className="px-6 py-3">Rating</th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {diary.length > 0 ? (
                        diary.map((movie) => (
                            <tr
                                key={movie.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                            >
                                <td className="px-6 py-4 flex items-center gap-4">
                                    {movie.posterURL ? (
                                        <div className="w-[48px] h-[72px] relative rounded overflow-hidden">
                                            <Image
                                                src={movie.posterURL}
                                                alt={movie.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-[48px] h-[72px] bg-gray-300 rounded" />
                                    )}
                                    <span className="font-medium text-gray-900 dark:text-white">
                                            {movie.title}
                                        </span>
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(movie.watchedDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">{movie.rating}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                    onClick={() => {
                                        handleEdit(movie);
                                    }}
                                        className="px-2 font-medium text-indigo-500 hover:underline">
                                        Edit
                                    </button>
                                    <button
                                    onClick={() => {
                                        const confirmed = window.confirm(`Are you sure you want to remove ${movie.title} from your diary?`);
                                        if(confirmed) {
                                            toggleDiary(movie);
                                        }
                                    }}
                                        className="px-2 font-medium text-red-500 hover:underline">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-6 text-gray-500">
                                Your diary is empty.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {isDiaryModalOpen && selectedMovie && (
                <DiaryModal
                    isOpen={isDiaryModalOpen}
                    movie={selectedMovie}
                    onAdd={() => setIsDiaryModalOpen(false)}
                    onClose={() => setIsDiaryModalOpen(false)}
                />
            )}
        </div>
    );
}