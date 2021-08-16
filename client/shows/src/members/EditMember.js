import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditMemberComp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  useEffect(async () => {
    const resp = await axios.get(
      "http://localhost:8000/api/members/" + props.match.params.id
    );
    setName(resp.data[0].name);
    setEmail(resp.data[0].email);
    setCity(resp.data[0].city);
  }, []);

  const update = async () => {
    let memberObj = {
      name: name,
      email: email,
      city: city,
    };

    const resp = await axios.put(
      "http://localhost:8000/api/members/" + props.match.params.id,
      memberObj
    );

    props.history.push("/subscriptions");
  };

  const cancel = () => {
    props.history.push("/subscriptions");
  };

  return (
    <div>
      <h2>{`Edit Member: ${name}`}</h2>
      <label htmlFor="name">Name : </label>
      <input
        style={{ width: "300px" }}
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <br />
      <label htmlFor="email">Email : </label>
      <input
        style={{ width: "300px" }}
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      <br />
      <label htmlFor="city">City : </label>
      <input
        style={{ width: "300px" }}
        type="text"
        name="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />{" "}
      <br />
      <input type="button" value="Update" onClick={update} />
      <input type="button" value="Cancel" onClick={cancel} />
    </div>
  );
}
