import React from "react";
import "./Hero.css";
import conan from "../../assets/img/hero-conan.png"

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-title">
        <h2 className="hero-title-h2">Unleash Your Inner Otaku.</h2>
        <p>
          Dive into the world of anime, discover classics, explore hidden gems,
          and keep track of your favorites.
        </p>
      </div>
      <div className="search">
        <input type="text" placeholder="Search for your favourite Anime" />
        <div className="search-btns">
          <button>Search</button>
          <button>Random</button>
        </div>
      </div>
      <img src={conan} alt="Conan" className="hero-conan"/>
    </section>
  );
};

export default Hero;
