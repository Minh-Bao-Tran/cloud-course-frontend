import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useDeepCompareEffect } from "use-deep-compare";

import Map from "@shared/components/Map.jsx";
import SelectAirports from "./SelectAirports.jsx";
import SelectAircrafts from "./SelectAircraft.jsx";
import Waypoint from "./Waypoint.jsx";

export default function EditRoute(props) {
  //State
  const [allWaypoints, setAllWaypoint] = useState([]);
  const [route, setRoute] = useState({
    waypoints: [],
    departingAirport: "",
    arrivingAirport: "",
    aircraftId: "",
    departingDate: "2025-08-08",
    arrivingDate: "2025-08-08",
  });
  const [allAirport, setAllAirport] = useState([]);
  const [allAircraft, setAllAircraft] = useState([]);

  //React-router-dom hook
  const navigate = useNavigate();
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
    setRoute((prevRoute) => {
      //Add new waypoint to the end
      const prevWaypoint = prevRoute.waypoints;
      const newWaypoint = prevWaypoint.toSpliced(-1, 0, "");
      return {
        ...prevRoute,
        waypoints: newWaypoint,
      };
    });
  }

  function handleDeleteWaypoint(index) {
    setRoute((prevRoute) => {
      const prevWaypoint = prevRoute.waypoints;
      const newWaypoint = prevWaypoint.toSpliced(index, 1);
      return {
        ...prevRoute,
        waypoints: newWaypoint,
      };
    });
    console.log(route.waypoints);
  }

  function handleUpdateForm() {
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

    fetch(`http://localhost:3000/routes/`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0F1dGgiOnRydWUsInVzZXIiOnsidXNlck5hbWUiOiJNYXR0VHJhbiIsImVtYWlsIjoibWluaHRyYW5udng1NkBnbWFpbC5jb20iLCJfaWQiOiI2ODkzZjMyNjk5ZmMwNjIzYWU5NGVlZjkifSwiaWF0IjoxNzU1NTU3NTc2LCJleHAiOjE3NTU2NDM5NzZ9.Tj4HLU-bIeqiftUCMjSbSxEMzMuqY9rq2wimzC-hqF8",
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
        alert("success: " + data.success);
        navigate(`/routes/${data._id}`);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  function handleUpdateAircraft(aircraft) {
    setRoute((prevRoute) => {
      //Add new waypoint to the end
      const newAircraft = aircraft;
      return {
        ...prevRoute,
        aircraftId: newAircraft,
      };
    });
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

  //Fetch All user Aircraft
  useEffect(() => {
    fetch(`http://localhost:3000/aircrafts`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0F1dGgiOnRydWUsInVzZXIiOnsidXNlck5hbWUiOiJNYXR0VHJhbiIsImVtYWlsIjoibWluaHRyYW5udng1NkBnbWFpbC5jb20iLCJfaWQiOiI2ODkzZjMyNjk5ZmMwNjIzYWU5NGVlZjkifSwiaWF0IjoxNzU1NTU3NTc2LCJleHAiOjE3NTU2NDM5NzZ9.Tj4HLU-bIeqiftUCMjSbSxEMzMuqY9rq2wimzC-hqF8",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status != 200) {
          console.log(`${res.status}: can not be fetched`);
        }
        return res.json();
      })
      .then((res) => JSON.parse(res))
      .then((data) => {
        setAllAircraft(data.aircrafts);
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

  //filter out all newly created waypoint
  const validWaypoints =
    middleWaypoints &&
    middleWaypoints.filter((waypoint) => {
      if (waypoint !== "") {
        return true;
      }
      return false;
    });

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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0F1dGgiOnRydWUsInVzZXIiOnsidXNlck5hbWUiOiJNYXR0VHJhbiIsImVtYWlsIjoibWluaHRyYW5udng1NkBnbWFpbC5jb20iLCJfaWQiOiI2ODkzZjMyNjk5ZmMwNjIzYWU5NGVlZjkifSwiaWF0IjoxNzU1NTU3NTc2LCJleHAiOjE3NTU2NDM5NzZ9.Tj4HLU-bIeqiftUCMjSbSxEMzMuqY9rq2wimzC-hqF8",
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
    validWaypoints,
  ]);

  const highlightingMarkerIdList = route.waypoints && [...route.waypoints];

  const allWaypointListWithHighlighted =
    highlightingMarkerIdList && allWaypoints
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
  console.log(allWaypointListWithHighlighted);

  return (
    <main>
      <form>
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
        <label>
          <p>Aircraft</p>
          <SelectAircrafts
            name="aircraft"
            aircrafts={allAircraft}
            defaultAircraft={route.aircraftId}
            onChange={handleUpdateAircraft}
          />
        </label>
        <p id="totalTime">
          Total time: {route.time && route.time.toFixed(2)} hours
        </p>
        <p id="totalDistance">
          Total distance: {route.distance && route.distance.toFixed(2)} nm
        </p>
        <Map waypoints={allWaypointListWithHighlighted} legs={route.legs} />
        <ul>
          <button type="button" onClick={handleAddNewWaypoint}>
            +Add Waypoint
          </button>
          {middleWaypoints &&
            middleWaypoints.map((waypointId, index) => {
              const waypointPos = index + 1; //First waypoint is not counted as this is the airport itself
              const key = waypointId + waypointPos;

              let resultWaypoint = allWaypointListWithHighlighted.find(
                (waypoint) => {
                  if (waypoint._id === waypointId) {
                    return true;
                  }
                  return false;
                }
              );

              if (waypointId == "") {
                resultWaypoint = {};
              }
              return (
                <Waypoint
                  // key={waypointId}
                  key={key}
                  waypointPos={waypointPos}
                  defaultWaypoint={resultWaypoint}
                  waypoints={allWaypointListWithHighlighted}
                  onChange={handleWaypointChange}
                  onMoveWaypoint={handleMoveWaypoint}
                  onDelete={handleDeleteWaypoint}
                />
              );
            })}
        </ul>
        <button type="button" onClick={handleUpdateForm}>
          Create
        </button>
      </form>
    </main>
  );
}
