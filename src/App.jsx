import axios from 'axios'
import './App.css'
import { useState } from 'react'



function App() {
  const [pokemon, setPokemon] = useState('Pikachu')
  const [pokemonData, setPokemonData] = useState([])
  const [pokemonType, setPokemonType] = useState([])
  
  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const response = await axios.get(url)
      toArray.push(response.data)
      setPokemonType(response.data.types[0].type.name)
      setPokemonData(toArray)
      console.log(response)
    } catch (e) {
      console.error(e)
    }
  }

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase())
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    getPokemon()
  }

  let pokeName = pokemon.charAt(0).toUpperCase() + pokemon.slice(1)


  return (
    <>
      <h1>Pokedex</h1>
      <div className="card">

        <form onSubmit={handleSubmit}>
          <label htmlFor="pokemon">Enter Pokemon Name: </label>
          <input type="text" id="pokemon" placeholder='Pokemon' onChange={handleChange}  />

        </form>

        {pokemonData.map((data) => {
            return (
            <div className="card" key={data.id}>
              <h2>{pokeName}</h2>
              <img src={data.sprites.front_default} alt={data.name} />
              <ul>
                <li>Type: {pokemonType}</li>
                <li>Height: {data.height}</li>
                <li>Weight: {data.weight}</li>
                <li>Base Experience: {data.base_experience}</li>
                <li>Moves:</li>
              </ul>
            </div>
            )
        })}

        
        
      </div>
      
    </>
  )
}

export default App
