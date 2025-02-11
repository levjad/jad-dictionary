import { useState, useEffect } from "react";

const fonts = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
} as const;

type FontKey = keyof typeof fonts;

const FontSelector: React.FC = () => {
    const getInitialFont = (): FontKey => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem("font") as FontKey) || "sans";
        }
        return "sans";
    };

    const [selectedFont, setSelectedFont] = useState<FontKey>(getInitialFont());

    useEffect(() => {
        document.documentElement.classList.remove(...Object.values(fonts));
        document.documentElement.classList.add(fonts[selectedFont]);
        localStorage.setItem("font", selectedFont);
    }, [selectedFont]);

    return (
        <div className="flex items-center space-x-2">
            <select
                id="font-select"
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value as FontKey)}
                className="select select-bordered"
            >
                {Object.keys(fonts).map((font) => (
                    <option key={font} value={font}>
                        {font.charAt(0).toUpperCase() + font.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FontSelector;
