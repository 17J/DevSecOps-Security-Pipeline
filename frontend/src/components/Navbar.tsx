import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount, showNotification } = useCart();

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-purenw-purple font-playfair">PURENW</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-purenw-dark hover:text-purenw-purple transition-colors font-medium">
              Home
            </Link>
            <Link to="/shop" className="text-purenw-dark hover:text-purenw-purple transition-colors font-medium">
              Shop
            </Link>
            <Link to="/about" className="text-purenw-dark hover:text-purenw-purple transition-colors font-medium">
              About Us
            </Link>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search size={20} />
            </Button>
            
            {isAuthenticated ? (
              <>
                <div className="flex items-center">
                  <span className="mr-2 text-sm font-medium">
                    Hi, {user?.name?.split(' ')[0]}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full text-purenw-purple"
                    onClick={logout}
                  >
                    <LogOut size={20} />
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User size={20} />
                </Button>
              </Link>
            )}
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <ShoppingCart size={20} />
                <span 
                  className={`absolute -top-1 -right-1 bg-purenw-purple text-white text-xs w-5 h-5 flex items-center justify-center rounded-full ${
                    showNotification ? 'animate-bounce' : ''
                  }`}
                >
                  {cartCount}
                </span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <ShoppingCart size={20} />
                <span 
                  className={`absolute -top-1 -right-1 bg-purenw-purple text-white text-xs w-5 h-5 flex items-center justify-center rounded-full ${
                    showNotification ? 'animate-bounce' : ''
                  }`}
                >
                  {cartCount}
                </span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-purenw-dark hover:text-purenw-purple transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/shop" className="text-purenw-dark hover:text-purenw-purple transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Shop
              </Link>
              <Link to="/about" className="text-purenw-dark hover:text-purenw-purple transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              <div className="flex items-center space-x-4 pt-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Search size={20} />
                </Button>
                
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm font-medium">
                        Hi, {user?.name?.split(' ')[0]}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full text-purenw-purple"
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                      >
                        <LogOut size={20} />
                      </Button>
                    </div>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User size={20} />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
