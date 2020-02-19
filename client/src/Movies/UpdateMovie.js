import React, { useState, useEffect } from 'react';
import axios from 'axios';

const emptyMovie = {
    title: '',
    director: '',
    metascore: '',
    actors: []

}

const UpdateMovie = props => {
    const [movie, setMovie] = useState(emptyMovie);

    useEffect(() => {

        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err))
        // const selectedMovie = props.movies.find(movie => {
        //     return `${movie.id}` === props.match.params.id;
        // });
        // console.log('testing props', this.props);
        // if (selectedMovie) {
        //     setMovie(selectedMovie)
        // }
    }, [props.match.params.id])

    console.log('test if movie is updated', movie);

    const changeHandler = e => {
        // e.persist();
        let value = e.target.value;

        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }


    const handleSubmit = e => {
        e.preventDefault();
        const updatedMovie = movie;

        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, updatedMovie)
            .then(res => {
                props.history.push("/")
            })
            .catch(err => console.error(err))

    }

    return (
        <div>
            <h2>Update Movie:</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='Movie Title'
                    value={movie.title}
                />

                <input
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='Director'
                    value={movie.director}
                />

                <input
                    type='text'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='Metascore of Movie'
                    value={movie.metascore}
                />

                <input
                    type='text'
                    name='actors'
                    onChange={changeHandler}
                    placeholder='Stars of the Movie'
                    value={movie.stars}
                />
                <button>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie;