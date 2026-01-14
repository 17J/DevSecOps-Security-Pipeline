
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically send this to your backend
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive our latest updates and exclusive offers.",
    });
    
    setEmail("");
  };

  return (
    <section className="py-16 bg-purenw-purple text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Join Our Fragrance Community
          </h2>
          <p className="mb-8 text-white/80">
            Subscribe to our newsletter and be the first to know about new releases, 
            exclusive offers, and fragrance inspiration.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-white/10 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white"
            />
            <Button 
              type="submit" 
              className="bg-white text-purenw-purple hover:bg-white/90"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="mt-4 text-sm text-white/60">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
