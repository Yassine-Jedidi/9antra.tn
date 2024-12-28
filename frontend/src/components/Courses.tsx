import CourseCard from "./CourseCard";
import { courses } from "../data/courses";

const Courses = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-24">
        <div className="flex justify-between items-center mb-12 mx-8">
          <h2 className="text-5xl font-bold ">Discover Our Courses</h2>
          <button className="bg-[#C1316D] hover:bg-[#A12759] text-lg text-white px-8 py-2 rounded-full font-bold">
            View More
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
