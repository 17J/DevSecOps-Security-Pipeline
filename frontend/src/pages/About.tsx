
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-purenw-purple/10 py-16 md:py-24">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-purenw-purple font-playfair mb-6">
              Our Story
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover the passion and inspiration behind PureNW Fragrance Boutique
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-purenw-purple font-playfair mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-700 mb-4">
                  At PureNW, we believe that fragrance is more than just a scent—it's a personal statement, a memory in the making, and an extension of your identity. Our mission is to provide exceptional fragrances that inspire confidence and create lasting impressions.
                </p>
                <p className="text-gray-700">
                  Founded in 2015 in the Pacific Northwest, our boutique was born from a passion for artisanal perfumery and a desire to bring unique, high-quality fragrances to discerning customers who appreciate the art of scent.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1616696038562-574c18066055?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Perfume bottles on display"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-purenw-light rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-purenw-light">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-purenw-purple font-playfair mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-purenw-purple/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purenw-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Quality</h3>
                <p className="text-gray-600">
                  We source only the finest ingredients from around the world, ensuring that each fragrance meets our rigorous standards for excellence. Our commitment to quality is unwavering.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-purenw-purple/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purenw-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
                <p className="text-gray-600">
                  We are committed to sustainable practices, from our eco-friendly packaging to our responsible sourcing methods. We believe in creating beautiful scents without compromising our planet.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-purenw-purple/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purenw-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We constantly push the boundaries of traditional perfumery, blending classic techniques with modern innovations to create unique, captivating scents that stand out in a crowded market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-purenw-purple font-playfair mb-12 text-center">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-4 relative">
                  <img 
                    src="https://randomuser.me/api/portraits/women/86.jpg" 
                    alt="Emma Richardson" 
                    className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white shadow-md"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Emma Richardson</h3>
                <p className="text-purenw-purple mb-3">Founder & Master Perfumer</p>
                <p className="text-gray-600 text-sm max-w-xs mx-auto">
                  With over 15 years of experience in the fragrance industry, Emma brings her expertise and passion to every PureNW creation.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/43.jpg" 
                    alt="David Chen" 
                    className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white shadow-md"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">David Chen</h3>
                <p className="text-purenw-purple mb-3">Creative Director</p>
                <p className="text-gray-600 text-sm max-w-xs mx-auto">
                  David oversees the creative direction of PureNW, ensuring that our visual identity matches the elegance of our fragrances.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <img 
                    src="https://randomuser.me/api/portraits/women/33.jpg" 
                    alt="Sophie Martinez" 
                    className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white shadow-md"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Sophie Martinez</h3>
                <p className="text-purenw-purple mb-3">Head of Product Development</p>
                <p className="text-gray-600 text-sm max-w-xs mx-auto">
                  Sophie leads our product development team, combining innovation with traditional perfumery techniques.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="py-16 bg-purenw-light">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold text-purenw-purple font-playfair mb-6">
                  Our Journey
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2015: The Beginning</h3>
                    <p className="text-gray-700">
                      PureNW was founded with a small collection of handcrafted fragrances in a boutique store in Seattle.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2017: Expanding Horizons</h3>
                    <p className="text-gray-700">
                      After gaining recognition for our unique scents, we expanded our collection and opened our second location in Portland.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2019: Going Digital</h3>
                    <p className="text-gray-700">
                      We launched our online store, making our fragrances accessible to customers nationwide.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2022: Innovation & Growth</h3>
                    <p className="text-gray-700">
                      Introduced new sustainable packaging and expanded our product line to include home fragrances and body care.
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 relative">
                <img
                  src="https://images.unsplash.com/photo-1604771475726-c85a08851c33?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Perfume workshop"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-white rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default About;
