import { useEffect, useState } from "react";
import {FiMoon, FiSun} from "react-icons/fi";

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
        >
            {!darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>
    );
};

export default ThemeToggle;
