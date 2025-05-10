import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from "@/components/Header"
import "@/styles/EditCourse.css";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    thumbnail: '',
    startDate: '',
    endDate: '',
    price: ''
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const existing = courses.find(course => course.id === parseInt(id));

    if (existing) {
      setFormData(existing);
      setPreviewImage(existing.thumbnail);
    } else {
      toast.error("Course not found!");
      navigate('/courses');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, thumbnail: reader.result }));
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    return formData.name && formData.description && formData.thumbnail && formData.price;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill all required fields');
      return;
    }

    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const updatedCourses = courses.map(course => 
      course.id === parseInt(id) ? { ...formData, id: parseInt(id) } : course
    );

    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    toast.success('Course updated successfully');
    navigate('/courses');
  };

  return (
    <>
      <Header />
      <div className="edit-course-container">
        <h2>Edit Course</h2>
        <form onSubmit={handleSubmit} className="course-form">
          <label>Course Title *</label>
          <input
            className="title-price"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label htmlFor="courseImage" className="upload-label">
            <span className="upload-icon">+</span> <h4>Upload Course Image</h4>
          </label>
          <input
            type="file"
            accept="image/*"
            id="courseImage"
            className="file-input"
            onChange={handleImageChange}
          />
          {previewImage && <img src={previewImage} alt="Preview" className="preview-img" />}

          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />

          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />

          <label>Price *</label>
          <input
            className="title-price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            Update Course
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCourse;
