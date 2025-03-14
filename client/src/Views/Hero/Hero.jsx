import React, { useEffect, useState } from "react";
import "./Hero.css";
import conan from "../../assets/img/hero-conan.png";
import { useNavigate } from "react-router";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.JIKAN_BASE_URL || "https://api.jikan.moe/v4";

  // Fetch search suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(`${baseUrl}/anime?q=${searchTerm}&limit=5`);
        const data = await res.json();
        setSuggestions(data.data.map((a) => a.title_english));
      } catch (error) {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [searchTerm]);

  // Navigate to the AnimeDisplayPage
  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  // Fetch and display random anime
  const handleRandomAnime = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/random/anime`);
      if (!res.ok) throw new Error("Failed to fetch random anime");
      const data = await res.json();
      const randomAnimeTitle = data.data.title;

      navigate(`search/${encodeURIComponent(randomAnimeTitle)}`);
    } catch (error) {
      console.error("Error fetching random anime", error.message);
    } finally {
      setLoading(false);
    }
  };

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
        <input
          name="search"
          type="text"
          placeholder="Search for your favourite Anime"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((title, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setSearchTerm(title);
                    setSuggestions([]);
                    navigate(`/search/${encodeURIComponent(title)}`);
                  }}
                >
                  {title}
                </li>
              );
            })}
          </ul>
        )}
        <div className="search-btns">
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
          <button onClick={handleRandomAnime} disabled={loading}>
            {loading ? "Loading..." : "Random"}
          </button>
        </div>
      </div>
      <img src={conan} alt="Conan" className="hero-conan" />
    </section>
  );
};

export default Hero;
