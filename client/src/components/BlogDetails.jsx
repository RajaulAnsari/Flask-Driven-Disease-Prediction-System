// src/pages/BlogDetailPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import diseasesImg from "../assets/diseases.png";
import immunityImg from "../assets/immunity.png";
import aiHealthcareImg from "../assets/ai-healthcare.png";
import mentalHealthImg from "../assets/mental-health.png";
import heartHealthImg from "../assets/heart-health.png";
import yogaMeditationImg from "../assets/yoga-meditation.png";
import vaccinationImg from "../assets/vaccination.png";
import sleepImmunityImg from "../assets/sleep-immunity.png";
import { Container } from "react-bootstrap";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Common Diseases and Their Symptoms",
    date: "April 10, 2025",
    image: diseasesImg,
    content: (
      <p>
        Diseases come in various forms ranging from mild and self-limiting
        illnesses to chronic or life-threatening conditions. Understanding the
        common diseases that affect people around the world is the first step
        toward prevention and timely treatment. Conditions like influenza,
        diabetes, hypertension, asthma, and infections such as urinary tract
        infections (UTIs) or gastrointestinal disorders are encountered
        frequently in both urban and rural settings. By learning about their
        early symptoms, individuals can act quickly and seek medical attention
        before these conditions worsen.
        <br /> One of the most common ailments is influenza, or the seasonal
        flu, which can spread rapidly in communities. It is typically
        accompanied by a high fever, sore throat, muscle aches, and fatigue.
        While many people recover within a week, the flu can lead to
        complications like pneumonia in vulnerable populations such as the
        elderly and those with compromised immune systems. Similarly, diabetes
        particularly type 2 diabetes is increasingly prevalent worldwide due to
        lifestyle changes. Its early symptoms often include frequent urination,
        excessive thirst, slow wound healing, and unexplained weight loss.
        Despite these indicators, many individuals go undiagnosed because they
        mistake these signs for temporary issues or aging. <br />
        Hypertension, or high blood pressure, is known as a “silent killer”
        because it often presents no symptoms until significant damage has been
        done to the heart, brain, or kidneys. Regular screening and
        understanding risk factors such as stress, obesity, and high-sodium
        diets can prevent long-term complications like strokes or heart attacks.
        On the other hand, conditions like asthma present more visible symptoms
        including wheezing, chest tightness, and shortness of breath.
        Identifying these signs, especially in children, is essential for
        managing the condition with appropriate medications and lifestyle
        adjustments.
        <br /> Being aware of these symptoms empowers individuals to take
        preventive measures such as regular health check ups, adopting a
        balanced diet, managing stress, and maintaining physical activity. In
        addition, public awareness campaigns and accessible healthcare systems
        play a crucial role in encouraging early detection. Overall, improving
        health literacy about common diseases and their symptoms is not just
        beneficial on an individual level, but is also a cornerstone of public
        health. Recognizing when something is “off” with your body and knowing
        when to seek help can make all the difference in living a longer,
        healthier life.
      </p>
    ),
  },
  {
    id: 2,
    title: "5 Tips to Boost Your Immunity Naturally",
    date: "April 5, 2025",
    image: immunityImg,
    content:
      "Boosting your immunity is crucial in fighting infections. This blog highlights 5 natural ways including eating nutritious food, sleeping well, and staying hydrated.",
  },
  {
    id: 3,
    title: "How AI is Transforming Healthcare",
    date: "March 30, 2025",
    image: aiHealthcareImg,
    content:
      "Artificial Intelligence is reshaping the medical world. From early disease detection to personalized treatments, AI is helping doctors and patients in many ways.",
  },
  {
    id: 4,
    title: "The Importance of Mental Health Awareness",
    date: "March 25, 2025",
    image: mentalHealthImg,
    content:
      "Mental health is just as important as physical health. Learn how to recognize signs of mental distress and promote emotional well-being.",
  },
  {
    id: 5,
    title: "Top 7 Superfoods for a Healthy Heart",
    date: "March 15, 2025",
    image: heartHealthImg,
    content:
      "A heart-healthy diet can reduce the risk of cardiovascular diseases. Discover superfoods that support heart health and how to include them in your meals.",
  },
  {
    id: 6,
    title: "Yoga and Meditation: Keys to a Balanced Life",
    date: "March 1, 2025",
    image: yogaMeditationImg,
    content:
      "Find out how daily yoga and meditation can improve your physical health, reduce stress, and enhance mindfulness in everyday life.",
  },
  {
    id: 7,
    title: "Vaccinations: What You Need to Know",
    date: "February 20, 2025",
    image: vaccinationImg,
    content:
      "Vaccines are a vital part of public health. Learn how they work, why they’re safe, and what vaccines are essential for you and your family.",
  },
  {
    id: 8,
    title: "The Connection Between Sleep and Immunity",
    date: "February 10, 2025",
    image: sleepImmunityImg,
    content:
      "Getting quality sleep each night can boost your immune system. Explore the science behind sleep and practical tips for better rest.",
  },
];

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogPosts.find((post) => post.id.toString() === id);

  if (!blog) {
    return <div className="p-4 text-center">Blog not found.</div>;
  }

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <div className="max-w-3xl mx-auto p-4">
          <Link
            to="/blog"
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            &larr; Back to Blog
          </Link>
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <p className="text-sm text-gray-500 mb-4">{blog.date}</p>
          <img
            src={blog.image}
            alt={blog.title}
            height="600px"
            style={{ objectFit: "cover" }}
          />
          <p className="text-gray-800 text-lg leading-relaxed">
            {blog.content}
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default BlogDetails;
