export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10">About Us</h1>

      {/* Company History Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Our History</h2>
        <p className="text-gray-300 leading-relaxed">
          Founded in 2020, MyCompany started with a small team of passionate
          developers who wanted to make a difference through technology. We saw a
          gap in the market for high-quality, user-centric digital solutions and
          decided to fill it. Over the years, we have grown into a thriving
          agency, helping businesses of all sizes achieve their digital goals.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed">
          Our mission is to empower businesses by crafting exceptional digital
          experiences. We believe in the power of code to solve problems,
          connect people, and create opportunities. We are committed to
          innovation, quality, and building long-lasting partnerships with our
          clients.
        </p>
      </section>

      {/* Culture Section */}
      <section>
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Our Culture</h2>
        <p className="text-gray-300 leading-relaxed">
          We foster a culture of collaboration, curiosity, and continuous
          learning. Our team is our greatest asset, and we provide an
          environment where everyone can grow, share ideas, and contribute to
          meaningful projects. We work hard, but we also believe in maintaining a
          healthy work-life balance.
        </p>
      </section>
    </div>
  );
}