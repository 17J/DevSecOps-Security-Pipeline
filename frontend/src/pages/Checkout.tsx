
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CreditCard, Landmark, Smartphone } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      toast.success("Payment successful!");
      // Clear cart and navigate to success page
      clearCart();
      navigate("/payment-success");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container-custom py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-purenw-purple font-playfair mb-6">
              Checkout
            </h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2">
                  <span>Total</span>
                  <span className="text-purenw-purple">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter your address" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter your city" />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" placeholder="Enter postal code" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <form onSubmit={handleSubmit}>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="mb-6"
                >
                  <div className="flex items-center space-x-2 mb-2 p-3 rounded-md border border-gray-200 hover:border-purenw-purple cursor-pointer">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center">
                      <CreditCard className="mr-2" size={20} />
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2 p-3 rounded-md border border-gray-200 hover:border-purenw-purple cursor-pointer">
                    <RadioGroupItem value="debit-card" id="debit-card" />
                    <Label htmlFor="debit-card" className="flex items-center">
                      <Landmark className="mr-2" size={20} />
                      Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:border-purenw-purple cursor-pointer">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center">
                      <Smartphone className="mr-2" size={20} />
                      UPI
                    </Label>
                  </div>
                </RadioGroup>

                <div className="space-y-4 mt-6">
                  {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
                    <>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="Enter name on card"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            type="password"
                            maxLength={4}
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === "upi" && (
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        name="upiId"
                        placeholder="username@bank"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purenw-purple hover:bg-purenw-purple/90"
                >
                  {loading ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
