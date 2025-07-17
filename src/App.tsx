import type { BookMarks, BookMark } from './types';
import { useState, useEffect, useMemo, useRef } from 'react';
import Header from './components/Header';
import BookmarkList from './components/BookmarkList';
import EditorModal from './components/EditorModal';
import Fuse from 'fuse.js';
import icon from '../icon.png'; // Ensure you have a logo image in your assets

function App() {
    // State management
    const [bookmarks, setBookmarks] = useState<BookMarks>(
        localStorage.getItem('bookmarks')
            ? JSON.parse(localStorage.getItem('bookmarks')!)
            : {
                'default': [
                    {
                        title: 'Example Bookmark',
                        url: 'https://example.com',
                        description: 'This is an example bookmark.',
                    }
                ]
            }
    );

    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editorContent, setEditorContent] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Effects
    useEffect(() => {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    useEffect(() => {
        if (searchInputRef.current && !isEditorOpen) {
            searchInputRef.current.focus();
        }
    }, [isEditorOpen]);

    useEffect(() => {
        setSelectedIndex(-1);
    }, [searchQuery]);

    // Fuzzy search implementation
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];

        const allBookmarks: (BookMark & { category: string })[] = [];
        Object.entries(bookmarks).forEach(([category, bookmarkList]) => {
            bookmarkList.forEach(bookmark => {
                allBookmarks.push({ ...bookmark, category });
            });
        });

        const fuse = new Fuse(allBookmarks, {
            keys: ['title', 'description', 'url'],
            includeScore: true,
            threshold: 0.4,
        });

        return fuse.search(searchQuery).map(result => result.item);
    }, [searchQuery, bookmarks]);

    // Event handlers
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (searchResults.length > 0 && selectedIndex >= 0 && selectedIndex < searchResults.length) {
            const selectedBookmark = searchResults[selectedIndex];
            window.open(selectedBookmark.url, '_self');
        } else if (searchQuery.trim()) {
            const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
            window.open(googleUrl, '_self');
        }
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Tab') {
            if (searchResults.length > 0) {
                e.preventDefault();

                if (e.shiftKey) {
                    setSelectedIndex(prev => prev <= 0 ? -1 : prev - 1);
                } else {
                    setSelectedIndex(prev => prev === -1 ? 0 : (prev + 1) % searchResults.length);
                }
            }
        } else if (e.key === 'Enter') {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();

                if (searchResults.length > 0 && selectedIndex >= 0 && selectedIndex < searchResults.length) {
                    const selectedBookmark = searchResults[selectedIndex];
                    window.open(selectedBookmark.url, '_blank');
                } else if (searchQuery.trim()) {
                    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
                    window.open(googleUrl, '_blank');
                }
            }
        }
    };

    const handleEditorOpen = () => {
        setEditorContent(JSON.stringify(bookmarks, null, 2));
        setIsEditorOpen(true);
    };

    const handleEditorSave = () => {
        try {
            const newBookmarks = JSON.parse(editorContent);
            setBookmarks(newBookmarks);
            setIsEditorOpen(false);
        } catch (error) {
            alert('Error parsing JSON. Please check the format.');
            console.error("Failed to parse bookmarks JSON:", error);
        }
    };

    return (
        <div className="min-h-screen p-6">
            <Header onEdit={handleEditorOpen} />

            <EditorModal
                isOpen={isEditorOpen}
                content={editorContent}
                onSave={handleEditorSave}
                onCancel={() => setIsEditorOpen(false)}
                onContentChange={setEditorContent}
            />

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto flex justify-center mb-8">
                <img src={icon} />
            </div>
            <div className="max-w-2xl mx-auto mb-8">
                <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        placeholder="Search bookmarks or enter query for Google..."
                        className="w-full px-4 py-3 text-lg border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    {searchQuery && searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-64 overflow-y-auto z-10 shadow-lg">
                            {searchResults.map((bookmark, index) => (
                                <div
                                    key={`${bookmark.category}-${index}`}
                                    className={`px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer ${index === selectedIndex ? 'bg-blue-100' : ''
                                        }`}
                                    onClick={() => window.open(bookmark.url, '_self')}
                                >
                                    <img
                                        src={bookmark.customIconUrl || `https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}`}
                                        alt=""
                                        className="w-4 h-4 mr-3 rounded-sm"
                                    />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900">
                                            {bookmark.title}
                                            <span className="text-xs text-gray-500"> - {bookmark.category}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">{bookmark.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </form>
            </div>

            <BookmarkList bookmarks={bookmarks} />
        </div>
    );
}

export default App
