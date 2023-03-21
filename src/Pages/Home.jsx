import React from 'react'
import Feed from './Feed'
import { useStoreState } from 'easy-peasy'

const Home = ({isLoading,fetchError}) => {
  
  const searchResult = useStoreState((state) => state.searchResult);

  return (
    
      <main className='Home'>
        
      {isLoading && <p className='statusMsg'>Loading Posts...</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{ color: "red" }}>{fetchError}</p>}
      {!isLoading && !fetchError && (searchResult.length? <Feed posts={searchResult} /> : 
      <p className='statusMsg'>No Post to Display.</p>
      )}
    
    {/* {posts.length ? ( */}
  {/* //     <Feed posts={posts} />
  //  ) :
  //    <p style={{ marginTop: "2rem" }}>
  //      No Posts to Display.
  //    </p>
     
  //  } */}
      
    </main>
    
      
   
  )
}

export default Home
