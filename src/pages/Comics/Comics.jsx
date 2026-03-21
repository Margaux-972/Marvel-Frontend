import "./Comics.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";

const Comics = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  const existingFavorite = async (com) => {
    try {
      const token = Cookies.get("userToken");

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

      setFavorites(response.data);
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
  }, [title, page]);

  const totalPages = data ? Math.ceil(data.count / data.limit) : 0;
  // const token =

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
                      className="favorite-button"
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
