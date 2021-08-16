import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddMembersComp(props) {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const add = async () => {
    let memberObj = {
      name: name,
      email: email,
      city: city,
    };

    const resp = await axios.post(
      "http://localhost:8000/api/members/",
      memberObj
    );

    props.history.push("/subscriptions");
  };

  const cancel = () => {
    props.history.push("/subscriptions");
  };

  return (
    <div>
      <h2>Add new Member</h2>
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
      <input type="button" value="Save" onClick={add} />
      <input type="button" value="Cancel" onClick={cancel} />
    </div>
  );
}
