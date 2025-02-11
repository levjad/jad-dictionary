import { useEffect, useState } from "react";
import axios from "axios";
import AudioPlayer from "./AudioPlayer";
import ErrorMessage from "./ErrorMessage.tsx";
import LoadingIndicator from "./LoadingIndicator.tsx";
import {FaExternalLinkAlt} from "react-icons/fa";

interface WordResultProps {
    word: string;
}

interface Definition {
    definition: string;
    example?: string;
}

interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];
}

interface WordData {
    word: string;
    phonetic?: string;
    meanings: Meaning[];
    sourceUrls?: string[];
    phonetics?: { audio?: string }[];
}

const WordResult: React.FC<WordResultProps> = ({ word }) => {
    const [data, setData] = useState<WordData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(null);
        setData(null);

        axios
            .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then((res) => setData(res.data[0]))
            .catch(() => setError("Word not found"));
    }, [word]);

    if (error) return <ErrorMessage message={error} />;
    if (!data) return <LoadingIndicator />;

    return (
        <div className="mt-6">
            <div className="flex content-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold">{data.word}</h1>
                    {data.phonetic && <p className="text-xl text-blue-500">{data.phonetic}</p>}
                </div>
                {data.phonetics?.[0]?.audio && <AudioPlayer audioUrl={data.phonetics[0].audio} />}
            </div>
            {data.meanings.map((meaning, idx) => (
                <div key={idx} className="py-2">
                    <div className="divider divider-start italic font-semibold my-8">{meaning.partOfSpeech}</div>
                    <h2 className="text-lg text-gray-700 font-semibold my-3">Meanings</h2>
                    <ul className="list-disc pl-10 marker:text-blue-500 space-y-4">
                        {meaning.definitions.map((def, index) => (
                            <li key={index}>
                                {def.definition}
                                {def.example && <p className="text-gray-500 italic">"{def.example}"</p>}
                            </li>
                        ))}
                    </ul>
                    {meaning.synonyms.length > 0 && (
                        <div className="flex gap-3 my-3 items-center">
                            <h2 className="text-lg text-gray-700 font-semibold my-3">Synonyms</h2>
                            <span className="text-blue-500 text-lg">{meaning.synonyms.join(', ')}</span>
                        </div>
                    )}
                    {meaning.antonyms.length > 0 && (
                        <div className="flex gap-2 my-3 items-center">
                            <h2 className="text-lg text-gray-700 font-semibold my-3">Antonyms</h2>
                            <span className="text-blue-500 text-lg">{meaning.antonyms.join(', ')}</span>
                        </div>
                    )}
                </div>
            ))}
            <div className="divider"></div>
            {data.sourceUrls && (
                <p className="flex gap-2 items-center justify-center mt-2 text-sm italic text-gray-700">
                    <span className="font-semibold mr-3">Source</span>
                    <a href={data.sourceUrls[0]} className="hover:text-blue-500 underline" target="_blank" rel="noopener noreferrer">{data.sourceUrls[0]}</a>
                    <FaExternalLinkAlt />
                </p>
            )}
        </div>
    );
};

export default WordResult;
