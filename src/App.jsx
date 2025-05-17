import axios from 'axios'
import './App.css'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap'
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';



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
      {/* <>
        <Container>
          <Row>
            <Col>1 of 1</Col>
          </Row>
        </Container>
      </> */}
      
        <form onSubmit={handleSubmit}>
          <label htmlFor="pokemon">Enter Pokemon Name: </label>
          <input type="text" id="pokemon" placeholder='Pokemon' onChange={handleChange}  />

        </form>

        {pokemonData.map((data) => {
          return (
            <>
              <Card style={{ width: '18rem' }} key={`card-${data.id}`}>
                <Card.Img variant="top" src={data.sprites.front_default} alt={data.name} />
                <Card.Body>
                  <Card.Title><h2>{pokeName}</h2></Card.Title>
                  <Card.Text>
                    <ul>
                      <li>Type: {pokemonType}</li>
                      <li>Height: {data.height}</li>
                      <li>Weight: {data.weight}</li>
                      <li>Base Experience: {data.base_experience}</li>
                      <li>Special Move: {data.moves[0].move.name}</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          )
        })}
           
        
      
      
    </>
  )
}

export default App
