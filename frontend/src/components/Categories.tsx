
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

const categories: Category[] = [
  {
    id: "women",
    name: "Women",
    image: "https://images.unsplash.com/photo-1608528577891-eb055944d2cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    count: 24
  },
  {
    id: "men",
    name: "Men",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    count: 18
  },
  {
    id: "unisex",
    name: "Unisex",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    count: 12
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-purenw-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purenw-purple font-playfair mb-4">
            Browse By Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect fragrance for any occasion or preference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              to={`/shop?category=${category.id}`} 
              key={category.id}
              className="group"
            >
              <div className="relative h-80 rounded-lg overflow-hidden shadow-md">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-playfair font-bold mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count} Fragrances</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
