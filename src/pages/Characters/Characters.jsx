import "./Characters.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);

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
          placeholder="Search"
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
