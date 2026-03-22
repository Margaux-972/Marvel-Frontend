import "./Characters.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";

const Characters = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const existingFavorite = async (char) => {
    try {
      const token = Cookies.get("userToken");

      const response = await axios.post(
        "https://site--marvel-backend--n9gj5w2bwq52.code.run/user/favorites/characters",
        {
          character: {
            _id: char._id,
            name: char.name,
            thumbnail: char.thumbnail,
          },
        },
        {
          headers: {
            authorization: token,
          },
        },
      );

      const favIds = response.data.map((item) => item._id);
      setFavorites(favIds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://site--marvel-backend--n9gj5w2bwq52.code.run/characters?page=${page}`;

        if (name) {
          url += `&name=${name}`;
        }

        const response = await axios.get(url);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [name, page]);

  const totalPages = data ? Math.ceil(data.count / data.limit) : 0;

  return (
    <main className="characters-page">
      <div className="container">
        <h1>Marvel Characters</h1>
        <input
          type="text"
          placeholder="Search character"
          value={name}
          id="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <section>
            <div className="card">
              {data.results.map((char, index) => {
                // console.log(char.name); // Aaron Stack
                // console.log(char._id); // 5fcf9226d8a2480017b914b6

                return (
                  <article key={index + char.name}>
                    <Link to={"/character/" + char._id}>
                      <img
                        src={`${char.thumbnail.path}/portrait_xlarge.${char.thumbnail.extension}`}
                        alt="character image"
                      />

                      <h2>{char.name}</h2>
                      <p>{char.description}</p>
                    </Link>
                    <button
                      className={`favorite-button ${
                        favorites.includes(char._id) ? "active" : ""
                      }`}
                      onClick={() => {
                        existingFavorite(char);
                      }}
                    >
                      <FaRegHeart />
                    </button>
                  </article>
                );
              })}
            </div>
            <div className="pagination">
              <button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
              >
                ⬅
              </button>

              <span>
                Page {page} / {totalPages}
              </span>

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === totalPages}
              >
                ➡
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Characters;
