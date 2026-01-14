
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  avatar: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emily Johnson",
    position: "Regular Customer",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
    text: "I've been using PureNW's Enchanted Garden for six months now and I constantly receive compliments. The fragrance lasts all day and the bottle design is beautiful too!"
  },
  {
    id: 2,
    name: "Michael Davis",
    position: "Fragrance Enthusiast",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Ocean Breeze has become my signature scent. It's subtle yet distinctive, perfect for daily wear. The quality is exceptional compared to other brands I've tried."
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    position: "Fashion Blogger",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 4,
    text: "As someone who reviews fragrances professionally, I'm impressed by PureNW's attention to detail and the complexity of their scent profiles. Golden Amber is a standout!"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purenw-purple font-playfair mb-4">
            Customer Experiences
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover what our customers have to say about their PureNW fragrances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-purenw-light rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <div className="flex space-x-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i}
                    size={18} 
                    className={i < testimonial.rating ? "text-purenw-gold fill-purenw-gold" : "text-gray-300"} 
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium text-purenw-dark">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
