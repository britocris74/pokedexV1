import React, { useState } from 'react';

import ModalStats from '../Modal';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';

import { fetchData } from '../../utilities/helpers';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'sticky',
    top: 0,
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

const Header = ({ setRegion, currentRegion }) => {

  const [searchPokemon, setSearchPokemon] = useState({})
	const [openModal, setOpenModal] = useState(false)
  const [search, setSearch] = useState("");
  
  function handleChangeSearch(event) {
    setSearch(event.target.value)
  }

  function handleKeyDownSearch(event) {
    if(event.keyCode === 13) {

      const data = fetchData(`/${search.toLowerCase()}`, setSearchPokemon);
      data.then(response => {
        setSearchPokemon({...response, img: response.sprites.other['official-artwork'].front_default})
        setOpenModal(true);
      })
      .catch(() => alert("Ningun Pokemon coincide con tu busqueda"))
      setSearch("")
    }
  }

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{justifyContent: 'flex-end'}}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={search}
              placeholder="Name or number"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={handleKeyDownSearch }
              onChange={handleChangeSearch}
              
            />
          </div>
          <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          { currentRegion }
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={ () => { handleClose(); setRegion(0, 0, 140, 151, "kanto")} }>Kanto</MenuItem>
            <MenuItem onClick={ () => { handleClose(); setRegion(151, 151, 231, 251, "jhoto")} }>Jhoto</MenuItem>
            <MenuItem onClick={ () => { handleClose(); setRegion(251, 251, 371, 386, "hoenn")} }>Hoenn</MenuItem>
            <MenuItem onClick={ () => { handleClose(); setRegion(386, 386, 486, 494, "sinnoh")} }>Sinnoh</MenuItem>
            <MenuItem onClick={ () => { handleClose(); setRegion(494, 494, 634, 649, "Teselia")} }>Teselia</MenuItem>
            <MenuItem onClick={ () => { handleClose(); setRegion(649, 649, 709, 721, "kalos")} }>Kalos</MenuItem>
            <MenuItem onClick={ () => { handleClose(); setRegion(721, 721, 801, 807, "alola")} }>Alola</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {
        openModal &&
          <ModalStats
            open= { openModal }
            currentPokemon={searchPokemon}
            handleClose = { () => setOpenModal(false) } 
          />
      }
    </div>
  );
}

export default Header;
