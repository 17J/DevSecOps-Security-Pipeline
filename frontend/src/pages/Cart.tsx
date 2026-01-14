import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Cart = () => {
  const { cartItems, cartCount, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [updating, setUpdating] = useState(false);

  const handleIncrement = (id: number) => {
    setUpdating(true);
    updateQuantity(id, cartItems.find(item => item.id === id)!.quantity + 1);
    setUpdating(false);
  };

  const handleDecrement = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      setUpdating(true);
      updateQuantity(id, item.quantity - 1);
      setUpdating(false);
    }
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (cartCount === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-6 bg-purenw-purple hover:bg-purenw-purple/90">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-purenw-purple font-playfair mb-8">Shopping Cart</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="px-4 py-6 sm:px-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={`/product/${item.id}`}>{item.name}</Link>
                              </h3>
                              <p className="ml-4">${item.price.toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                          </div>
                          <div className="mt-2 flex items-center">
                            <div className="flex items-center mr-4">
                              <Button
                                onClick={() => handleDecrement(item.id)}
                                disabled={updating}
                                variant="outline"
                                size="icon"
                                className="hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="mx-2 text-gray-700">{item.quantity}</span>
                              <Button
                                onClick={() => handleIncrement(item.id)}
                                disabled={updating}
                                variant="outline"
                                size="icon"
                                className="hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="ml-auto">
                              <Button
                                onClick={() => handleRemove(item.id)}
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:bg-red-50"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Order Summary</h2>
                <div className="flex justify-between py-2 text-gray-600">
                  <span>Subtotal</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="flex justify-between py-2 text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between py-2 font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="mt-6">
                  <Button asChild className="w-full bg-purenw-purple hover:bg-purenw-purple/90">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button
                    onClick={handleClearCart}
                    variant="ghost"
                    className="w-full mt-2 text-gray-500 hover:bg-gray-100"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
