const Footer = () =>
{
    return (
        <footer className="w-full bg-cyan-900 md:text-sm text-xs fixed bottom-0 md:static border-t border-gray-700 md:py-4 py-1 text-center z-40">
            <p className="text-white">&copy; {new Date().getFullYear()} USMLE Bros. All rights reserved.</p>
        </footer>
    );
}
export default Footer;