import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditShowsComp(props) {
  const [name, setName] = useState("");

  const [genresStr, setGenresStr] = useState([]);
  const [image, setImage] = useState("");
  const [year, setYear] = useState("");

  useEffect(async () => {
    const resp = await axios.get(
      "http://localhost:8000/api/shows/" + props.match.params.id
    );
    setName(resp.data.name);
    setImage(resp.data.imageUrl);
    setYear(resp.data.premiered);

    let genStr = "";
    resp.data.genres?.forEach((gen, gIdx) => {
      if (gIdx) {
        genStr += ", ";
      }
      genStr += gen;
    });
    setGenresStr(genStr);
  }, []);

  const update = async () => {
    let showObj = {
      name: name,
      genres: genresStr.split(","),
      imageUrl: image,
      premiered: year,
    };

    const resp = await axios.put(
      "http://localhost:8000/api/shows/" + props.match.params.id,
      showObj
    );

    props.history.push("/showsMain");
  };

  const cancel = () => {
    props.history.push("/showsMain");
  };

  return (
    <div>
      <h2>{`Edit Show: ${name}`}</h2>
      <label htmlFor="name">Name : </label>
      <input
        style={{ width: "300px" }}
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <br />
      <label htmlFor="genres">Genres : </label>
      <input
        style={{ width: "300px" }}
        type="text"
        name="genres"
        value={genresStr}
        onChange={(e) => setGenresStr(e.target.value)}
      />{" "}
      <br />
      <label htmlFor="img">Image URL : </label>
      <input
        style={{ width: "500px" }}
        type="text"
        name="img"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />{" "}
      <br />
      <label htmlFor="year">Premiered : </label>
      <input
        style={{ width: "300px" }}
        type="text"
        name="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />{" "}
      <br />
      <input type="button" value="Update" onClick={update} />
      <input type="button" value="Cancel" onClick={cancel} />
    </div>
  );
}
