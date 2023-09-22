import {useState, useEffect} from 'react';
import './App.css'; // Importing the CSS stylesheet
import SearchIcon from './search.svg' // Importing the search image
import MovieCard from './MovieCard';

// 2675ec00
// our API url
const API_KEY = 'http://www.omdbapi.com?apikey=2675ec00';
// we have to fetch the API as soon as the component loads Therefore
// we have to use a ReactJS Hook (useEffect) 

const App = () => {
    // creating a new state
    const [movies , setMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState([]);

    //  means it takes some times to fetch movies therefore using async below
    // we gonna search the movie by title thus it accept 'title' 
    const searchMovies = async (title) => {
        const response = await fetch(`${API_KEY}&s=${title}`) // this will call the API
        const data = await response.json(); // getting the data/respinse in json format

        setMovies(data.Search); // we only need the array therefore .Search
    }

    useEffect( () => {
        searchMovies('Spiderman');
    }, [])
    return (
        <div className='app'>
            <h1>Movie Kingdom</h1> 

            <div className='search'>
                <input placeholder='Search for movies'
                value= {searchTerm}
                onChange={ (e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={ () =>  searchMovies(searchTerm)}
                />
            </div>

            { 
            // If the length of the array is less than 0 means that there is no movie
                movies?.length > 0
                ? (
                <div className='container'>
                    {movies.map( (movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
                ) :

                ( // If movie array is empty then the above will be executed
                <div className='empty'>
                    <h2>No Movies Found</h2>
                </div>
                )
            }
        </div>
    );
}

export default App;