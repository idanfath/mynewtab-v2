import React from 'react';
import Editor from '@monaco-editor/react';

interface EditorModalProps {
    isOpen: boolean;
    content: string;
    onSave: () => void;
    onCancel: () => void;
    onContentChange: (value: string) => void;
}

const EditorModal: React.FC<EditorModalProps> = ({
    isOpen,
    content,
    onSave,
    onCancel,
    onContentChange
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl w-3/4 h-3/4 flex flex-col">
                <div className="py-2 px-5 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold text-neutral-800">
                        Edit Bookmarks
                    </h3>
                    <div>
                        <button
                            onClick={onSave}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded mr-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={onCancel}
                            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1.5 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                <div className="flex-grow">
                    <Editor
                        height="100%"
                        language="json"
                        value={content}
                        onChange={(value) => onContentChange(value || '')}
                        theme="vs-dark"
                    />
                </div>
            </div>
        </div>
    );
};

export default EditorModal;
