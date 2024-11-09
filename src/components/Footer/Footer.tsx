const Footer = () =>
{
    return (
        <footer className="w-full flex justify-center items-center mt-auto bg-cyan-900 md:text-sm text-xs border-t border-gray-700 md:py-4 py-1 text-center">
            <p className="text-white">&copy; {new Date().getFullYear()} USMLE Bros. All rights reserved.</p>
        </footer>
    );
}
export default Footer;