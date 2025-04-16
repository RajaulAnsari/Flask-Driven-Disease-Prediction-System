import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Home.css";
import boyAvatar from "../assets/boyavatar1.png";
import girlAvatar from "../assets/girlavatar1.png";

function Home() {
  return (
    <>
      <Navbar />
      <br />
      <div className="bannerDiv">
        <div className="text-overlay">
          <p>Disease Prediction system</p>
        </div>
        <div className="custom-shape-divider-top-1744453972">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      <h1>Our Team</h1>
      <div className="ourteam">
        <div className="team-member">
          <img src={boyAvatar} alt="Avatar" />
          <div className="team-info">
            <h4 className="name">John Doe</h4>
            <span className="position">AI Model Developer</span>
          </div>
        </div>

        <div className="team-member">
          <img src={girlAvatar} alt="Avatar" />
          <div className="team-info">
            <h4 className="name">Jane Smith</h4>
            <span className="position">Medical Data Analyst</span>
          </div>
        </div>

        <div className="team-member">
          <img src={boyAvatar} alt="Avatar" />
          <div className="team-info">
            <h4 className="name">Michael Johnson</h4>
            <span className="position">Backend Developer</span>
          </div>
        </div>

        <div className="team-member">
          <img src={girlAvatar} alt="Avatar" />
          <div className="team-info">
            <h4 className="name">Emily Davis</h4>
            <span className="position">Project Lead</span>
          </div>
        </div>
      </div>

      <h1 className="testimonial-heading">Testimonials</h1>
      <div className="testimonials">
        <div className="testimonial-card">
          <p className="quote">
            "The disease prediction tool gave me instant results and peace of
            mind. Highly recommend it!"
          </p>
          <p className="author">- Sarah Williams</p>
        </div>
        <div className="testimonial-card">
          <p className="quote">
            "An innovative system that helped detect early symptoms accurately.
            Lifesaver!"
          </p>
          <p className="author">- Mark Johnson</p>
        </div>
        <div className="testimonial-card">
          <p className="quote">
            "Clean interface and precise predictions. Kudos to the developers!"
          </p>
          <p className="author">- Amanda Lee</p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
