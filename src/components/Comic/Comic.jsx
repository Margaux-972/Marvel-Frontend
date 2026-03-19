import "./Comic.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Comic = ({ comicId }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //   const { _id } = useParams();
  //   console.log(comicId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--n9gj5w2bwq52.code.run/comic/" +
            comicId,
        );
        // console.log("ici =>", response.data); // {thumbnail: {…}, comics: Array(12), _id: '5fcf91f4d8a2480017b91453', name: '3-D Man', description: '', …}
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [comicId]);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <div key={comicId}>
      {/* {console.log("data", data)} */}
      {/* {console.log("data.thumbnail", data.thumbnail)} */}
      {data.thumbnail && (
        <img
          src={`${data.thumbnail.path}/portrait_xlarge.${data.thumbnail.extension}`}
          alt="comic cover"
        />
      )}
      <h2>{data.title}</h2>
    </div>
  );
};

export default Comic;
