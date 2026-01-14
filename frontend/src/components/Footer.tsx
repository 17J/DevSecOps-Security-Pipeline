
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold text-purenw-purple font-playfair">PURENW</h3>
            </Link>
            <p className="text-gray-600 mb-4 text-sm">
              Crafting exceptional fragrances that capture moments and memories, elevating your everyday experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-purenw-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purenw-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purenw-purple transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-purenw-dark mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/shop" className="hover:text-purenw-purple transition-colors">Shop All</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purenw-purple transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-purenw-purple transition-colors">Fragrance Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purenw-purple transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-purenw-dark mb-4">Customer Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/shipping" className="hover:text-purenw-purple transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-purenw-purple transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-purenw-purple transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-purenw-purple transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-purenw-dark mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-purenw-purple mt-1" />
                <span>123 Fragrance Blvd, Seattle, WA 98101</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-purenw-purple" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-purenw-purple" />
                <span>info@purenw.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} PureNW Fragrance Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
