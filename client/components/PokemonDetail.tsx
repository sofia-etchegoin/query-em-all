import { useParams } from 'react-router-dom'
import { Pokemon } from '../../models/pokemon.ts'
import { useQuery } from '@tanstack/react-query'
import { fetchPokemonByNameApi } from '../apis/pokemon.ts'
import LoadingSpinner from './LoadingSpinner.tsx'

export default function PokemonDetail() {
  const { name } = useParams()

  const {
    data: pokemon,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['pokemon'],
    queryFn: () => fetchPokemonByNameApi(name),
  })

  if (isError) {
    return <p>Whoops! Error fetching Pokemon details</p>
  }

  if (!pokemon || isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <h1>{name}</h1>
      <h2>Types: </h2>
      {pokemon.types.map(({ type, slot }) => (
        <p key={slot}>{type.name}</p>
      ))}
      <img
        src={pokemon.sprites.front_default}
        alt={`Front Default Sprite for ${pokemon.name}`}
      />
      <section>
        <h2>Abilities: </h2>
        {pokemon.abilities.map(({ ability, slot }) => (
          <p key={slot}>{ability.name}</p>
        ))}
      </section>
      <section>
        <h2>Moves: </h2>
        {pokemon.moves.map(({ move }) => (
          <p key={move.name}>{move.name}</p>
        ))}
      </section>
    </div>
  )
}
