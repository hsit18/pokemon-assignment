import React, {useMemo} from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Pokemon } from './useGetPokemons';

export type PokemonDimension = {
    minimum: number;
    maximum: number;
  
}
export type PokemonDetails = Pokemon & {
  weight: PokemonDimension;
  height: PokemonDimension;
  classification: string;
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  resistant:string[];
  weaknesses:string[];
};

export const GET_POKEMON_DETAILS = gql`
query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
  }
}
`;



export const useGetPokemonDetail = (id?: string) => {
  if(!id) {
    return {
      pokemon: null,
      loading: true
    };
  }
  const { data, ...queryRes } = useQuery(GET_POKEMON_DETAILS, {
    variables:{
    id,
  }
  });
  
  const pokemon: PokemonDetails = useMemo(() => data?.pokemon || [], [data]);

  return {
    pokemon,
    ...queryRes,
  };
};