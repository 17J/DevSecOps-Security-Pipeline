
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Enchanted Garden",
    brand: "PureNW",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1557170334-a9086d21c4b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Women"
  },
  {
    id: 2,
    name: "Midnight Whisper",
    brand: "PureNW",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Unisex"
  },
  {
    id: 3,
    name: "Ocean Breeze",
    brand: "PureNW",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Men"
  },
  {
    id: 4,
    name: "Golden Amber",
    brand: "PureNW",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1608528577891-eb055944d2cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Women"
  }
];

const FeaturedProducts = () => {
  const { addToCart } = useCart();

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purenw-purple font-playfair mb-4">
            Featured Fragrances
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most loved scents, crafted with the finest ingredients to create unforgettable impressions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm hover:bg-white">
                    <Heart size={18} className="text-gray-600 hover:text-rose-500 transition-colors" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <p className="text-sm font-medium">{product.category}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-purenw-purple">${product.price}</p>
                  <Button 
                    size="sm" 
                    className="flex items-center gap-1 bg-purenw-purple hover:bg-purenw-purple/90"
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      brand: product.brand,
                      price: product.price,
                      image: product.image
                    })}
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild className="bg-purenw-purple hover:bg-purenw-purple/90 text-white px-6 py-2 rounded-md">
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
