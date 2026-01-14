
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-purenw-purple/10 to-purenw-purple/5 py-16 md:py-24">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purenw-purple mb-4 font-playfair leading-tight">
            Discover Your Signature Scent
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-md">
            Explore our collection of premium fragrances designed to capture every mood, moment, and memory.
          </p>
          <div className="flex space-x-4">
            <Button asChild className="bg-purenw-purple hover:bg-purenw-purple/90 text-white px-6 py-2 rounded-md">
              <Link to="/shop">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" className="border-purenw-purple text-purenw-purple hover:bg-purenw-purple/10">
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative h-80 md:h-96 lg:h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1596742578443-7682ef5251cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Luxury perfume bottles"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
