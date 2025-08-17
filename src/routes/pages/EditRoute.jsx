import Map from "@shared/components/Map.jsx";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

export default function EditRoute(props) {
  const [allWaypoints, setAllWaypoint] = useState([]);
  const [route, setAllRoute] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/waypoints")
      .then(
        (res) => {
          if (res.status != 200) {
            console.log(`${res.status}: can not be fetched`);
          }
          return res.json();
        }
        //Turned into array with Waypoint objects
      )
      .then((res) => JSON.parse(res))
      .then((data) => {
        console.log(data);
        setAllWaypoint(data.waypoints);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  const { id } = useParams(); //Accessing the Route Id Params
  useEffect(() => {
    fetch(`http://localhost:3000/routes/${id}`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0F1dGgiOnRydWUsInVzZXIiOnsidXNlck5hbWUiOiJNYXR0VHJhbiIsImVtYWlsIjoibWluaHRyYW5udng1NkBnbWFpbC5jb20iLCJfaWQiOiI2ODkzZjMyNjk5ZmMwNjIzYWU5NGVlZjkifSwiaWF0IjoxNzU1NDcyNjE2LCJleHAiOjE3NTU1NTkwMTZ9.XsiMCkPvLT2WyErTOsKcQdKqd6b7wcKwPBqQgToMWh4",
        "Content-Type": "application/json",
      },
    })
      .then(
        (res) => {
          if (res.status != 200) {
            console.log(`${res.status}: can not be fetched`);
          }
          return res.json();
        }
        //Turned into array with Waypoint objects
      )
      .then((res) => JSON.parse(res))
      .then((data) => {
        console.log(data);
        setAllRoute(data);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  return (
    <main>
      <Map waypoints={allWaypoints} legs={route.legs} />
    </main>
  );
}
