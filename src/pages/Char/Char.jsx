import "./Char.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Comic from "../../components/Comic/Comic";

const Char = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { _id } = useParams();
  // console.log(_id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--n9gj5w2bwq52.code.run/character/" +
            _id,
        );
        // console.log("ici =>", response.data); // {thumbnail: {…}, comics: Array(12), _id: '5fcf91f4d8a2480017b91453', name: '3-D Man', description: '', …}
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="char-page">
      <div className="container">
        {isLoading ? (
          <h1>Chargement...</h1>
        ) : (
          <section>
            <h1>{data.name}</h1>
            <img
              src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
              alt="character image"
            />
            <p>{data.description}</p>
            {data.comics.map((comicId) => {
              // console.log(char);
              return <Comic comicId={comicId} key={comicId} />;
            })}
          </section>
        )}
      </div>
    </main>
  );
};

export default Char;
