import { Link } from 'react-router-dom'
import "@/styles/CardComponent.css"

const CourseCard = ({ course, handleDelete }) => {
  return (
    <div className='course-card'>
      <Link handleDelete={handleDelete} to={`/courses/details/${course.id}`} className='course-card-link'><img src={course.thumbnail} alt={course.name} />
        <h4>{course.name}</h4>
        <p>{course.description}</p>
        <p>Price: {course.price}</p>
        <p>Start Date: {course.startDate}</p>
        <p>End Date: {course.endDate}</p>
      </Link>
      <div className="course-actions">
        <Link to={`/courses/edit/${course.id}`}>Edit</Link>
        <button onClick={() => handleDelete(course.id)}>Delete</button>
      </div>
    </div>
  )
}

export default CourseCard
