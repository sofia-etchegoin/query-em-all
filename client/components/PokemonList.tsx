import { useQuery } from '@tanstack/react-query'
import { fetchPokemonGenerationApi } from '../apis/pokemon'
import LoadingSpinner from './LoadingSpinner'
import { Link } from 'react-router-dom'

export default function PokemonList() {
  const {
    data: generation,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['generation'],

    //fetchPokemonGenerationApi accepts a generation parament, which is a number between 1-9
    queryFn: () => fetchPokemonGenerationApi(9),
  })

  if (isError) {
    return <p>Whoops! Error fetching generation data.</p>
  }

  if (!generation || isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <h2>Pokémon in {generation.region}:</h2>
      <ul>
        {generation.pokemon.map((p) => (
          <li key={p.id}>
            <Link to={`pokemon/${p.name}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
