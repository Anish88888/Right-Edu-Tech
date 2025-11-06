import React, { useState } from "react";

export default function AddCourseModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    courseName: "",
    image: null,
    description: "",
    tags: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] }); // handle file upload
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold text-orange-600">
            Add New Course
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-orange-600 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Course Name
            </label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full mt-1 text-sm border border-gray-300 rounded-md p-2 cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-600 hover:file:bg-orange-200"
            />
            {formData.image && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              rows="3"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Tags (Optional)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. Kids, Web, Beginner"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-orange-500 text-white font-semibold rounded-sm hover:bg-orange-600 transition"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
