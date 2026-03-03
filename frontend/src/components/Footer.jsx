const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© BikeLo 2026. All rights reserved.</p>

        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-green-400">
            Contact Us
          </a>
          <a href="#" className="hover:text-green-400">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
