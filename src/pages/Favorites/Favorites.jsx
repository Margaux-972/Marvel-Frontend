import "./Favorites.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Favorites = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState({
    comics: [],
    characters: [],
  });

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--n9gj5w2bwq52.code.run/user",
          {
            headers: {
              authorization: token,
            },
          },
        );

        setFavorites(response.data.favorites);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchFavorites();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  return (
    <main className="favorites-page">
      <div className="container">
        <h1>Mes favoris</h1>
        {!token ? (
          <h2>Connecte-toi pour voir tes favoris</h2>
        ) : isLoading ? (
          <p>Chargement...</p>
        ) : favorites.comics.length === 0 &&
          favorites.characters.length === 0 ? (
          <h2>Aucun favori pour le moment</h2>
        ) : (
          <>
            <h2>Comics</h2>
            <div className="card">
              {favorites.comics.map((comic) => (
                <article key={comic._id}>
                  <Link to={`/comic/${comic._id}`}>
                    <img
                      src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                      alt={comic.title}
                    />
                    <h3>{comic.title}</h3>
                  </Link>
                </article>
              ))}
            </div>

            <h2>Characters</h2>
            <div className="card">
              {favorites.characters.map((char) => (
                <article key={char._id}>
                  <Link to={`/character/${char._id}`}>
                    <img
                      src={`${char.thumbnail.path}/portrait_xlarge.${char.thumbnail.extension}`}
                      alt={char.name}
                    />
                    <h3>{char.name}</h3>
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Favorites;
