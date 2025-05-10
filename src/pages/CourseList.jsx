import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import toast from 'react-hot-toast';
import '@/styles/CourseList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchCourse, setSearchCourse] = useState('');


  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem('userLoggedIn')) || false;
    if(!isLogged) {
      navigate('/courses');
    }
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
  }, [navigate]);

  
  let filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchCourse.toLowerCase())
  );

  const handleDelete = (id) => {
    const updatedCourses = courses.filter(course => course.id !== id);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
    toast.success('Course Deleted Successfully');
  };

  return (
    <>
      <Header />
      <div className='courseList'>
        <div className="course-controls">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            type="text"
            placeholder="Search Course..."
            value={searchCourse}
            onChange={(e) => setSearchCourse(e.target.value)}
            className="search-input"
          />
        </div>


        <div className='course-cards'>
          {filteredCourses.map((course) => (
            <div key={course.id}>
              <CourseCard
              course={course}
              handleDelete={handleDelete} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default CourseList;
