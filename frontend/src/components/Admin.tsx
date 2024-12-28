import { useState, useEffect, ChangeEvent, useRef } from "react";
import axios, { AxiosError } from "axios";

interface Course {
  _id: string;
  title: string;
  price: string;
  image: string;
}

const Admin = () => {
  const createFileInputRef = useRef<HTMLInputElement>(null);
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

  // Create form states
  const [createFile, setCreateFile] = useState<File | null>(null);
  const [createPreviewUrl, setCreatePreviewUrl] = useState<string>("");

  // Edit form states
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreviewUrl, setEditPreviewUrl] = useState<string>("");

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

  const handleCreateFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCreateFile(file);
      setCreatePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleEditFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditFile(file);
      setEditPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourse.title && newCourse.price && createFile) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("title", newCourse.title);
        formData.append("price", newCourse.price);
        formData.append("image", createFile);

        console.log("Sending form data:", {
          title: newCourse.title,
          price: newCourse.price,
          file: createFile.name,
        });

        const response = await axios.post(
          "http://localhost:5000/api/courses",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Server response:", response.data);
        await fetchCourses();
        setNewCourse({ title: "", price: "", image: "" });
        setCreateFile(null);
        setCreatePreviewUrl("");
        setError(null);
        // Reset the file input
        if (createFileInputRef.current) {
          createFileInputRef.current.value = "";
        }
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        console.error("Error details:", error.response?.data || error);
        setError(error.response?.data?.error || "Failed to create course");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Please fill in all fields and select an image");
    }
  };

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourse) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("title", selectedCourse.title);
        formData.append("price", selectedCourse.price);
        if (editFile) {
          formData.append("image", editFile);
        }

        await axios.patch(
          `http://localhost:5000/api/courses/${selectedCourse._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        await fetchCourses();
        setSelectedCourse(null);
        setEditFile(null);
        setEditPreviewUrl("");
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                ref={createFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleCreateFileChange}
                className="mt-1 block w-full"
                required
              />
              {createPreviewUrl && (
                <img
                  src={createPreviewUrl}
                  alt="Preview"
                  className="mt-2 h-32 w-32 object-cover rounded-md"
                />
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isLoading ? "Creating..." : "Create Course"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Course List</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseList.map((course) => (
              <div key={course._id} className="border rounded-lg p-4 shadow-sm">
                <img
                  src={`http://localhost:5000${course.image}`}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h3 className="font-bold">{course.title}</h3>
                <p className="text-gray-600">${course.price}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setIsEditing(true);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isEditing && selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditFileChange}
                    className="mt-1 block w-full"
                  />
                  {editPreviewUrl ? (
                    <img
                      src={editPreviewUrl}
                      alt="Preview"
                      className="mt-2 h-32 w-32 object-cover rounded-md"
                    />
                  ) : (
                    <img
                      src={`http://localhost:5000${selectedCourse.image}`}
                      alt={selectedCourse.title}
                      className="mt-2 h-32 w-32 object-cover rounded-md"
                    />
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCourse(null);
                      setIsEditing(false);
                      setEditFile(null);
                      setEditPreviewUrl("");
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                  >
                    {isLoading ? "Updating..." : "Update Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
