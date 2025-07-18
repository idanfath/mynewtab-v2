import React from 'react';
import type { BookMarks } from '../types';
import { getFaviconUrl } from '../lib';

interface BookmarkListProps {
    bookmarks: BookMarks;
}

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks }) => {
    return (
        <div className="max-w-6xl mx-auto">
            {Object.keys(bookmarks).map((category) => (
                <div key={category} className="mb-8">
                    <div className="mb-4 flex">
                        <h2 className="text-2xl font-bold capitalize">
                            {category}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bookmarks[category].map((bookmark, index) => {
                            const faviconUrl = getFaviconUrl(bookmark.url);

                            return (
                                <a
                                    key={index}
                                    href={bookmark.url}
                                    rel="noopener noreferrer"
                                    className="bg-white relative cursor-pointer rounded-lg shadow-md p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform group"
                                >
                                    <div className="flex items-start">
                                        <img
                                            src={bookmark.customIconUrl || faviconUrl}
                                            alt=""
                                            className="mr-3 rounded-sm h-12 w-12"
                                        />
                                        <div className="flex flex-col align-text-top">
                                            <p className="text-neutral-800 font-medium">
                                                {bookmark.title}
                                            </p>
                                            {bookmark.description && (
                                                <p className="text-gray-600 text-sm">
                                                    {bookmark.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookmarkList;
