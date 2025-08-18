import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import { useDeepCompareEffect } from "use-deep-compare";

import Map from "@shared/components/Map.jsx";
import SelectAirports from "./SelectAirports.jsx";
import Waypoint from "./Waypoint.jsx";

export default function EditRoute(props) {
  //State
  const [allWaypoints, setAllWaypoint] = useState([]);
  const [route, setRoute] = useState({});
  const [allAirport, setAllAirport] = useState([]);
  //Event Handler
  function handleAirportChange(field, value) {
    //Only allow field: departingAirport and arrivingAirport

    setRoute((prevRoute) => {
      return {
        ...prevRoute,
        [field]: value,
      };
    });
  }

  function handleWaypointChange(waypointPos, waypointValue) {
    setRoute((prevRoute) => {
      const allWaypoint = prevRoute.waypoints;
      allWaypoint[waypointPos] = waypointValue;
      return {
        ...prevRoute,
        waypoints: allWaypoint,
      };
    });
  }

  function handleMoveWaypoint(currentPos, type) {
    //swap Current pos and future
    let nextPos = 0;
    if (type === "up") {
      nextPos = currentPos - 1;
    } else {
      //type = false
      nextPos = currentPos + 1;
    }
    console.log(currentPos, nextPos);
    if (nextPos == 0 || nextPos == route.waypoints.length - 1) {
      //Cannot move first and last
      return;
    }
    setRoute((prevRoute) => {
      const nextRouteWaypoint = [...prevRoute.waypoints];
      const swappingWaypoint1 = prevRoute.waypoints[currentPos];
      const swappingWaypoint2 = prevRoute.waypoints[nextPos];

      //The 2points change position
      nextRouteWaypoint[currentPos] = swappingWaypoint2;
      nextRouteWaypoint[nextPos] = swappingWaypoint1;

      return {
        ...prevRoute,
        waypoints: nextRouteWaypoint,
      };
    });
  }

  function handleAddNewWaypoint() {
    return;
  }

  //Fetch API
  //Fetch All Waypoints for map
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
        // console.log(data);
        setAllWaypoint(data.waypoints);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  //Fetch Routes for map
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
        setRoute(data);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  //Fetch All airports
  useEffect(() => {
    fetch(`http://localhost:3000/static/airports`)
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
        setAllAirport(data);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  //Fetch route calc
  const { arrivingAirport, departingAirport, aircraftId, departingDate } =
    route; //set up the dependancies to recalc
  const chosenWaypoints = route.waypoints && [...route.waypoints];
  const middleWaypoints = chosenWaypoints && chosenWaypoints.slice(1, -1);

  useDeepCompareEffect(() => {
    //Delete the 2 airports in waypoint

    if (
      !chosenWaypoints ||
      !arrivingAirport ||
      !departingAirport ||
      !aircraftId ||
      !departingDate
    ) {
      //Block if information is not complete
      return;
    }
    // console.log(middleWaypoints);

    fetch(`http://localhost:3000/routes/calc`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0F1dGgiOnRydWUsInVzZXIiOnsidXNlck5hbWUiOiJNYXR0VHJhbiIsImVtYWlsIjoibWluaHRyYW5udng1NkBnbWFpbC5jb20iLCJfaWQiOiI2ODkzZjMyNjk5ZmMwNjIzYWU5NGVlZjkifSwiaWF0IjoxNzU1NDcyNjE2LCJleHAiOjE3NTU1NTkwMTZ9.XsiMCkPvLT2WyErTOsKcQdKqd6b7wcKwPBqQgToMWh4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departingAirport: departingAirport,
        arrivingAirport: arrivingAirport,
        waypoints: middleWaypoints,
        departingDate: departingDate,
        arrivingDate: route.arrivingDate,
        aircraftId: aircraftId,
      }),
    })
      .then((res) => res.json())
      .then((res) => JSON.parse(res))
      .then((data) => {
        // console.log(data);
        setRoute(data);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, [
    arrivingAirport,
    departingAirport,
    aircraftId,
    departingDate,
    chosenWaypoints,
  ]);

  const highlightingMarkerIdList = route.waypoints && [...route.waypoints];
  const allWaypointListWithHighlighted = allWaypoints
    ? allWaypoints.map((waypoint) => {
        if (waypoint.type === "airport") {
          //Airport are not modified
          return { ...waypoint };
        }

        if (highlightingMarkerIdList.some((_id) => _id == waypoint._id)) {
          //return true if waypoint_id == _id in
          return { ...waypoint, type: "wHighlighted" };
        }

        //Object is not in highlighted list
        return { ...waypoint };
      })
    : [];

  return (
    <main>
      <form
        action={(formData) => {
          console.log(formData);
        }}
      >
        <label>
          <p>Departing Airport</p>
          <SelectAirports
            name="departingAirport"
            airports={allAirport}
            defaultAirport={route.departingAirport}
            onChange={handleAirportChange}
          ></SelectAirports>
        </label>
        <label>
          <p>Arriving Airport</p>
          <SelectAirports
            name="arrivingAirport"
            airports={allAirport}
            defaultAirport={route.arrivingAirport}
            onChange={handleAirportChange}
          ></SelectAirports>
        </label>
        <Map waypoints={allWaypointListWithHighlighted} legs={route.legs} />

        <ul>
          <button onClick={handleAddNewWaypoint}>+Add Waypoint</button>
          {middleWaypoints &&
            middleWaypoints.map((waypointId, index) => {
              const waypointPos = index + 1; //First waypoint is not counted as this is the airport itself
              const key = waypointId + waypointPos;

              //+1 as the modifying array would be in the route, which would contain all of the waypoints, not just 1
              const resultWaypoint = allWaypointListWithHighlighted.find(
                (waypoint) => {
                  if (waypoint._id === waypointId) {
                    return true;
                  }
                  return false;
                }
              );
              return (
                <Waypoint
                  // key={waypointId}
                  key={key}
                  waypointPos={waypointPos}
                  defaultWaypoint={resultWaypoint}
                  waypoints={allWaypointListWithHighlighted}
                  onChange={handleWaypointChange}
                  onMoveWaypoint={handleMoveWaypoint}
                />
              );
            })}
        </ul>
      </form>
    </main>
  );
}
