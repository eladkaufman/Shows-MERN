import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllShowsComp(props) {
  const [shows, setShows] = useState([]);
  const [showsChanged, setShowsChanged] = useState(true);
  const [showFilter, setShowFilter] = useState("");

  useEffect(async () => {
    let resp;
    if (props.match.params.id) {
      resp = await axios.get(
        "http://localhost:8000/api/shows/" + props.match.params.id
      );
    } else {
      resp = await axios.get("http://localhost:8000/api/shows/");
    }
    sessionStorage.setItem("reload", "false");
    setShows(resp.data);
  }, [showsChanged, props.match.params.id, sessionStorage["reload"]]);

  const filterShows = () => {
    console.log(showFilter);
    if (showFilter.length > 0) {
      setShows(
        shows.filter((sh) =>
          sh.name.toLowerCase().includes(showFilter.toLowerCase())
        )
      );
      setShowFilter("");
    }
  };
  const deleteShow = async (id) => {
    await axios.delete("http://localhost:8000/api/shows/" + id);

    if (props.match.params.id) {
      props.history.push("/showsMain");
    }
    setShowsChanged(!showsChanged);
  };
  return (
    <div>
      <label htmlFor="find">Find Show : </label>
      <input
        type="text"
        name="find"
        value={showFilter}
        onChange={(e) => setShowFilter(e.target.value)}
      />
      <input type="button" value="Find" onClick={filterShows} />
      {/* <Link to={`/editShow/${show._id}`}>
          <input type="button" value="Find" />
        </Link> */}
      {shows.map((show, idx) => {
        return (
          <div
            key={idx}
            className="showCard"
            style={{
              border: " 3px solid black",
              width: "500px",
              margin: "2vh",
              padding: "1vh",
            }}
          >
            <h2>
              {show.name}, {show.premiered}
            </h2>

            <p>
              genres:
              {show.genres?.map((gen, gIdx) => {
                return (
                  <span key={gIdx + gen}>
                    {(gIdx ? "," : "") + ` "${gen}"`}{" "}
                  </span>
                );
              })}
            </p>
            <br />
            <div style={{ display: "flex" }}>
              <img src={show.imageUrl} alt="show's cover" />
              <div
                className="subscriptionsList"
                style={{
                  border: " 3px solid black",
                  margin: "1vh",
                  padding: "1vh",
                  height: "fit-content",
                }}
              >
                subscriptions watched:
                <ul>
                  {show.subscriptions.map((sub, sIdx) => {
                    return (
                      <li key={sIdx}>
                        <a
                          href={
                            "/subscriptions/allMembers/" + sub.member_id._id
                          }
                        >
                          {" "}
                          {sub.member_id.name}
                        </a>
                        , {sub.date}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <br />

            <Link to={`/editShow/${show._id}`}>
              <input type="button" value="Edit" />
            </Link>

            <input
              type="button"
              value="Delete"
              onClick={() => deleteShow(show._id)}
            />
          </div>
        );
      })}
    </div>
  );
}
