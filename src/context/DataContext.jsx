import { createContext,useEffect,useState } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch'

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  


  const { data, fetchError, isLoading } = useAxiosFetch('https://todolistapi-uqlz.onrender.com/posts');

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const reponse = await api.get('/posts');
  //       setPosts(reponse.data);
  //     }
  //     catch (err) {
  //       if (err.reponse) {
  //         console.log(err.reponse.data);
  //         console.log(err.reponse.status);
  //         console.log(err.reponse.header);
  //       } else {
  //         console.log(`Error:${err.message}`);
  //       }
        
  //     }
  //   }
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    setPosts(data)
  },[data])
  
 

    
    return (
        <DataContext.Provider value={{
            search,
            setSearch,
            fetchError,
            isLoading,
            searchResult,
            posts,
            setPosts,  
        }}>
            {children}
        </DataContext.Provider>
    )

}

export default DataContext;