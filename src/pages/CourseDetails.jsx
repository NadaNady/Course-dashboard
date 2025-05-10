import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import '@/styles/CourseDetails.css';
import '@/styles/CardComponent.css';

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const courses = JSON.parse(localStorage.getItem('courses')) || [];
        const courseData = courses.find(course => course.id === parseInt(id));

        if (courseData) {
            setCourse(courseData);
            setIsLoading(false);
        } else {
            navigate('/courses');
        }
    }, [id, navigate]);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="course-details-container">
                <div className="course-image">
                    <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
                </div>
                <div className="course-info">
                    <h1 className="course-title">{course.name}</h1>
                    <p className="course-description">{course.description}</p>
                    <div className="course-meta">
                        <p><strong>Price:</strong> {course.price}</p>
                        <p><strong>Start Date:</strong> {course.startDate}</p>
                        <p><strong>End Date:</strong> {course.endDate}</p>
                    </div>
                    <div className="course-actions">
                        <Link to={`/courses/edit/${course.id}`}>Edit</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseDetails;
