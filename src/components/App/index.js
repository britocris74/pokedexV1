import React, {useState, useEffect} from 'react';
import { Container, Row } from 'reactstrap';

import PokemonCard from '../PokemonCard';
import Header from '../Header';
import CustomPagination from '../CustomPagination';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { fetchData } from '../../utilities/helpers';
import './styles.css';

const initialState =  {
  fetched: false,
  pagin: 0,
  minPagin: 0,
  maxPagin: 140,
  maxPokemon: 151,
  pokemons: [], 
  region: "kanto"
}

const useStyles = makeStyles((Theme) =>
  createStyles({
    progress: {
      margin: Theme.spacing(2),
    },
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    button: {
      margin: Theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }),
);

const App = () => {

  const [state, setState] = useState(initialState);
  const { fetched, pagin, maxPokemon, pokemons, region } = state;
  const classes = useStyles();

  const URL = `/?offset=${pagin}&limit=20`;

  useEffect(() => {
    const data = fetchData(URL)
    data.then(response =>
      setState({
        ...state,
        pokemons: response.results,
        fetching: false,
        fetched: true
      })
    )
  }, [pagin])

  const setRegion = (newPagin, newMinPagin, newMaxPagin, newMaxPokemon, newRegion ) => {
    setState({
      ...state,
      pagin: newPagin,
      region: newRegion,
      minPagin: newMinPagin,
      maxPagin: newMaxPagin,
      maxPokemon: newMaxPokemon
    })
  }

  return (
    <>
      <Header
        setRegion = { setRegion }
        currentRegion = { region }
      />
      <div className="app-container">
        { fetched ? 
        <Container>
          <Row>
            <Grid container justify="center" spacing={2}>
              {pokemons.map((pokemon, index) => (
                <Grid lg={3} md={3} sm={4} xs={6} item key={index} >
                  <PokemonCard 
                    url = { pokemon.url }
                    maxPokemon = { maxPokemon }
                  />
                </Grid >
              ))}
            </Grid> 
          </Row>

          <CustomPagination state={state} setState={setState} />

        </Container> :
        
        <div>
          <CircularProgress className={classes.progress} />
        </div>
      }
      </div>
    </>
  );
}

export default App;
