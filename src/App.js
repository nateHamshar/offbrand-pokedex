import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";

function App() {

  const [value, setValue] = useState("");
  const [pokeName, setPokeName] = useState("");
  const [pokeType, setPokeType] = useState("");
  const [pokePhoto, setPokePhoto] = useState("");
  const [pokePhotoShiny, setPokePhotoShiny] = useState("");
  const [pokeSearch, setPokeSearch] = useState("");

  let randomNumber = Math.floor(Math.random() * (898 + 1));

  const getRandomPokemon = () => {
    axios
    .get("https://pokeapi.co/api/v2/pokemon/" + randomNumber).then(
      (res) => {
        setValue(res);
    }).catch((error) => {
        console.log(error.message)
    })
    const searchBar = document.getElementById("search");
    searchBar.value = "";
    };
  
    const getPokemon = () => {
      axios
      .get("https://pokeapi.co/api/v2/pokemon/" + pokeSearch).then(
        (res) => {
          setValue(res);
      }).catch((e) => {
        alert("that's not a pokemon!");
        console.log(e);
      })
      const searchBar = document.getElementById("search");
      searchBar.value = "";
      };


    useEffect(() => {
      if(!value){
        return;
      } else{
        setPokeName(value.data.name);
        setPokeType(value.data.types[0].type.name);
        setPokePhoto(value.data.sprites.front_default);
        setPokePhotoShiny(value.data.sprites.front_shiny);
      }
      }, [value]);
    

  return (
    <div className="App">
      <div className="pokeApp">
      <div className="title">
         Offbrand Pokedex
      </div>
      <div className="searchbar">
        <input type="text" id="search" placeholder='search...' onChange={e => setPokeSearch(e.target.value.toLowerCase())} />
      </div>
      <div className="buttons">
         <button onClick={getRandomPokemon} className="btn b1">Random</button>
         <button onClick={getPokemon} className="btn b2" id="searchButton">Search</button>
      </div>
      <div className="pokeName">
         {pokeName}
      </div>
      <div className="pokeType">
         {pokeType}
      </div>
      <div className="grid">
      <div className="pokePhoto two">
        <label htmlFor="pokeImg">Default</label>
         <img src={pokePhoto} id="pokeImg" alt=""></img>
      </div>
      <div className="pokePhoto one">
        <label htmlFor="pokeImgShiny">Shiny</label>
        <img src={pokePhotoShiny} id="pokeImgShiny" alt=""></img>
      </div>
      </div>
      </div>
    </div>
  );
}

export default App;
