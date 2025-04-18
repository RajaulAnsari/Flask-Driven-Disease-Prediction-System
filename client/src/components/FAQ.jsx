import React from "react";
import { MDBAccordion, MDBAccordionItem, MDBContainer } from "mdb-react-ui-kit";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function FAQ() {
  return (
    <>
      <Navbar />
      <MDBContainer className="mt-5" style={{ maxWidth: "900px" }}>
        <h2 className="text-center mb-5">Frequently Asked Questions</h2>
        <MDBAccordion flush className="mb-5">
          <MDBAccordionItem
            collapseId={1}
            headerTitle="What is this website about?"
          >
            <p>
              This website provides an overview of our services and features. It
              is designed to help users easily find the information they need
              and access our services at no cost.
            </p>
          </MDBAccordionItem>
          <MDBAccordionItem
            collapseId={2}
            headerTitle="How can I create an account?"
          >
            <p>
              You can create an account by clicking on the 'Register' button in
              the navbar. Once you fill in the required details, you'll be able
              to start using our services.
            </p>
          </MDBAccordionItem>
          <MDBAccordionItem
            collapseId={3}
            headerTitle="Are there any payment fees?"
          >
            <p>
              No, our services are completely free of charge. You can enjoy all
              the features without worrying about any hidden fees.
            </p>
          </MDBAccordionItem>
          <MDBAccordionItem
            collapseId={4}
            headerTitle="How do I contact support?"
          >
            <p>
              You can contact us through the following methods:
              <ul>
                <li>Email</li>
                <li>Phone</li>
                <li>Live Chat</li>
              </ul>
              Available in the footer of the website.
            </p>
          </MDBAccordionItem>
          <MDBAccordionItem collapseId={5} headerTitle="Is my data secure?">
            <p>
              Yes, we take data security very seriously. Our website uses
              encryption methods to ensure that your personal data is safe and
              secure at all times.
            </p>
          </MDBAccordionItem>
          <MDBAccordionItem
            collapseId={6}
            headerTitle="How accurate are the disease predictions?"
          >
            <p>
              The disease predictions are based on advanced AI algorithms and
              historical medical data. While the predictions are highly
              accurate, they should be considered as informational and not a
              substitute for professional medical advice.
            </p>
          </MDBAccordionItem>
          <MDBAccordionItem
            collapseId={7}
            headerTitle="How does the AI disease prediction work?"
          >
            <p>
              Our AI system analyzes the symptoms you enter and compares them
              with known disease patterns. It then provides possible disease
              predictions and recommendations. The AI is trained on a large
              dataset of medical records and research to ensure accurate
              results.
            </p>
          </MDBAccordionItem>
          <MDBAccordionItem
            collapseId={8}
            headerTitle="Can the AI predict all diseases?"
          >
            <p>
              While our AI system is trained on a wide range of diseases, it may
              not cover every possible condition. The accuracy of the
              predictions depends on the symptoms provided, and we recommend
              consulting a healthcare professional for a complete diagnosis.
            </p>
          </MDBAccordionItem>
          <MDBAccordionItem
            collapseId={9}
            headerTitle="Is the AI disease prediction tool free?"
          >
            <p>
              Yes, the AI-powered disease prediction tool is completely free to
              use. There are no charges associated with using the tool or
              accessing the predictions.
            </p>
          </MDBAccordionItem>
          <MDBAccordionItem
            collapseId={10}
            headerTitle="Can I get medical advice based on the predictions?"
          >
            <p>
              No, the AI predictions are for informational purposes only. They
              should not be used as a substitute for medical advice. Always
              consult a healthcare professional for a proper diagnosis and
              treatment plan.
            </p>
          </MDBAccordionItem>
          <MDBAccordionItem
            collapseId={11}
            headerTitle="How can I improve the prediction accuracy?"
          >
            <p>
              To get the most accurate predictions, make sure to provide as many
              symptoms as possible and ensure they are described clearly. The
              more detailed your input, the better the prediction results will
              be.
            </p>
          </MDBAccordionItem>
        </MDBAccordion>
      </MDBContainer>
      <Footer />
    </>
  );
}
