export const Card = ({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) =>
{
    return (
        <div className={`${className ? className : ""} mt-0 md:mt-4 border border-green-200 md:rounded-lg md:shadow-xl bg-white bg-opacity-95 mb-12`}>
            {children}
        </div>
    );
}


export const CardHeader = ({
    title,
    className
}: {
    title: string;
    className?: string;
}) =>
{
    return (
        <div className={`${className ? className : ""} flex justify-center items-center text-red-600 font-bold`}>
            <h1 className="lg:text-3xl md:text-2xl text-xl">{title}</h1>
        </div>
    );
}

export const CardBody = ({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) =>
{
    return (
        <div className={`${className ? className : ""} mt-4 mb-6 px-4 py-2 flex`}>
            {children}
        </div>
    );
}

export const CardFooter = ({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) =>
{
    return (
        <div className={`${className ? className : ""}`}>
            {children}
        </div>
    );
}
