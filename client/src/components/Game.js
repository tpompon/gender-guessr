import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "../config.js";

import Button from "./Button";

const Game = () => {
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState(null);
  const [points, setPoints] = useState(10);
  const [firstname, setFirstname] = useState({
    value: null,
    gender: null
  });

  useEffect(() => {
    if (points === 20) setStatus("win");
    else if (points === 0) setStatus("loose");
    else start();
  }, [points]);

  useEffect(() => {
    if (firstname.value && firstname.gender) setLoaded(true);
  }, [firstname]);

  const start = async () => {
    setLoaded(false);
    setStatus("playing");

    const res = await axios.get(`${serverURL}/random`);
    setFirstname({ value: res.data.firstname, gender: res.data.gender });
  };

  const restart = () => {
    setStatus("playing");
    setPoints(10);
  };

  const answer = async gender => {
    if (loaded && status === "playing")
      gender === firstname.gender
        ? setPoints(points + 1)
        : setPoints(points - 1);
  };

  return (
    <div
      className="center-abs center"
      style={{ fontSize: 28, width: 800, maxWidth: "90%" }}
    >
      Points:{" "}
      <span
        style={{ color: points < 10 ? "red" : "green", fontWeight: "bold" }}
      >
        {points}
      </span>
      <br />
      {status !== "playing" ? (
        <div>
          {status === "win" ? (
            <span style={{ color: "green" }}>Congrats, you won ! :)</span>
          ) : (
            <span style={{ color: "red" }}>Sorry, you loss :(</span>
          )}
        </div>
      ) : (
        <div>Guess the gender of this firstname</div>
      )}
      {loaded ? (
        <div className="mt-2" style={{}}>
          <h2>{firstname.value}</h2>
        </div>
      ) : (
        <div className="mt-2">Loading...</div>
      )}
      {status !== "playing" ? (
        <div className="row center-h mt-2">
          <Button content="Restart" action={() => restart()} />
        </div>
      ) : (
        <div className="row center-h mt-2">
          <Button content="Male" action={() => answer("male")} />
          <Button
            className="ml-1"
            content="Female"
            action={() => answer("female")}
          />
        </div>
      )}
    </div>
  );
};

export default Game;
