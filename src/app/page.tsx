export default function Home() {
  return (
    // Gunakan Fragment <>...</> untuk membungkus beberapa section
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Building the Future, One Line of Code at a Time.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            We are a team of passionate developers creating innovative solutions
            to solve complex problems. Welcome to our digital home.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
            Explore Our Services
          </button>
        </div>
      </section>

      {/* Services Highlight Section */}
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Our Core Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-gray-900 p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">Web Development</h3>
              <p className="text-gray-400">
                High-performance, responsive websites built with modern
                technology.
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-gray-900 p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">Mobile Apps</h3>
              <p className="text-gray-400">
                Cross-platform mobile applications for both Android and iOS.
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-gray-900 p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">UI/UX Design</h3>
              <p className="text-gray-400">
                Intuitive and beautiful user interfaces that users love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Card 1 */}
            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-300 italic mb-4">
                &quot;Working with this team was a game-changer for our business.
                Their expertise and dedication are unmatched.&quot;
              </p>
              <p className="font-bold text-white">- Jane Doe</p>
              <p className="text-sm text-gray-400">CEO, Tech Innovators</p>
            </div>

            {/* Testimonial Card 2 */}
            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-300 italic mb-4">
                &quot;The final product exceeded all our expectations. Highly
                professional and delivered on time.&quot;
              </p>
              <p className="font-bold text-white">- John Smith</p>
              <p className="text-sm text-gray-400">
                Marketing Head, Solutions Inc.
              </p>
            </div>

            {/* Testimonial Card 3 */}
            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-300 italic mb-4">
                &quot;An absolute pleasure to work with. They understood our vision
                perfectly and brought it to life.&quot;
              </p>
              <p className="font-bold text-white">- Emily White</p>
              <p className="text-sm text-gray-400">Founder, Creative Minds</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}