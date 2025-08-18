import { InfoWindow } from "@react-google-maps/api";
import "./PopUpWindow.css";

import { getCenter } from "geolib";

export default function popUp(props) {
  //pass in a waypoint to show on the window

  const leg = props.leg;
  const startingPoint = {
    latitude: leg.startingWaypoint.latitude,
    longitude: leg.startingWaypoint.longitude,
  };
  const endingPoint = {
    latitude: leg.endingWaypoint.latitude,
    longitude: leg.endingWaypoint.longitude,
  };

  //Position of the InfoWindow should be in the center of the leg.
  const infoWindowPosition = getCenter([startingPoint, endingPoint]);

  return (
    <InfoWindow
      onCloseClick={props.onCloseClick}
      position={{
        lat: infoWindowPosition.latitude,
        lng: infoWindowPosition.longitude,
      }}
    >
      <div className="pop-up-window">
        <h3>
          {leg.startingWaypoint.name} - {leg.endingWaypoint.name}
        </h3>
        <p>Direction: {leg.direction.toFixed(4)}˚T </p>
        <p>Distance: {leg.distance.toFixed(4)} NM</p>
        <p>Airspeed: {leg.airspeed.toFixed(4)} Knots</p>
        <p>Time: {leg.time.toFixed(4)} hours</p>
      </div>
    </InfoWindow>
  );
}
