import SelectWaypoint from "./SelectWaypoint";

export default function Waypoint(props) {
  //Pass In a waypoint object
  return (
    <li>
      <button type="button">Up</button>
      <button type="button">Down</button>
      <SelectWaypoint
        waypointPos={props.waypointPos}
        waypoints={props.waypoints}
        defaultWaypoint={props.defaultWaypoint}
        onChange={props.onChange}
      />
      {props.defaultWaypoint && (
        <>
          <p>Lat: {props.defaultWaypoint.latitude}</p>
          <p>Lon: {props.defaultWaypoint.longitude}</p>
        </>
      )}
      <button type="button"> Delete</button>
    </li>
  );
}
