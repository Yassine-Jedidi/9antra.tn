import Admin from "./Admin";
import Contact from "./Contact";
import Courses from "./Courses";
import Header from "./Header";
import Hero from "./Hero";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Admin />
      <Header />
      <Hero />
      <Courses />
      <Contact />
    </div>
  );
};

export default LandingPage;
