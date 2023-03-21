import React, { useEffect } from 'react'
import About from './Pages/About'
import Footer from './Pages/Footer'
import Header from './Pages/Header'
import Home from './Pages/Home'
import Missing from './Pages/Missing'
import Nav from './Pages/Nav'
import NewPost from './Pages/NewPost'
import PostPage from './Pages/PostPage'
import EditPost from './Pages/EditPost'
import useAxiosFetch from './hooks/useAxiosFetch'
import { Route, Routes } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'



const App = () => {

  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch('https://todolistapi-uqlz.onrender.com/posts');

  useEffect(() => {
    setPosts(data)
  },[data,setPosts])
  



  
  
  return (
    <>
      <div className='App'>
       
        <Header title="My Blog" />
        
        <Nav />
        
        <Routes>
          <Route path='/' element={<Home isLoading={isLoading} fetchError={fetchError} />} />
          <Route path='/post' element={<NewPost/>} />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Missing/>} />
          </Routes>
          
          <Footer />
          
        </div>
      
    </>
    
  )
}

export default App
