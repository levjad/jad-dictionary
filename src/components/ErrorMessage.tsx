interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="flex justify-center items-center h-48 text-red-500 text-lg font-semibold">
            {message}
        </div>
    );
};

export default ErrorMessage;
