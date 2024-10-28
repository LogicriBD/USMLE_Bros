const Error = ({ error }: { error?: string }) =>
{
    if (!!error)
    {
        return (
            <div className="w-full bg-red-200 text-red-900 border border-red-900 px-4 py-2">
                {error}
            </div>
        )
    }
    return null;
}

export default Error;