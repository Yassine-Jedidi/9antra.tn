import { useState, useEffect } from "react";
import axios from "axios";

interface Course {
  _id: string;
  title: string;
  price: string;
  image: string;
}

const Admin = () => {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/courses");
      setCourseList(response.data);
    } catch (err) {
      setError("Failed to fetch courses");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourse.title && newCourse.price && newCourse.image) {
      try {
        setIsLoading(true);
        await axios.post("http://localhost:5000/api/courses", newCourse);
        await fetchCourses();
        setNewCourse({ title: "", price: "", image: "" });
      } catch (err) {
        setError("Failed to create course");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourse) {
      try {
        setIsLoading(true);
        await axios.patch(
          `http://localhost:5000/api/courses/${selectedCourse._id}`,
          selectedCourse
        );
        await fetchCourses();
        setSelectedCourse(null);
        setIsEditing(false);
      } catch (err) {
        setError("Failed to update course");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      await fetchCourses();
    } catch (err) {
      setError("Failed to delete course");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <nav className="bg-gray-100 p-5 w-64">
        <h1 className="text-xl font-bold mb-5">Admin Panel</h1>
        <ul className="list-none p-0">
          <li className="py-2 cursor-pointer bg-gray-200">Courses</li>
        </ul>
      </nav>
      <main className="flex-1 p-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Course Management</h2>

          {/* Create New Course */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Add New Course</h3>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  value={newCourse.price}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, price: e.target.value })
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
                  value={newCourse.image}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, image: e.target.value })
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
                        setNewCourse({ ...newCourse, image: imageUrl });
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
                Create Course
              </button>
            </form>
          </div>

          {/* Course List */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Existing Courses</h3>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {courseList.map((course) => (
                  <div
                    key={course._id}
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
                        onClick={() => handleDeleteCourse(course._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Edit Course Modal */}
          {isEditing && selectedCourse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Edit Course</h3>
                <form onSubmit={handleUpdateCourse} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={selectedCourse.title}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          title: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="text"
                      value={selectedCourse.price}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          price: e.target.value,
                        })
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
                      value={selectedCourse.image}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          image: e.target.value,
                        })
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
                            setSelectedCourse({
                              ...selectedCourse,
                              image: imageUrl,
                            });
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
                    Update Course
                  </button>
                </form>
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
      </main>
    </div>
  );
};

export default Admin;
