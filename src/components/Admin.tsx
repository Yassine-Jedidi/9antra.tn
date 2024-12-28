import { useState } from "react";
import { Course, courses } from "../data/courses";

interface CourseFormProps {
  course: Partial<Course>;
  onSubmit: (e: React.FormEvent) => void;
  buttonText: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [courseList, setCourseList] = useState(courses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: "",
    price: "",
    image: "",
  });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourse.title && newCourse.price && newCourse.image) {
      setCourseList([...courseList, newCourse as Course]);
      setNewCourse({ title: "", price: "", image: "" });
    }
  };

  const handleUpdateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourse) {
      setCourseList(
        courseList.map((course) =>
          course.title === selectedCourse.title ? selectedCourse : course
        )
      );
      setSelectedCourse(null);
      setIsEditing(false);
    }
  };

  const handleDeleteCourse = (title: string) => {
    setCourseList(courseList.filter((course) => course.title !== title));
  };

  const CourseForm = ({ course, onSubmit, buttonText }: CourseFormProps) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={course.title}
          onChange={(e) =>
            course === newCourse
              ? setNewCourse({ ...newCourse, title: e.target.value })
              : setSelectedCourse({ ...selectedCourse!, title: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="text"
          value={course.price}
          onChange={(e) =>
            course === newCourse
              ? setNewCourse({ ...newCourse, price: e.target.value })
              : setSelectedCourse({ ...selectedCourse!, price: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          value={course.image}
          onChange={(e) =>
            course === newCourse
              ? setNewCourse({ ...newCourse, image: e.target.value })
              : setSelectedCourse({ ...selectedCourse!, image: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image Upload
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                const imageUrl = reader.result as string;
                course === newCourse
                  ? setNewCourse({ ...newCourse, image: imageUrl })
                  : setSelectedCourse({ ...selectedCourse!, image: imageUrl });
              };
              reader.readAsDataURL(file);
            }
          }}
          className="mt-1 block w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-[#C1316D] text-white px-4 py-2 rounded-md hover:bg-[#A12759]"
      >
        {buttonText}
      </button>
    </form>
  );

  return (
    <div className="flex min-h-screen">
      <nav className="bg-gray-100 p-5 w-64">
        <h1 className="text-xl font-bold mb-5">Admin Panel</h1>
        <ul className="list-none p-0">
          <li
            className={`py-2 cursor-pointer ${
              activeTab === "courses" ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </li>
          <li
            className={`py-2 cursor-pointer ${
              activeTab === "dashboard" ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`py-2 cursor-pointer ${
              activeTab === "settings" ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-8">
        {activeTab === "courses" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Course Management</h2>

            {/* Create New Course */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Add New Course</h3>
              <CourseForm
                course={newCourse}
                onSubmit={handleCreateCourse}
                buttonText="Create Course"
              />
            </div>

            {/* Course List */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Existing Courses</h3>
              <div className="grid grid-cols-1 gap-4">
                {courseList.map((course) => (
                  <div
                    key={course.title}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold">{course.title}</h4>
                        <p className="text-gray-600">{course.price}</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          setIsEditing(true);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.title)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Course Modal */}
            {isEditing && selectedCourse && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-96">
                  <h3 className="text-xl font-semibold mb-4">Edit Course</h3>
                  <CourseForm
                    course={selectedCourse}
                    onSubmit={handleUpdateCourse}
                    buttonText="Update Course"
                  />
                  <button
                    onClick={() => {
                      setSelectedCourse(null);
                      setIsEditing(false);
                    }}
                    className="mt-4 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
