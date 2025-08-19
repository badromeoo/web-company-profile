export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10">Our Services</h1>
      
      <div className="space-y-12">

        {/* Service Item 1 */}
        <div className="bg-gray-800 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-blue-400">Custom Web Development</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            We build bespoke websites from the ground up, tailored to your unique business needs. From stunning landing pages to complex e-commerce platforms, our solutions are fast, secure, and fully responsive, ensuring a perfect experience on any device.
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Front-end Development (React, Next.js)</li>
            <li>Back-end Development (Node.js, APIs)</li>
            <li>E-commerce and Payment Gateway Integration</li>
            <li>Content Management Systems (CMS)</li>
          </ul>
        </div>

        {/* Service Item 2 */}
        <div className="bg-gray-800 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-blue-400">Mobile Application Development</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Reach your customers on the go with our native and cross-platform mobile apps. We handle the entire lifecycle from idea to deployment on the Apple App Store and Google Play Store, focusing on intuitive UI/UX and robust performance.
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>iOS Development (Swift)</li>
            <li>Android Development (Kotlin)</li>
            <li>Cross-Platform (React Native)</li>
            <li>App Store Deployment and Maintenance</li>
          </ul>
        </div>

        {/* Service Item 3 */}
        <div className="bg-gray-800 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-blue-400">UI/UX and Product Design</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Good design is good business. Our design process focuses on understanding your users to create interfaces that are not only beautiful but also functional and easy to use. We create wireframes, prototypes, and complete design systems that elevate your brand.
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>User Research and Analysis</li>
            <li>Wireframing and Prototyping</li>
            <li>High-Fidelity UI Design</li>
            <li>Design System Creation</li>
          </ul>
        </div>

      </div>
    </div>
  );
}