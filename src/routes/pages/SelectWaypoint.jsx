export default function SelectWaypoint(props) {
  //Pass
  //must pass in: name property, waypoints, and default waypoints
  const defaultWaypoint = props.defaultWaypoint; //in name
  const waypointList = props.waypoints || []; //Fall back if no props for airport is passed
//   console.log(defaultWaypoint);
  let defaultWaypointValue = "";
  const waypointOptionElements = waypointList.map((waypoint) => {
    if (waypoint.name === defaultWaypoint.name) {
      defaultWaypointValue = waypoint._id;
    }
    return (
      <option key={waypoint._id} value={waypoint._id}>
        {waypoint.name}
      </option>
    );
  });

  waypointOptionElements.splice(
    0,
    0,
    <option key={0} value="" disabled>
      --Selecting Waypoint--
    </option>
  );

  return (
    <select
      value={defaultWaypointValue}
      //   name={props.name}
      //   id=""
      onChange={(event) => {
        const waypointPos = props.waypointPos;
        // console.log(event.target.value);
        props.onChange(waypointPos, event.target.value);
      }}
    >
      {waypointOptionElements}
    </select>
  );
}
