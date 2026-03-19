import "./Comics.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Comics = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--n9gj5w2bwq52.code.run/comics",
        );
        console.log("ici =>", response.data); // {count: 47397, limit: 100, results: Array(100)}
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="comics-page">
      <div className="container">
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <section>
            <h1>Je suis sur la page Comics</h1>

            {data.results.map((com, index) => {
              // console.log(char.name); // Aaron Stack
              // console.log(char._id); // 5fcf9226d8a2480017b914b6

              return (
                <article key={index + com.title}>
                  <img
                    src={`${com.thumbnail.path}/portrait_xlarge.${com.thumbnail.extension}`}
                    alt="character image"
                  />
                  <h2>{com.title}</h2>
                  <p>{com.description}</p>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
};

export default Comics;
