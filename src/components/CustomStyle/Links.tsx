export const A = ({ href, children }) => (
    <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold cursor-pointer text-inherit hover:underline"
    >{children}</a>
);

