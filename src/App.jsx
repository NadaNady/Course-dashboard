import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import CourseList from "@/pages/CourseList"
import { Toaster } from 'react-hot-toast';
import AddCourse from '@/components/AddCourse';
import EditCourse from '@/components/EditCourse';
import CourseDetails from '@/pages/CourseDetails';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
      const userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')) || false;
      console.log("Is User Logged In:", userLoggedIn);
      setIsLogged(userLoggedIn);
  }, []); 

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/courses" element={isLogged ? <CourseList /> : <Navigate to="/"/>} />
        <Route path="/courses/new" element={<AddCourse />} />
        <Route path="/courses/edit/:id" element={<EditCourse />} />
        <Route path="/courses/details/:id" element={<CourseDetails />} />
      </Routes>
      <Toaster 
      position="top-center"
      toastOptions={{
        style: {
        borderRadius: '8px',
        background: '#333',
        color: '#fff',
        fontSize: '1.1rem',
        padding: '12px 24px',
        minWidth: '250px',
        },
        }}
      />
    </>
  )
}

export default App
