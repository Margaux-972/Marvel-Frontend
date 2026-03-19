import "./Characters.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(useParams()); // { id : "69b178197659fbfd4f9ebe26" }
  // destructuring direct :
  // const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--n9gj5w2bwq52.code.run/characters",
        );
        // console.log("ici =>", response.data); // {count: 1493, limit: 100, results: Array(100)}
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="characters-page">
      <div className="container">
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <section>
            <h1>Je suis sur la page Characters</h1>

            {data.results.map((char, index) => {
              // console.log(char.name); // Aaron Stack
              // console.log(char._id); // 5fcf9226d8a2480017b914b6

              return (
                <article key={index + char.name}>
                  <Link to={"/character/" + char._id}>
                    <h2>{char.name}</h2>
                    <img
                      src={`${char.thumbnail.path}/portrait_xlarge.${char.thumbnail.extension}`}
                      alt="character image"
                    />
                    <p>{char.description}</p>
                  </Link>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
};

export default Characters;
