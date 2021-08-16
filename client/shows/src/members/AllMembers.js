import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllMembersComp(props) {
  const [members, setMembers] = useState([]);
  const [membersChanged, setMembersChanged] = useState(true);
  const [newSubscription, setNewSubscription] = useState(true);
  const [allShows, setAllShows] = useState([]);
  const [date, setDate] = useState("");
  const [showId, setShowId] = useState("");
  useEffect(async () => {
    let resp;
    if (props.match.params.id) {
      resp = await axios.get(
        "http://localhost:8000/api/members/" + props.match.params.id
      );
    } else {
      resp = await axios.get("http://localhost:8000/api/members/");
    }
    const resp2 = await axios.get("http://localhost:8000/api/shows/");
    setAllShows(
      resp2.data.map((show) => {
        return { name: show.name, id: show._id };
      })
    );
    await setMembers(
      resp.data.map((member) => {
        return { ...member, hidden: true };
      })
    );
  }, [membersChanged, newSubscription]);

  const toggleHidden = (id) => {
    let oldMembers = [...members];
    oldMembers.forEach((member) => {
      if (member._id == id) {
        member.hidden = !member.hidden;
      }
    });
    setMembers(oldMembers);
  };

  const subscribe = async (memberId) => {
    if (showId && date) {
      const obj = {
        show_id: showId,
        member_id: memberId,
        date: date,
      };
      console.log(obj);

      const resp = await axios.post(
        "http://localhost:8000/api/subscriptions/",
        obj
      );
      if (resp.data) {
        setNewSubscription(!newSubscription);
      }
    }
  };

  const deleteMember = async (id) => {
    await axios.delete("http://localhost:8000/api/members/" + id);
    setMembersChanged(!membersChanged);
  };



  return (
    <div>
      {members.map((member, idx) => {
        let showsToWatch = [...allShows];
        member.subscriptions.forEach((sub) => {
          showsToWatch.forEach((show, index) => {
            if (show.name == sub.show_id.name) {
              showsToWatch.splice(index, 1);
            }
          });
        });
        let addSubsDiv = null;

        addSubsDiv = member.hidden ? null : (
          <div
            style={{
              border: "2px solid green",
            }}
          >
            Add a new show: <br />
            <select
              name="showCombo"
              onChange={(e) => setShowId(e.target.value)}
            >
              <option value=""></option>
              {showsToWatch.map((show, idx) => {
                return (
                  <option key={idx} value={show.id}>
                    {show.name}
                  </option>
                );
              })}
            </select>
            <input
              type="date"
              name="datePicker"
              onChange={(e) => setDate(e.target.value)}
            />{" "}
            <br />
            <input
              type="button"
              value="Subscribe"
              onClick={() => subscribe(member._id)}
            />
          </div>
        );

        return (
          <div
            key={idx}
            style={{
              border: " 3px solid black",
              width: "500px",
              margin: "2vh",
              padding: "1vh",
            }}
          >
            <h2>{member.name}</h2>
            <br />
            Email: {member.email} <br />
            City: {member.city} <br />
            <Link to={`/editMember/${member._id}`}>
              <input type="button" value="Edit" />
            </Link>
            <input
              type="button"
              value="Delete"
              onClick={() => deleteMember(member._id)}
            />
            <div
              className="subscriptionsList"
              style={{
                border: " 3px solid black",
                margin: "1vh",
                padding: "1vh",
                height: "fit-content",
              }}
            >
              <h3>Shows Watched:</h3>
              <input
                type="button"
                value="Subscribe to new show"
                onClick={() => toggleHidden(member._id)}
              />
              {addSubsDiv}

              <ul>
                {member.subscriptions.map((sub, sIdx) => {
                  return (
                    <li key={sIdx}>
                      <a href={"/showsMain/allShows/" + sub.show_id._id}>
                        {" "}
                        {sub.show_id.name}
                      </a>
                      , {sub.date}
                    </li>
                  );
                })}
              </ul>
            </div>
            <br />
          </div>
        );
      })}
    </div>
  );
}
