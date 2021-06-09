import React, { useState, useEffect} from "react";
import axios from "axios"

function PacificTheatres(props) {

  const [Movies, setMovies] = useState([])
  const [SearchField, setSearchField] = useState('')
  
  let {showtimes} = props.location
  let showtimes_data = showtimes&&showtimes.id
  let showtimes_ids =  []
  for (let key in showtimes_data) {
    showtimes_ids.push(key)
}

  useEffect(async () => {
    const movies = await axios(
      'http://localhost:3001/movies',
    );
    if (movies){
      setMovies([...movies.data]);
    }
  }, []);

  const handleFilter = (event) => {
    setSearchField(event.target.value)
    const filteredMovies = Movies.filter(movie => {
      return movie.title.toLowerCase().includes(SearchField.toLowerCase())
      }) 
      setMovies(filteredMovies)
  }
  
  return (
    <div>
      <div className="search">
        <input placeholder="search movies at Arclight" onChange={handleFilter}/>
      </div>
        {
          Movies&&Movies.map((movie,index) => {
            for(let i=0;i<showtimes_ids.length;i++){
              if(showtimes_ids[i] == movie.id){             
                return <div className="movieCard">
                        <div className="movieCard__img">
                          <img src={movie.poster} alt="movie photos"/>
                        </div>
                        <div className="movieCard__info">
                          <strong>{movie.title}</strong>(<span>{movie.rating}</span>)
                          <p>{ (showtimes_data[showtimes_ids[i]]).join(", ") }</p>
                        </div>
                       
                      </div>
              }
            }
          }) 
        }
    </div>
  );


}

export default PacificTheatres;
