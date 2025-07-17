import React from 'react';

interface HeaderProps {
    onEdit: () => void;
}

const Header: React.FC<HeaderProps> = ({ onEdit }) => {
    return (
        <div className="fixed top-0 right-2 mt-2 mr-2 opacity-0 hover:opacity-100 transition-opacity duration-300 z-50 cursor-pointer">
            <button
                onClick={onEdit}
                className="bg-neutral-200 hover:bg-neutral-300 text-black font-bold py-2 px-4 rounded"
            >
                Edit Bookmarks
            </button>
        </div>
    );
};

export default Header;
