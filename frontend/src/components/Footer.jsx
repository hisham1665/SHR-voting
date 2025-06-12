import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 ">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div>
          <h2 className="text-lg font-semibold">Sahrdaya College of Engineering & Technology</h2>
          <p className="text-sm text-gray-400">
            Kodakara, Thrissur, Kerala - 680684
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Designed & Developed by <span className="text-blue-400 font-medium">Hisham K H</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
