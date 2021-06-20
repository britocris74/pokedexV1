import React, { useState, useEffect } from 'react';
import ModalStats from '../Modal';
import './styles.css';

const PokemonCard = ({ url, maxPokemon }) => {

	const [pokemon, setPokemon] = useState({});
	const [openModal,setOpenModal] = useState(false)

	useEffect(() => {
		fetch(url)
		.then(res => res.json())
		.then(response =>
			setPokemon(
				{...response, img: response.sprites.other['official-artwork'].front_default },
			)
		)
	}, [url])

	return (
		<>
			{ (pokemon.id <= maxPokemon) && (
				<div className="card-container" onClick={() => setOpenModal(true)}>
					<div className="card-media">
						<img className="card-img" alt={pokemon.name} src={pokemon.img}></img>
					</div>
					<div className="card-context">
						<span className="card-id">{pokemon.id}.</span>
						<p className="card--title">{pokemon.name}</p>
					</div>
				</div>
			)}

			{
			openModal &&	
				<ModalStats
					className="modal"
					open = { openModal }
					handleClose = { () => setOpenModal(false) } 
					currentPokemon = { pokemon } 
					>
				</ModalStats>
			}
		</>
	)
}

export default PokemonCard;
