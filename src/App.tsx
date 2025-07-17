import type { BookMarks } from './types';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import BookmarkList from './components/BookmarkList';
import EditorModal from './components/EditorModal';

function App() {
    const [bookmarks, setBookmarks] = useState<BookMarks>(
        localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')!) : {
            'default': [
                {
                    title: 'Example Bookmark',
                    url: 'https://example.com',
                    description: 'This is an example bookmark.',
                }
            ]
        });

    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editorContent, setEditorContent] = useState('');

    useEffect(() => {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

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
            <BookmarkList bookmarks={bookmarks} />
        </div>
    )
}

export default App
