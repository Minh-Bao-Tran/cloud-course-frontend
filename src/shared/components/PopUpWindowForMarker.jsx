import { InfoWindow } from "@react-google-maps/api";
import "./PopUpWindowForMarker.css";

export default function popUp(props) {
  //pass in a waypoint to show on the window
  const position = {
    lat: props.waypoint.latitude,
    lng: props.waypoint.longitude,
  };
  return (
    <InfoWindow position={position}>
      <div className="pop-up-window">
        <h3>Marker Info</h3>
        <p>This appears on hover!</p>
      </div>
    </InfoWindow>
  );
}
