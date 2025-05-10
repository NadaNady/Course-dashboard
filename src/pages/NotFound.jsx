import "@/styles/NotFound.css"

export default function NotFound() {
  return (
    <div>
        <title>404 Page Not Found</title>
        <div className="error-container" >
            <h1 className='error-message'>404</h1> 
            <p className='text-center'> Oops! The page you're looking for is not here..</p>
            <a href="/home"> Go Back to Home </a>
        </div>
    </div>
  )
}
