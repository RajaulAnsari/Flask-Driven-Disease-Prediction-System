import Navbar from "./Navbar";
import Footer from "./Footer";

const Mission = () => {
  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">Our Mission</h1>
        <p className="text-gray-700 mb-4">
          Our mission is to revolutionize digital health by making expert
          medical insights easily accessible to everyone. We aim to support
          preventive care through intelligent symptom analysis and bridge the
          gap between users and reliable healthcare information.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mb-2">
          Empowering Individuals
        </h2>
        <p className="text-gray-700 mb-4">
          We believe that everyone should have the power to understand their
          health. By providing AI-driven tools and personalized medical
          insights, we enable individuals to take control of their well-being
          and make informed decisions before visiting a healthcare professional.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mb-2">
          Promoting Preventive Healthcare
        </h2>
        <p className="text-gray-700 mb-4">
          Our platform is designed to detect potential health issues early by
          analyzing user-reported symptoms. We aim to promote preventive care
          over reactive treatment, helping reduce long-term healthcare costs and
          improving overall quality of life.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mb-2">
          Our Core Values
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            <strong>Accessibility:</strong> Making healthcare information
            available to all, regardless of geography or income.
          </li>
          <li>
            <strong>Trust:</strong> Ensuring accurate, verified, and
            privacy-respecting data handling.
          </li>
          <li>
            <strong>Innovation:</strong> Continuously improving our AI
            algorithms and user experience.
          </li>
          <li>
            <strong>Collaboration:</strong> Working with medical experts to
            ensure relevance and accuracy.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-purple-600 mb-2">
          Looking Ahead
        </h2>
        <p className="text-gray-700 mb-4">
          Our vision for the future includes expanding into multilingual
          support, integrating telemedicine services, and enhancing our medical
          database with global insights. We are committed to transforming how
          people interact with healthcare, making it smarter, faster, and more
          proactive.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Mission;
