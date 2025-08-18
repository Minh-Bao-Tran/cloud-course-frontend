import SelectWaypoint from "./SelectWaypoint";

export default function Waypoint(props) {
  //Pass In a waypoint object
  return (
    <li>
      <button
        type="button"
        onClick={() => {
          if (props.waypointPos <= 1) {
            //Can not move the first waypoint
            return;
          }
          props.onMoveWaypoint(props.waypointPos, props.waypointPos - 1);
        }}
      >
        Up
      </button>
      <button
        type="button"
        onClick={() => {
          if (props.waypointPos >= props.waypointPos.length - 3) {
            //Can not move the last waypoint
            //- 2 as this is not accounted for the airport
            return;
          }
          props.onMoveWaypoint(props.waypointPos, props.waypointPos + 1);
        }}
      >
        Down
      </button>
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
