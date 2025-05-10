import Navbar from "./Navbar";
import Footer from "./Footer";

const HowItWorks = () => {
  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">How It Works</h1>

        <p className="text-gray-700 mb-4">
          Our platform is designed to provide instant medical insights in a few
          simple steps. With user-friendly navigation and AI-powered
          predictions, we help you understand your symptoms and explore reliable
          healthcare information with ease.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mb-2">
          Step 1: Register or Log In
        </h2>
        <p className="text-gray-700 mb-4">
          Start by registering for an account or logging in if you're already a
          user. This ensures your data is securely stored and allows access to
          advanced features like prediction history and personalized insights.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mb-2">
          Step 2: Enter Your Symptoms
        </h2>
        <p className="text-gray-700 mb-4">
          Navigate to the “Symptoms Checker” section. Simply type in the
          symptoms you're experiencing—our system supports multiple symptoms to
          provide more accurate predictions.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mb-2">
          Step 3: AI-Powered Prediction
        </h2>
        <p className="text-gray-700 mb-4">
          Once symptoms are entered, click the “Predict” button. Our intelligent
          system analyzes your input and returns a likely condition along with:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Suggested Diseases or Conditions</li>
          <li>Recommended Medications</li>
          <li>Precautionary Measures</li>
          <li>Related Specialists or Doctors</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-600 mb-2">
          Step 4: Review and Save History
        </h2>
        <p className="text-gray-700 mb-4">
          After viewing the results, they are automatically stored in the “My
          History” section. You can revisit previous predictions and track your
          symptom trends over time.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mb-2">
          Step 5: Explore More Features
        </h2>
        <p className="text-gray-700 mb-4">
          You can also visit the Blog section for informative health-related
          articles and the FAQ section to get answers to common questions about
          your experience.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mb-2">
          Data Security & Privacy
        </h2>
        <p className="text-gray-700 mb-4">
          All user information is encrypted and stored securely. We do not share
          or sell your data. You can manage or delete your data anytime from
          your profile settings.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mb-2">
          Get Started
        </h2>
        <p className="text-gray-700">
          It's fast, free, and private. Sign up now to begin your journey
          towards better health awareness and smarter self-care.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default HowItWorks;
