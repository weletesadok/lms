import Head from "next/head";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Landing Page</title>
        <meta name="description" content="A stunning landing page" />
      </Head>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="text-center space-y-6 px-6 md:px-12">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Welcome to Our Amazing Product
            </h1>
            <p className="text-lg md:text-xl">
              Discover how we can help you achieve more with less effort. Our
              platform makes it easy to manage and scale your business.
            </p>
            <a
              href="#features"
              className="px-8 py-3 mt-4 text-lg font-semibold bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500 transition duration-300"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto text-center space-y-12 px-6 md:px-12">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600">
              Our platform comes with a wide range of features to help you grow
              your business and reach your goals faster.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
              {/* Feature 1 */}
              <div className="space-y-6">
                <div className="text-4xl text-blue-500">🚀</div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Effortless Integration
                </h3>
                <p className="text-lg text-gray-600">
                  Seamlessly integrate with your existing systems without a
                  hitch.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="space-y-6">
                <div className="text-4xl text-blue-500">🔒</div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Top-Notch Security
                </h3>
                <p className="text-lg text-gray-600">
                  We prioritize your privacy with secure and encrypted data
                  handling.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="space-y-6">
                <div className="text-4xl text-blue-500">📈</div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Analytics & Insights
                </h3>
                <p className="text-lg text-gray-600">
                  Get actionable insights and track performance to make
                  data-driven decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <p>&copy; 2025 Your Company. All Rights Reserved.</p>
            <div className="mt-4">
              <a href="#" className="text-white hover:text-gray-400 mx-4">
                Privacy Policy
              </a>
              <a href="#" className="text-white hover:text-gray-400 mx-4">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
