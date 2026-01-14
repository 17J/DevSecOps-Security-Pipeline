import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Filter, ChevronDown, ShoppingCart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  gender: string;
  type: string;
  occasion: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Enchanted Garden",
    brand: "PureNW",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1557170334-a9086d21c4b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Floral",
    gender: "Women",
    type: "Eau de Parfum",
    occasion: "Daily Use"
  },
  {
    id: 2,
    name: "Midnight Whisper",
    brand: "PureNW",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Oriental",
    gender: "Unisex",
    type: "Eau de Parfum",
    occasion: "Night Out"
  },
  {
    id: 3,
    name: "Ocean Breeze",
    brand: "PureNW",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Fresh",
    gender: "Men",
    type: "Eau de Toilette",
    occasion: "Daily Use"
  },
  {
    id: 4,
    name: "Golden Amber",
    brand: "PureNW",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1608528577891-eb055944d2cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Woody",
    gender: "Women",
    type: "Eau de Parfum",
    occasion: "Special Occasion"
  },
  {
    id: 5,
    name: "Velvet Rose",
    brand: "PureNW",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1608528577785-4aa2d2a2bfb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Floral",
    gender: "Women",
    type: "Eau de Parfum",
    occasion: "Wedding"
  },
  {
    id: 6,
    name: "Cedar Woods",
    brand: "PureNW",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Woody",
    gender: "Men",
    type: "Eau de Toilette",
    occasion: "Business"
  },
  {
    id: 7,
    name: "Lavender Dreams",
    brand: "PureNW",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1615529162400-f40938748b73?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Aromatic",
    gender: "Unisex",
    type: "Body Mist",
    occasion: "Daily Use"
  },
  {
    id: 8,
    name: "Dark Obsession",
    brand: "PureNW",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1563170423-640e1420452a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Oriental",
    gender: "Men",
    type: "Eau de Parfum",
    occasion: "Date"
  }
];

const Shop = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("featured");
  const { addToCart } = useCart();

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesGender = selectedGender.length === 0 || selectedGender.includes(product.gender);
    const matchesType = selectedType.length === 0 || selectedType.includes(product.type);
    const matchesOccasion = selectedOccasion.length === 0 || selectedOccasion.includes(product.occasion);
    
    return matchesPrice && matchesGender && matchesType && matchesOccasion;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low") {
      return a.price - b.price;
    } else if (sortOption === "price-high") {
      return b.price - a.price;
    }
    // Default: "featured" - no change
    return 0;
  });

  // Toggle gender filter
  const toggleGender = (gender: string) => {
    setSelectedGender((prev) => 
      prev.includes(gender) 
        ? prev.filter(g => g !== gender) 
        : [...prev, gender]
    );
  };

  // Toggle type filter
  const toggleType = (type: string) => {
    setSelectedType((prev) => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  // Toggle occasion filter
  const toggleOccasion = (occasion: string) => {
    setSelectedOccasion((prev) => 
      prev.includes(occasion) 
        ? prev.filter(o => o !== occasion) 
        : [...prev, occasion]
    );
  };

  // Update price range
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Shop Header */}
        <div className="bg-purenw-light py-8">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold text-purenw-purple font-playfair">
              Shop All Fragrances
            </h1>
            <p className="text-gray-600 mt-2">
              Discover your perfect scent from our exclusive collection
            </p>
          </div>
        </div>

        {/* Filter and Sort Bar */}
        <div className="border-b border-gray-200 bg-white sticky top-16 z-10">
          <div className="container-custom py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="md:hidden flex items-center gap-2"
                  >
                    <Filter size={16} />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                  <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                    <SheetDescription>
                      Refine your fragrance search
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    {/* Price Range */}
                    <div>
                      <h3 className="font-medium mb-4">Price Range</h3>
                      <Slider
                        defaultValue={[0, 150]}
                        max={150}
                        step={5}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <h3 className="font-medium mb-4">Gender</h3>
                      <div className="space-y-2">
                        {["Women", "Men", "Unisex"].map((gender) => (
                          <div key={gender} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`gender-${gender}`} 
                              checked={selectedGender.includes(gender)}
                              onCheckedChange={() => toggleGender(gender)}
                            />
                            <Label htmlFor={`gender-${gender}`}>{gender}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Type */}
                    <div>
                      <h3 className="font-medium mb-4">Type</h3>
                      <div className="space-y-2">
                        {["Eau de Parfum", "Eau de Toilette", "Body Mist"].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`type-${type}`} 
                              checked={selectedType.includes(type)}
                              onCheckedChange={() => toggleType(type)}
                            />
                            <Label htmlFor={`type-${type}`}>{type}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Occasion */}
                    <div>
                      <h3 className="font-medium mb-4">Occasion</h3>
                      <div className="space-y-2">
                        {["Daily Use", "Special Occasion", "Wedding", "Business", "Date", "Night Out"].map((occasion) => (
                          <div key={occasion} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`occasion-${occasion}`} 
                              checked={selectedOccasion.includes(occasion)}
                              onCheckedChange={() => toggleOccasion(occasion)}
                            />
                            <Label htmlFor={`occasion-${occasion}`}>{occasion}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-6">
                {/* Gender Filter */}
                <div className="relative inline-block">
                  <Select
                    onValueChange={(value) => toggleGender(value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Women">Women</SelectItem>
                      <SelectItem value="Men">Men</SelectItem>
                      <SelectItem value="Unisex">Unisex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Type Filter */}
                <div className="relative inline-block">
                  <Select
                    onValueChange={(value) => toggleType(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Eau de Parfum">Eau de Parfum</SelectItem>
                      <SelectItem value="Eau de Toilette">Eau de Toilette</SelectItem>
                      <SelectItem value="Body Mist">Body Mist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Occasion Filter */}
                <div className="relative inline-block">
                  <Select
                    onValueChange={(value) => toggleOccasion(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily Use">Daily Use</SelectItem>
                      <SelectItem value="Special Occasion">Special Occasion</SelectItem>
                      <SelectItem value="Wedding">Wedding</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Date">Date</SelectItem>
                      <SelectItem value="Night Out">Night Out</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="relative inline-block">
                  <Select
                    onValueChange={(value) => {
                      if (value === "under-50") {
                        setPriceRange([0, 50]);
                      } else if (value === "50-100") {
                        setPriceRange([50, 100]);
                      } else if (value === "over-100") {
                        setPriceRange([100, 150]);
                      } else {
                        setPriceRange([0, 150]);
                      }
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-50">Under $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="over-100">Over $100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Sort Options */}
              <div className="relative inline-block">
                <Select
                  defaultValue="featured"
                  onValueChange={setSortOption}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
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
                      <p className="text-sm font-medium">{product.gender}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm text-gray-500">{product.brand}</p>
                      <p className="text-xs text-gray-500">{product.type}</p>
                    </div>
                    <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-purenw-purple">${product.price.toFixed(2)}</p>
                      <Button 
                        size="sm"
                        className="bg-purenw-purple hover:bg-purenw-purple/90 text-white"
                        onClick={() => addToCart({
                          id: product.id,
                          name: product.name,
                          brand: product.brand,
                          price: product.price,
                          image: product.image
                        })}
                      >
                        <ShoppingCart size={16} className="mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Empty State */}
              {sortedProducts.length === 0 && (
                <div className="col-span-1 sm:col-span-2 lg:col-span-4 py-16 text-center">
                  <p className="text-gray-500 mb-4">No products match your selected filters.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setPriceRange([0, 150]);
                      setSelectedGender([]);
                      setSelectedType([]);
                      setSelectedOccasion([]);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
