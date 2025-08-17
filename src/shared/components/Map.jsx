import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";

import { useState, useEffect } from "react";

const containerStyle = {
  width: "100vh",
  height: "100vh",
};

const center = {
  lat: -35.4346800096081,
  lng: 148.60542523402924,
};

export default function Map(props) {
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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script", // internal script tag ID
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, //API key
  });

  //Gen all waypoints
  const waypoints = props.waypoints || [];
  const allWaypointMarkerComponent = waypoints
    ? waypoints.map((waypoint) => {
        const waypointPosition = {
          lat: waypoint.latitude,
          lng: waypoint.longitude,
        };
        return <Marker key={waypoint._id} position={waypointPosition} />;
      })
    : [];
  // Only return components if waypoints are available

  const allLegs = props.legs || [];
  const allLegComponents = allLegs.length
    ? allLegs.map((leg) => {
        console.log(leg);
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
        return <Polyline key={key} path={path} />;
      })
    : [];
  //Only map leg if leg is present

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
      {allWaypointMarkerComponent}
      {allLegComponents}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}
