import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";

import { useState, useEffect } from "react";

import PopUpWindowForMarker from "./PopUpWindowForMarker.jsx";
import PopUpWindowForLeg from "./PopUpWindowForLeg.jsx";

const containerStyle = {
  width: "100vh",
  height: "100vh",
};

const center = {
  lat: -35.4346800096081,
  lng: 148.60542523402924,
};

export default function Map(props) {
  console.log("Map runs");
  // must pass in all waypoints to draw and the route to draw.
  // props{
  //     waypoints: waypoint array,
  //     legs:Leg array,
  //     center
  // }

  //   useEffect(() => {
  //     fetch("http://localhost:3000/routes")
  //   });

  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [hoveredLeg, setHoveredLeg] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script", // internal script tag ID
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, //API key
  });

  function handleClosePopUpMarker() {
    setHoveredMarker(null);
  }

  function handleClosePopUpLeg() {
    setHoveredLeg(null);
  }

  //Gen all waypoints
  const waypoints = props.waypoints || [];
  const allWaypointMarkerComponent = waypoints
    ? waypoints.map((waypoint) => {
        const key = waypoints.indexOf(waypoint);
        const waypointPosition = {
          lat: waypoint.latitude,
          lng: waypoint.longitude,
        };

        const iconMap = {
          airport: "/airport.svg",
          wNormal: "/normalMarker.svg",
          wHighlighted: "/highlightedMarker.svg",
        };

        const icon = {
          url: iconMap[waypoint.type],
          scaledSize: new window.google.maps.Size(20, 20),
        };
        return (
          <Marker
            key={waypoint._id}
            position={waypointPosition}
            icon={icon}
            onClick={() => {
              setHoveredMarker(waypoints[key]);
              setHoveredLeg(null);
            }}
          />
        );
      })
    : [];
  // Only return components if waypoints are available
  //Gen all legs
  const allLegs = props.legs || [];
  const allLegComponents = allLegs.length
    ? allLegs.map((leg) => {
        const key = allLegs.indexOf(leg);

        const startingPoint = {
          lat: leg.startingWaypoint.latitude,
          lng: leg.startingWaypoint.longitude,
        };

        const endingPoint = {
          lat: leg.endingWaypoint.latitude,
          lng: leg.endingWaypoint.longitude,
        };

        const path = [startingPoint, endingPoint];
        return (
          <Polyline
            key={leg.startingWaypointId + leg.endingWaypointId}
            path={path}
            onClick={() => {
              setHoveredMarker(null);
              setHoveredLeg(leg);
              // console.log(key);
              console.log(hoveredLeg);
            }}
          />
        );
      })
    : [];
  //Only map leg if leg is present
  // console.log(props.leg);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onClick={() => {
        handleClosePopUpMarker();
        handleClosePopUpLeg();
      }}
    >
      {allWaypointMarkerComponent}
      {allLegComponents}
      {hoveredMarker && (
        <PopUpWindowForMarker
          waypoint={hoveredMarker}
          onCloseClick={handleClosePopUpMarker}
        />
      )}
      {hoveredLeg && (
        <PopUpWindowForLeg
          leg={hoveredLeg}
          onCloseClick={handleClosePopUpLeg}
        />
      )}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}
