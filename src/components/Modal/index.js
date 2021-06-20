import React, {useState, useEffect} from 'react';
import { Row } from 'reactstrap';


import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import { fetchData } from '../../utilities/helpers';
import  './modalStyles.css';

const POKEMON_STATS = ['HP', 'Attack', 'Defense', 'SP-Attack', 'SP-Defense', 'Speed']


function ModalStats({ handleClose, open, currentPokemon }) {
		const URL = `-species/${currentPokemon.id}/`;
		const [ description, setDescription ] = useState({});

		const { name, id, img, types, height, weight, stats } = currentPokemon;

		useEffect(() => {
			const data = fetchData(URL)
			data.then(response =>
				setDescription(response.flavor_text_entries.find((entire) =>
						entire.language.name === "es"))
			)
		}, [currentPokemon])

		return (
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open}
				onClose={handleClose}
				>
				<div className="modalContainer">
					<div className="section1Container">
						<div className="pokemonContainer">
							<div className="tittleContainer">
								<h4 id="simple-modal-title">{id}. {name}</h4>
							</div>

							<div md={4} className="imgContainer">
								<img src={img} alt="" height="150" width="150" />
							</div>

							<div className="typesContainer">
								{types.map((type, index) => (
									<p key={index} className={type.type.name}>
										{type.type.name}
									</p>
								)) }
							</div>
						</div>
						<div className="descriptionContainer">
							<div className="descriptionText">
								<p className="description">
									{description.flavor_text}
								</p>
							</div>
							<div className="section2Container">
								<p className="height">
									Altura
									<br/>
									<span className="spanColor">
										{height / 10} m
									</span>
								</p>
								<p className="weight">
									Peso 
									<br/>
									<span className="spanColor"> 
										{weight / 10} kg
									</span> 
								</p>
							</div>
						</div>
					</div>
					<Row>
						<h4 className="tableTitle">
							Stats
						</h4>
            <Grid container justify="center" spacing={2}>
              {stats.map((el, index) => (
                <Grid sm={4} xs={6} item key={index} >
                  <div key={index} className={`stat-${el.stat.name}`}> 	
										<span className="stat-name">{POKEMON_STATS[index]}:</span>
										<span className="stat-base">{el.base_stat}</span>
									</div>
                </Grid >
              ))}
            </Grid> 
          </Row>
					<Button color="secondary" style={{display: 'block', margin: '15px auto 0'}} onClick={handleClose}>
						Close
					</Button>
				</div>
			</Modal>
		);
}

export default ModalStats;