import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

type DiaryModalProps = {
    isOpen: boolean;
    movie: Movie;
    onClose: () => void;
    onAdd: (movie: Movie) => void;
}

export function DiaryModal({ isOpen, onClose, movie, onAdd }: DiaryModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                                <button
                                    onClick={onClose}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                    Log movie to Diary
                                </Dialog.Title>
                                <p className="text-sm text-gray-500 mb-4">Movie: {movie.title}</p>

                                <button
                                    onClick={() => {
                                        onAdd(movie);
                                        onClose();
                                    }}
                                    className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                                >
                                    Save
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}