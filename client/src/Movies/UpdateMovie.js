import React, {useState, useEffect} from 'react';
import axios from "axios";


export default function UpdateMovie(props) {
  const id = props.match.params.id;

  const [newData, setNewData] = useState({
    title: "",
    director: "",
    metascore:  "",
    stars: "",
  });

  useEffect(()=>{
    axios
    .get(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      // console.log("This is the server response",res);
      const movie = res.data;
      const title = movie.title;
      const director = movie.director;
      const metascore = movie.metascore;
      let stars = "";
      movie.stars.forEach(e => {
        stars = stars + e + ", ";
      });
      setNewData({
        title: title,
        director: director,
        metascore: metascore,
        stars: stars,
      })

    })
    .catch(err => console.log(err.response));



  },[])

  function changeHandler(event) {
      // console.log(`This is the field: ${event.target.name} and this is the value: ${event.target.value}`);
      setNewData( { 
       ...newData, 
       [event.target.name]: event.target.value, 
    });
  }

  function submitForm(event) {
    event.preventDefault();
    const starsArray =  newData.stars.split(', ');
    if(starsArray[starsArray.length-1]==="") {
      starsArray.pop();
    }
    // console.log("Here is the array from string",starsArray);
    const newMovie = {
      id: id,
      title: newData.title,
      director: newData.director,
      metascore: parseInt(newData.metascore),
      stars: starsArray,
    };
    // console.log("Here is the newMovie object",newMovie);
    axios
    .put(`http://localhost:5000/api/movies/${id}`,newMovie)
    .then(res => {
      // console.log("This is the server response",res);
      setNewData({
        title: "",
        director: "",
        metascore:  "",
        stars: "",
      });
      props.history.push('/');
    })
    .catch(err => console.log(err.response));
  };
    

  return ( <>

    <h2 className="updateMovieTitle">Update Movie</h2>

    <form className="formContainer" onSubmit={submitForm}> 

      <div className="formInputContainer">
        <label htmlFor="title">Title</label>
        <input className="input-area"
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          onChange={changeHandler}
          value={newData.title}         
        />
      </div>

      <div className="formInputContainer">
        <label htmlFor="director">Director</label>
        <input className="input-area"
          type="text"
          name="director"
          id="director"
          placeholder="Director"
          onChange={changeHandler}
          value={newData.director}         
        />
      </div>
      
      <div className="formInputContainer">
        <label htmlFor="metascore">Metascore</label>
        <input className="input-area"
          type="text"
          name="metascore"
          id="metascore"
          placeholder="Metascore"
          onChange={changeHandler}
          value={newData.metascore}         
        />
      </div>

      <div className="formInputContainer">
        <label htmlFor="stars">Comma seperated list of stars</label>
        <input className="input-area"
          type="text"
          name="stars"
          id="stars"
          placeholder="Stars"
          onChange={changeHandler}
          value={newData.stars}         
        />
      </div>


        

      <button className="updateMovieBtn" type="submit">Update Movie</button>
    </form>

    {/* This is for debugging purposes only
    remove for production */}
    {/* <p>{`Title:${newData.title}`}</p>
    <p>{`Director:${newData.director}`}</p>
    <p>{`Metascore:${newData.metascore}`}</p>
    <p>{`Stars:${newData.stars}`}</p> */}


  </> );
}