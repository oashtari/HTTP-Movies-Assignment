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
    console.log('test props', props);
    useEffect(() => {
        // const selectedMovie = props.movies.find(movie => {
        //     return `${movie.id}` === props.match.params.id;
        // });
        // console.log('testing props', this.props);
        // if (selectedMovie) {
        //     setMovie(selectedMovie)
        // }
    }, [props.movies, props.match.params.id])

    const changeHandler = e => {
        e.persist();

        let value = e.target.value;

        setMovie({
            ...movie,
            [e.target.value]: value
        })
    }


    const handleSubmit = e => {
        e.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => console.log(res))
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