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
                <p className="text-gray-400">Developed by <a 
                        target="_blank"
                        href="https://robustechbd.com" 
                        className="font-semibold hover:text-gray-200"
                    >RobusTech Bangladesh</a>
                </p>
            </div>
        </footer>
    );
}
export default Footer;