import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chat from "./Chat";

import diseasesImg from "../assets/diseases.png";
import immunityImg from "../assets/immunity.png";
import aiHealthcareImg from "../assets/ai-healthcare.png";
import mentalHealthImg from "../assets/mental-health.png";
import heartHealthImg from "../assets/heart-health.png";
import yogaMeditationImg from "../assets/yoga-meditation.png";
import vaccinationImg from "../assets/vaccination.png";
import sleepImmunityImg from "../assets/sleep-immunity.png";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Common Diseases and Their Symptoms",
    date: "April 10, 2025",
    image: diseasesImg,
    preview:
      "Learn about common diseases like flu, diabetes, and hypertension. Understand their early signs and when to seek medical help.",
  },
  {
    id: 2,
    title: "5 Tips to Boost Your Immunity Naturally",
    date: "April 5, 2025",
    image: immunityImg,
    preview:
      "Healthy eating, regular exercise, and stress management are essential. Discover natural ways to strengthen your immune system.",
  },
  {
    id: 3,
    title: "How AI is Transforming Healthcare",
    date: "March 30, 2025",
    image: aiHealthcareImg,
    preview:
      "AI is making healthcare faster and more accurate. Learn how tools like disease prediction systems are shaping the future.",
  },
  {
    id: 4,
    title: "The Importance of Mental Health Awareness",
    date: "March 25, 2025",
    image: mentalHealthImg,
    preview:
      "Mental health is just as important as physical health. Learn how to recognize signs of mental distress and promote emotional well-being.",
  },
  {
    id: 5,
    title: "Top 7 Superfoods for a Healthy Heart",
    date: "March 15, 2025",
    image: heartHealthImg,
    preview:
      "A heart-healthy diet can reduce the risk of cardiovascular diseases. Discover superfoods that support heart health and how to include them in your meals.",
  },
  {
    id: 6,
    title: "Yoga and Meditation: Keys to a Balanced Life",
    date: "March 1, 2025",
    image: yogaMeditationImg,
    preview:
      "Find out how daily yoga and meditation can improve your physical health, reduce stress, and enhance mindfulness in everyday life.",
  },
  {
    id: 7,
    title: "Vaccinations: What You Need to Know",
    date: "February 20, 2025",
    image: vaccinationImg,
    preview:
      "Vaccines are a vital part of public health. Learn how they work, why they’re safe, and what vaccines are essential for you and your family.",
  },
  {
    id: 8,
    title: "The Connection Between Sleep and Immunity",
    date: "February 10, 2025",
    image: sleepImmunityImg,
    preview:
      "Getting quality sleep each night can boost your immune system. Explore the science behind sleep and practical tips for better rest.",
  },
];

function BlogPage() {
  return (
    <>
      <Navbar />
      <Container className="py-5">
        <h1 className="text-center mb-4">Health Blog</h1>
        <Row className="justify-content-center">
          {blogPosts.map((post) => (
            <Col
              key={post.id}
              md={3}
              className="d-flex justify-content-center mb-4"
            >
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={post.image}
                  height="180px"
                  style={{ objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {post.date}
                  </Card.Subtitle>
                  <Card.Text>{post.preview}</Card.Text>
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="primary">Read More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Chat />
      <Footer />
    </>
  );
}

export default BlogPage;
