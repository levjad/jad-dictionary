import { useState } from "react";
import SearchBar from "./components/SearchBar.tsx";
import WordResult from "./components/WordResult";
import ThemeToggle from "./components/ThemeToggle";
import FontSelector from "./components/FontSelector";
import {FiBook} from "react-icons/fi";

function App() {
    const [word, setWord] = useState<string | null>(null);

    return (
        <div className="min-h-screen p-6 bg-base-100 text-base-content">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <FiBook className="text-4xl font-bold" />
                    <div className="flex content-center gap-6">
                        <FontSelector />
                        <ThemeToggle />
                    </div>
                </div>
                <SearchBar onSearch={setWord} />
                {word && <WordResult word={word} />}
            </div>
        </div>
    );
}

export default App;
