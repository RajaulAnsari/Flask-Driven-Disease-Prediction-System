import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Importing images used for each blog post

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
    content: (
      <p>
        The immune system is our body's natural defense against harmful
        pathogens such as bacteria, viruses, and other foreign invaders. Keeping
        it strong and functioning properly is vital for overall health and
        longevity. While there's no magic pill to prevent illness entirely,
        there are several natural lifestyle habits you can adopt that have been
        shown to significantly improve immune resilience. These habits not only
        enhance immunity but also contribute to a more balanced, energetic, and
        disease-free life.
        <br />
        One of the most impactful ways to strengthen your immune system is
        through proper nutrition. Eating a diet rich in fruits, vegetables,
        whole grains, lean proteins, and healthy fats provides the essential
        vitamins and minerals your immune cells need to function optimally. For
        example, citrus fruits like oranges and lemons are high in vitamin C,
        which supports the production of white blood cells. Leafy greens, nuts,
        and seeds are packed with antioxidants and vitamin E, both known for
        fighting free radicals and reducing inflammation. Probiotic-rich foods
        like yogurt and fermented vegetables help support gut health, which
        plays a crucial role in regulating the immune response.
        <br />
        Sleep is another crucial, yet often overlooked, component of immune
        health. When we sleep, our bodies produce and release cytokines—proteins
        that target infection and inflammation. Lack of sleep can lead to a
        decrease in these protective cytokines and hinder immune function. Aim
        for 7 to 9 hours of quality sleep each night by maintaining a consistent
        sleep schedule, creating a restful environment, and avoiding screens
        before bedtime. Practicing relaxation techniques such as deep breathing
        or meditation can also help improve sleep quality and reduce stress,
        which further benefits your immune system.
        <br />
        Staying physically active is the third key tip for natural immunity
        enhancement. Regular exercise helps boost circulation, reduce
        inflammation, and promote the efficient movement of immune cells
        throughout the body. It doesn't have to be intense—simple activities
        like walking, yoga, cycling, or stretching for at least 30 minutes a day
        can be very effective. Exercise also contributes to mental well-being by
        releasing endorphins and reducing cortisol, the stress hormone known to
        suppress immune function when chronically elevated.
        <br />
        Finally, hydration and stress management round out the list of top
        natural immunity boosters. Drinking enough water helps flush toxins from
        the body, keeps your mucous membranes moist (which helps trap
        pathogens), and supports the lymphatic system. Stress, on the other
        hand, can significantly impair your body's ability to fight infections.
        Chronic stress weakens immune responses and can lead to inflammation.
        Incorporating mindfulness practices, spending time in nature, staying
        socially connected, and setting boundaries for work and rest can all
        contribute to a calmer, more resilient you.
        <br />
        In conclusion, boosting your immune system doesn't require expensive
        supplements or extreme changes. By consistently following these five
        tips—eating a nutrient-rich diet, getting sufficient sleep, exercising
        regularly, staying hydrated, and managing stress—you can support your
        body's natural defenses in the most holistic and effective way. These
        healthy habits not only prevent illness but also improve your overall
        quality of life, giving you the energy and resilience to thrive in any
        season.
      </p>
    ),
  },
  {
    id: 3,
    title: "How AI is Transforming Healthcare",
    date: "March 30, 2025",
    image: aiHealthcareImg,
    content: (
      <p>
        Artificial Intelligence (AI) is no longer a concept of the future—it's
        actively revolutionizing the healthcare industry today. From early
        disease detection and personalized treatments to administrative
        automation and predictive analytics, AI technologies are reshaping how
        care is delivered and experienced. These innovations are not only
        helping medical professionals work more efficiently, but also improving
        patient outcomes, making healthcare more accessible, and reducing
        operational costs across the board.
        <br />
        One of the most promising areas where AI is making a significant impact
        is in diagnostics. AI-powered systems can now analyze medical imaging,
        such as X-rays, MRIs, and CT scans, with astonishing accuracy—sometimes
        even outperforming human radiologists. These systems are trained on vast
        datasets and can detect anomalies like tumors, fractures, or internal
        bleeding with great precision. For instance, algorithms developed for
        breast cancer screening can flag potential malignancies that a human
        might overlook, allowing for earlier and more effective interventions.
        In addition to imaging, AI is also being used in pathology and genomics,
        helping researchers and doctors understand complex biological patterns
        and genetic markers that influence disease progression.
        <br />
        Personalized medicine is another frontier where AI is proving
        transformative. Every individual's health journey is unique, and AI can
        analyze massive amounts of personal data—including genetic information,
        medical history, lifestyle factors, and even data from wearable
        devices—to tailor treatment plans specifically for them. This shift from
        a one-size-fits-all model to precision healthcare ensures more effective
        treatment responses and reduces the risk of adverse effects. In chronic
        disease management, for example, AI-powered tools can monitor patient
        conditions in real-time and alert healthcare providers to early signs of
        complications, enabling timely intervention and potentially saving
        lives.
        <br />
        Beyond clinical settings, AI is also streamlining administrative
        processes and making healthcare more accessible. Chatbots and virtual
        health assistants are being used to answer patient queries, schedule
        appointments, send reminders, and even provide mental health support.
        Natural Language Processing (NLP) technologies are helping doctors
        transcribe notes, analyze medical records, and extract valuable insights
        from unstructured data. Predictive analytics, fueled by AI, is being
        used by hospitals to forecast patient admissions, optimize resource
        allocation, and prevent overcrowding—challenges that became especially
        pressing during the COVID-19 pandemic.
        <br />
        However, as with any powerful technology, the integration of AI into
        healthcare comes with ethical and regulatory considerations. Patient
        data privacy, algorithmic bias, and transparency are significant issues
        that need to be addressed. For AI to be a truly effective and
        trustworthy partner in healthcare, developers and healthcare providers
        must work together to create systems that are secure, equitable, and
        subject to rigorous validation.
        <br />
        In summary, AI is not replacing healthcare professionals—it is
        empowering them. By automating routine tasks, enhancing diagnostic
        accuracy, personalizing treatments, and improving operational
        efficiency, AI is helping to build a smarter, more responsive healthcare
        system. As technology continues to evolve, the role of AI in medicine
        will only grow more integral, offering the promise of better health
        outcomes and a higher standard of care for patients around the world.
      </p>
    ),
  },
  {
    id: 4,
    title: "The Importance of Mental Health Awareness",
    date: "March 25, 2025",
    image: mentalHealthImg,
    content: (
      <p>
        Mental health is a critical component of overall well-being, yet it is
        often overlooked or stigmatized in many societies. In today's fast-paced
        world, individuals are constantly exposed to stressors such as work
        pressure, academic challenges, financial worries, and personal issues.
        These pressures can lead to mental health problems like anxiety,
        depression, burnout, and even more serious conditions if left
        unaddressed. Recognizing the importance of mental wellness and taking
        proactive steps to support it can significantly improve one's quality of
        life and prevent long-term psychological issues.
        <br />
        One of the most effective ways to support mental health is by fostering
        strong social connections. Humans are inherently social beings, and
        having supportive relationships can act as a buffer against stress and
        emotional distress. Whether it's family, friends, or community groups,
        engaging in meaningful conversations and sharing one's feelings can
        offer emotional relief and a sense of belonging. Additionally, seeking
        help from mental health professionals like counselors or therapists
        should be normalized, just as one would visit a doctor for physical
        ailments.
        <br />
        Lifestyle choices also play a vital role in mental well-being. Regular
        physical activity, for instance, releases endorphins—natural mood
        lifters—that can help reduce symptoms of depression and anxiety. A
        balanced diet rich in nutrients supports brain health and helps regulate
        mood. Adequate sleep is equally essential, as it allows the brain to
        rest and reset, improving emotional regulation and cognitive function.
        Furthermore, mindfulness practices such as meditation, deep breathing,
        or journaling can cultivate self-awareness and promote a calmer, more
        resilient mindset.
        <br />
        It's also important to manage stress effectively and set healthy
        boundaries in daily life. This includes learning to say no, taking
        breaks when needed, and avoiding overcommitment. In work or academic
        environments, promoting a culture of mental health awareness and
        flexibility can empower individuals to seek help without fear of
        judgment. Employers and educators should be encouraged to implement
        mental health programs and provide access to resources for those in
        need.
        <br />
        In conclusion, mental health should be prioritized just as much as
        physical health. By fostering supportive relationships, adopting healthy
        habits, practicing self-care, and creating open, stigma-free
        environments, individuals and communities can nurture emotional
        well-being. Raising awareness and breaking down barriers to mental
        health care are essential steps toward a more compassionate and mentally
        resilient society.
      </p>
    ),
  },
  {
    id: 5,
    title: "Top 7 Superfoods for a Healthy Heart",
    date: "March 15, 2025",
    image: heartHealthImg,
    content: (
      <p>
        Nutrition plays a fundamental role in maintaining overall health and
        preventing chronic diseases. The food we consume serves as the fuel and
        building blocks for every function in our body—from energy production
        and brain function to immune response and cellular repair. By adopting a
        balanced and nutritious diet, individuals can enhance their well-being,
        boost energy levels, and reduce the risk of conditions such as obesity,
        heart disease, diabetes, and certain cancers.
        <br />
        A healthy diet begins with variety. Incorporating a wide range of foods
        ensures that the body receives all essential nutrients it needs to
        function optimally. Fruits and vegetables are rich in vitamins,
        minerals, and antioxidants that help fight inflammation and strengthen
        immunity. Whole grains like brown rice, oats, and quinoa provide
        sustained energy and fiber, aiding digestion and preventing spikes in
        blood sugar levels. Lean proteins—such as fish, poultry, legumes, and
        nuts—support muscle health, hormone production, and repair of tissues.
        Healthy fats from sources like avocados, olive oil, and seeds are vital
        for brain health and hormone balance.
        <br />
        Portion control and mindful eating are also critical aspects of good
        nutrition. Eating slowly, savoring meals, and paying attention to hunger
        cues can help prevent overeating and improve digestion. It's important
        to limit the intake of processed foods, added sugars, and high-sodium
        snacks, as these contribute to inflammation, weight gain, and increased
        risk of metabolic disorders. Drinking adequate water throughout the day
        keeps the body hydrated, supports detoxification, and enhances
        metabolism.
        <br />
        Nutrition is not only about what we eat, but also how and when we eat.
        Establishing regular meal times, avoiding late-night snacking, and
        choosing balanced meals with appropriate macronutrient ratios can help
        maintain stable blood sugar and energy levels. Furthermore,
        personalizing nutrition based on age, activity level, health goals, and
        cultural preferences can make healthy eating more sustainable and
        enjoyable.
        <br />
        In conclusion, good nutrition is a cornerstone of a healthy lifestyle.
        By choosing whole, nutrient-dense foods, practicing moderation, and
        staying informed about dietary needs, individuals can significantly
        improve their physical and mental well-being. Small, consistent changes
        in daily eating habits can lead to long-term benefits and contribute to
        a vibrant, disease-free life.
      </p>
    ),
  },
  {
    id: 6,
    title: "Yoga and Meditation: Keys to a Balanced Life",
    date: "March 1, 2025",
    image: yogaMeditationImg,
    content: (
      <p>
        Mental health is an essential component of overall well-being, yet it is
        often overlooked in discussions about health and wellness. It
        encompasses our emotional, psychological, and social well-being,
        influencing how we think, feel, and behave. Good mental health allows
        individuals to cope with the stresses of life, work productively, build
        meaningful relationships, and contribute to their communities.
        Conversely, poor mental health can lead to a wide range of emotional and
        physical problems, making it crucial to recognize the signs and seek
        support when needed.
        <br />
        Several factors can affect mental health, including genetics, life
        experiences, trauma, and family history of mental health issues. Common
        mental health disorders such as anxiety, depression, bipolar disorder,
        and post-traumatic stress disorder (PTSD) can significantly impact daily
        life. Symptoms may include persistent sadness, irritability, fatigue,
        changes in sleep or appetite, and withdrawal from social activities. It
        is important to remember that mental health issues are not a sign of
        weakness and can affect anyone regardless of age, gender, or background.
        <br />
        Maintaining good mental health requires proactive strategies. Regular
        physical activity has been shown to reduce stress, improve mood, and
        boost overall mental resilience by releasing endorphins and promoting
        brain health. A balanced diet, adequate sleep, and limited use of
        alcohol and caffeine also contribute to emotional stability. Practicing
        mindfulness, meditation, and deep breathing exercises can help calm the
        mind and increase awareness of one's emotions. Social support—whether
        from friends, family, or support groups—plays a vital role in providing
        comfort, understanding, and a sense of belonging.
        <br />
        Seeking professional help is an important step for those struggling with
        mental health challenges. Therapists, counselors, and psychiatrists are
        trained to provide support, diagnosis, and treatment tailored to
        individual needs. Mental health apps and online resources have also made
        it easier for people to access support discreetly and conveniently.
        Early intervention and consistent care can lead to significant
        improvements and help individuals regain a sense of control and hope.
        <br />
        In conclusion, prioritizing mental health is just as important as taking
        care of physical health. By fostering a supportive environment, reducing
        stigma, and promoting self-care practices, we can create a society that
        values emotional well-being. Encouraging open conversations and
        educating ourselves and others about mental health can empower
        individuals to seek help and lead fulfilling, balanced lives.
      </p>
    ),
  },
  {
    id: 7,
    title: "Vaccinations: What You Need to Know",
    date: "February 20, 2025",
    image: vaccinationImg,
    content: (
      <p>
        Diet and nutrition play a crucial role in maintaining overall health and
        preventing a wide range of diseases. What we eat directly impacts how
        our bodies function, how we feel, and even how we age. A well-balanced
        diet provides the essential nutrients—vitamins, minerals, proteins,
        carbohydrates, and healthy fats—that our bodies need to operate
        efficiently. Conversely, poor dietary habits are strongly linked to
        chronic conditions such as obesity, diabetes, cardiovascular diseases,
        and certain types of cancer.
        <br />
        A healthy diet typically includes a variety of nutrient-dense foods.
        Fruits and vegetables are rich in antioxidants, fiber, and essential
        vitamins like vitamin C and A, which support immune function and
        cellular repair. Whole grains, such as brown rice, oats, and quinoa,
        provide sustained energy and improve digestion through their high fiber
        content. Lean proteins like fish, poultry, legumes, and tofu contribute
        to muscle repair and hormone production, while healthy fats from sources
        like nuts, seeds, and avocados support brain health and reduce
        inflammation.
        <br />
        In addition to choosing the right foods, portion control and meal timing
        are equally important. Overeating—even healthy foods—can lead to weight
        gain and metabolic imbalance. Eating smaller, more frequent meals
        throughout the day helps regulate blood sugar levels and prevents energy
        crashes. Hydration is also critical; water supports digestion,
        detoxification, and nutrient transport throughout the body. Sugary
        beverages and highly processed snacks, on the other hand, contribute to
        empty calories and should be consumed sparingly.
        <br />
        Nutrition also has a profound effect on mental health. Emerging research
        shows that diets high in processed foods, trans fats, and sugar may
        increase the risk of depression and anxiety, while diets rich in omega-3
        fatty acids, B vitamins, and probiotics can enhance mood and cognitive
        function. The gut-brain connection—a link between the digestive system
        and the brain—highlights the importance of maintaining a healthy gut
        microbiome for emotional and psychological well-being.
        <br />
        In conclusion, adopting a nutritious and balanced diet is one of the
        most powerful tools for achieving long-term health and vitality. By
        making informed food choices, practicing moderation, and staying
        hydrated, individuals can not only prevent illness but also feel more
        energized, focused, and emotionally stable. Healthful eating is not
        about strict limitations but about nourishing the body and mind with the
        best possible fuel every day.
      </p>
    ),
  },
  {
    id: 8,
    title: "The Connection Between Sleep and Immunity",
    date: "February 10, 2025",
    image: sleepImmunityImg,
    content: (
      <p>
        The relationship between physical activity and health is
        well-established, with regular exercise offering a wide range of
        benefits for both the body and mind. From reducing the risk of chronic
        diseases to improving mental well-being, staying active is one of the
        most effective ways to enhance overall quality of life. Even moderate
        physical activity, when performed consistently, can lead to significant
        health improvements and long-term wellness.
        <br />
        One of the most immediate benefits of regular exercise is its impact on
        cardiovascular health. Activities such as walking, cycling, swimming,
        and jogging strengthen the heart, improve blood circulation, and help
        regulate blood pressure. Exercise also plays a key role in maintaining
        healthy cholesterol levels and reducing the risk of heart disease and
        stroke. In addition, physical activity supports the body's ability to
        regulate blood sugar, making it particularly important in the prevention
        and management of type 2 diabetes.
        <br />
        Beyond physical health, exercise has powerful effects on mental and
        emotional well-being. During physical activity, the body releases
        endorphins—chemicals that act as natural mood enhancers. These
        "feel-good" hormones help combat stress, anxiety, and depression while
        promoting a sense of calm and happiness. Regular exercise has also been
        linked to better sleep quality and improved cognitive function,
        including sharper memory, enhanced focus, and reduced risk of
        age-related cognitive decline.
        <br />
        Engaging in physical activity can also support healthy weight
        management. It helps burn calories, build lean muscle mass, and boost
        metabolism. Resistance training, in particular, not only strengthens
        muscles and bones but also improves posture and mobility, which are
        especially important as we age. Incorporating a mix of cardio, strength,
        flexibility, and balance exercises into a weekly routine ensures a
        holistic approach to fitness.
        <br />
        Finally, exercise fosters social interaction and motivation when done in
        groups or with friends and family. Whether it's joining a local sports
        team, attending a dance class, or simply walking with a neighbor, these
        activities can boost social connection and accountability. In
        conclusion, regular physical activity is a cornerstone of a healthy
        lifestyle. By making movement a daily habit, individuals can experience
        profound improvements in physical, mental, and emotional health, setting
        the foundation for a vibrant and fulfilling life.
      </p>
    ),
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
          <p
            className="text-gray-800 text-lg lead text-justify"
            style={{ textAlign: "justify" }}
          >
            {blog.content}
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default BlogDetails;
