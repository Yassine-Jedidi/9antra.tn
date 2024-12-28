import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";

interface Course {
  _id: string;
  title: string;
  price: string;
  image: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses");
        setCourses(response.data);
      } catch (err) {
        setError("Failed to fetch courses");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-24">
          <div className="flex justify-center items-center h-64">
            <div className="text-2xl text-gray-600">Loading courses...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-24">
          <div className="flex justify-center items-center h-64">
            <div className="text-2xl text-red-600">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-24">
        <div className="flex justify-between items-center mb-12 mx-8">
          <h2 className="text-5xl font-bold">Discover Our Courses</h2>
          <button className="bg-[#C1316D] hover:bg-[#A12759] text-lg text-white px-8 py-2 rounded-full font-bold">
            View More
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              title={course.title}
              price={course.price}
              image={`http://localhost:5000${course.image}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
