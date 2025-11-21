const ErrorField = ({ message }: { message: string }) => {
  return (
    <div className="mt-2 text-sm text-red-600" role="alert">
      {message}
    </div>
  );
};

export default ErrorField;
