
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary-dark border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-accent-yellow p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-dark" />
            </div>
            <div className="text-white">
              <h1 className="text-lg font-bold">SUVIDHA FOUNDATION</h1>
              <p className="text-xs text-gray-300">TPO Management Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white hover:text-accent-yellow transition-colors">
              Features
            </a>
            <a href="#about" className="text-white hover:text-accent-yellow transition-colors">
              About
            </a>
            <a href="#contact" className="text-white hover:text-accent-yellow transition-colors">
              Contact
            </a>
            <Button className="bg-accent-yellow text-primary-dark hover:bg-yellow-400 font-semibold">
              Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-accent-yellow"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary-dark border-t border-gray-600">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="block px-3 py-2 text-white hover:text-accent-yellow transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-white hover:text-accent-yellow transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-white hover:text-accent-yellow transition-colors"
              >
                Contact
              </a>
              <div className="px-3 py-2">
                <Button className="w-full bg-accent-yellow text-primary-dark hover:bg-yellow-400 font-semibold">
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
