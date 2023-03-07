import React, { useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { Link, useLocation, Outlet } from "react-router-dom";

export const PokemonList = () => {
  const classes = useStyles();
  const location = useLocation();
  const { pokemons, loading } = useGetPokemons();
  const [search, setSearch] = useState('');

  const getPokemons = useCallback(() => {
    if (!search) {
      return pokemons;
    }
    return pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, pokemons]) || [];

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className={classes.root}>
      <h2>Pokemon List</h2>
      <input type="text" placeholder='Search Pokemon...' className={classes.searchBar} onChange={(e) => { setSearch(e.target.value) }} />
      <div className={classes.list}>
        {getPokemons().map((pkmn) => (
          <Link className={classes.link} key={pkmn.id} to={`/pokemon/detail/${pkmn.id}`} state={{ background: location }}>

            <div className={classes.card}>
              <img width="300" src={pkmn.image}></img>
              <div className={classes.title}>{pkmn.number}. {pkmn.name}</div>
              <div className={classes.tags}>{pkmn.types.map(t => <span className={classes.tag} key={t}>{t}</span>)}</div>
            </div>
          </Link>

        ))}
      </div>
      <Outlet />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      padding: '12px',
      boxSizing: 'border-box',
    },
    link: {
      color: '#fff',
      textDecoration: 'none'
    },
    list: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridGap: '16px'
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
      height: '350px',
      border: '2px solid #4cdb97',
      borderRadius: '4px',
      '&:hover': {
        borderColor: '#e4177e',
        transform: 'scale(1.02)'
      },
      '& img': {
        width:'100%',
        height: '78%'
      }
    },
    searchBar: {
      borderRadius: '8px',
      padding: '0 20px',
      width: '40%',
      height: '40px',
      color: 'black',
      marginBottom: '3%'
    },
    title: {
      padding: '8px',
      fontWeight: '500'
    },
    tags: {
      display:'flex'
    },
    tag: {
      padding: '4px',
      background: '#2a70a8',
      borderRadius: '8px',
      margin: '4px'
    }
  },
  { name: 'PokemonList' }
);
