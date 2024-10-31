const Footer = () => {
    return (
        <footer className="bg-indigo-950">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Us */}
                    <div>

                    </div>

                    {/* Services */}
                    <div>

                    </div>

                    {/* Contact Us */}
                    <div>
                        
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-4 pb-4 text-center">
                <p className="text-gray-400">&copy; {new Date().getFullYear()} USMLE Bros. All rights reserved.</p>

            </div>
        </footer>
    );
}
export default Footer;