import Navbar from "./Navbar";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-4">
          We respect your privacy and are committed to protecting your personal
          data. This Privacy Policy outlines how we collect, use, and safeguard
          your information when you use our platform. Your trust is important to
          us, and we aim to handle your data responsibly and transparently.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">
          Information We Collect
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            Personal details such as name, email address, and contact
            information.
          </li>
          <li>Login credentials and user account preferences.</li>
          <li>Health-related data including symptoms you enter.</li>
          <li>
            Usage data such as pages visited, features used, and time spent on
            the platform.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">
          How We Use Your Data
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>To provide and improve our medical insights and services.</li>
          <li>To personalize your experience based on your inputs.</li>
          <li>To analyze trends and enhance system functionality.</li>
          <li>
            To send you updates, notifications, or health-related
            recommendations (if opted-in).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">
          Data Protection
        </h2>
        <p className="text-gray-700 mb-4">
          We implement robust technical and organizational measures to secure
          your data against unauthorized access, alteration, or disclosure. All
          data transmissions are encrypted, and sensitive information is stored
          securely in compliance with data protection laws.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">
          Your Rights
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Right to access your data.</li>
          <li>Right to correct or update inaccurate information.</li>
          <li>Right to request data deletion at any time.</li>
          <li>Right to withdraw consent for data usage (where applicable).</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">
          Changes to This Policy
        </h2>
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy periodically. Any changes will be
          communicated via the website or email notifications. Continued use of
          the platform after updates implies acceptance of the revised policy.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">
          Contact Us
        </h2>
        <p className="text-gray-700">
          If you have any questions or concerns about this Privacy Policy or
          your data, please contact us at{" "}
          <a
            href="mailto:aidiseasepredictor@gmail.com"
            className="text-blue-500 underline"
          >
            aidiseasepredictor@gmail.com
          </a>
          .
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
