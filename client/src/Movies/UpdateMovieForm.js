import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateMovieForm = props => {
    const { id } = useParams();
    const history = useHistory();
    const [movie, setMovie] = useState(initialMovie);

    //this get request will pre-populate the update form w/ info for selected movie
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res)        //res.data
                setMovie(res.data);
            })
            .catch(err => console.error(err));
    }, [id]);

    const changeHandler = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitEdit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log("updated:", res.data);
                props.setMovieList(res)
                history.push(`/Movies/${id}`);

            })
            
            .catch(err => console.error("Failed to update:", err))
    }


    return (
        <div className='update-movie-form'>
            <h2>Update A Movie</h2>
            <form onSubmit={handleSubmitEdit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Movie"
                    onChange={changeHandler}
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    placeholder="Director"
                    onChange={changeHandler}
                    value={movie.director}
                />
                <input
                    type="text"
                    name="metascore"
                    placeholder="Metascore"
                    onChange={changeHandler}
                    value={movie.metascore}
                />
                <input
                    type="text"
                    name="stars"
                    placeholder="Actors"
                    onChange={changeHandler}
                    value={movie.stars}
                />
                <button className="update-button" >
                    Update
                </button>
            </form>
        </div>
    )
}

export default UpdateMovieForm;