import {FaPlay} from "react-icons/fa";

interface AudioPlayerProps {
    audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
    return (
        <button className="btn btn-circle mt-2" onClick={() => new Audio(audioUrl).play()}>
            <FaPlay className="text-blue-500" />
        </button>
    );
};

export default AudioPlayer;
