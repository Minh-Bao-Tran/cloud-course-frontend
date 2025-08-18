import { InfoWindow } from "@react-google-maps/api";
import "./PopUpWindow.css";

export default function popUp(props) {
  //pass in a waypoint to show on the window
  const position = {
    lat: props.waypoint.latitude,
    lng: props.waypoint.longitude,
  };
  return (
    <InfoWindow position={position} onCloseClick={props.onCloseClick}>
      <div className="pop-up-window">
        <h3>{props.waypoint.name}</h3>
        <p>Latitude: {position.lat.toFixed(4)}</p>
        <p>Longitude: {position.lng.toFixed(4)}</p>
        <p>Vis: {props.waypoint.weather.visibility} km</p>
        <p>Weather: {props.waypoint.weather.message}</p>
      </div>
    </InfoWindow>
  );
}
