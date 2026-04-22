import "./Comics.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import ScrollTopButton from "../../components/ScrollTopButton/ScrollTopButton";

const Comics = () => {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [data, setData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = Cookies.get("userToken");

  const existingFavorite = async (com) => {
    try {
      const response = await axios.post(
        "https://site--marvel-backend--n9gj5w2bwq52.code.run/user/favorites/comics",
        {
          comic: {
            _id: com._id,
            title: com.title,
            thumbnail: com.thumbnail,
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

      const comics = response.data.favorites?.comics || [];

      const favIds = comics.map((com) => com._id);

      setFavorites(favIds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://site--marvel-backend--n9gj5w2bwq52.code.run/comics?page=${page}`;

        if (title) {
          url += `&title=${title}`;
        }

        const response = await axios.get(url);
        // console.log("ici =>", response.data); // {count: 47397, limit: 100, results: Array(100)}
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    if (token) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [title, page, token]);

  const totalPages = data ? Math.ceil(data.count / data.limit) : 0;

  return (
    <main className="comics-page">
      <div className="container">
        <h1>Marvel Comics</h1>
        <input
          type="text"
          placeholder="Search comic"
          value={title}
          id="title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <section>
            <ScrollTopButton />
            <div className="card">
              {data.results.map((com, index) => {
                return (
                  <article key={index + com.title}>
                    <Link to={"/comic/" + com._id}>
                      <img
                        src={`${com.thumbnail.path}/portrait_xlarge.${com.thumbnail.extension}`}
                        alt="comic cover"
                      />
                      <h2>{com.title}</h2>
                      <p>{com.description}</p>
                    </Link>
                    <button
                      data-tooltip={
                        !token ? "Connecte-toi pour ajouter aux favoris" : ""
                      }
                      className={`favorite-button ${
                        favorites.includes(com._id) ? "active" : ""
                      }`}
                      onClick={() => {
                        existingFavorite(com);
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

export default Comics;
