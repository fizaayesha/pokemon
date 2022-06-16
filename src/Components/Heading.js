import React, { useState } from "react";
import "./style.css";
import { SearchTwoTone } from "@material-ui/icons";
import logo from "../Assets/pokelogo.png";
import axios from "axios";
function Heading({ title, span }) {
  const [pokie, setPokie] = useState("");
  const [chosen, setChosen] = useState(false);
  const [pokieinfo, setPokieinfo] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defence: "",
    type: "",
  });
  const searchPokie = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokie}`).then((response) => {
      console.log(response);
      setPokieinfo({
        name: pokie,
        species: response.data.species.name,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defence: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      });
      setChosen(true);
    });
  };
  return (
    <div className="head">
      <img src={logo} alt="logo" />
      <h2>
        {title}
        <b>
          <span>{span}</span>
        </b>
      </h2>
      <div className="search-bar">
        <input
          className="search-item"
          placeholder="Search"
          onChange={(event) => {
            setPokie(event.target.value);
          }}
        />
        <SearchTwoTone onClick={searchPokie} />
      </div>
      <div className="display">
        <div className="box">
          {!chosen ? (
            <p>Please Choose a Pokemon</p>
          ) : (
            <>
              <img src={pokieinfo.img} alt="" />
            <hr></hr>
              <p> Name: {pokieinfo.name}</p>
            <hr></hr>
              <p> Species: {pokieinfo.species}</p>
            <hr></hr>
              <p> Hp: {pokieinfo.hp}</p>
            <hr></hr>
              <p> Attack: {pokieinfo.attack}</p>
            <hr></hr>
              <p> Defence: {pokieinfo.defence}</p>
            <hr></hr>
              <p> Type: {pokieinfo.type}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Heading;
