import { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Import des Such-Icons

interface SearchBarProps {
    onSearch: (word: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSearch(input);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            <input
                type="text"
                placeholder="Search for a word..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="input input-bordered w-full pr-12"
            />
            <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
                <FiSearch size={24} />
            </button>
        </form>
    );
};

export default SearchBar;
