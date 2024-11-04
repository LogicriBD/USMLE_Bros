const Footer = () =>
{
    return (
        <footer className="w-full bg-cyan-900 fixed bottom-0 sm:static mt-8 border-t border-gray-700 pt-4 pb-4 text-center">
            <p className="text-white">&copy; {new Date().getFullYear()} USMLE Bros. All rights reserved.</p>
        </footer>
    );
}
export default Footer;