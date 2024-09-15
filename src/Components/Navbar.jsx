import ToggleTheme from "./ToggleTheme";
import { Github } from 'lucide-react';
const Navbar = () => {
  return (
    <nav className="bg-gray-100 dark:bg-gray-800 shadow-md fixed top-0 z-50 w-full">
      <div className="mx-auto flex items-center justify-between pr-3 backdrop-blur-lg">
        <div className="text-gray-800 dark:text-white cursor-pointer">
          <a href="/">
            <img
              src="/Logo.svg"
              alt="Logo"
              style={{ width: '300px', height: "auto" }}
            />
          </a>
        </div>

        <div className="flex items-center md:px-9 px-3 space-x-4">
          <a
            href="https://github.com/Praveenskg/Emi-Calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-white"
          >
            <Github className="" />
          </a>
          <ToggleTheme />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
