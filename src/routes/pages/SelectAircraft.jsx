export default function SelectAircrafts(props) {
  //must pass in: name property, aircraft, and default aircraft
  const defaultAircraft = props.defaultAircraft; //in name
  const aircraftList = props.aircrafts || []; //Fall back if no props for aircraft is passed

  let defaultAircraftValue = "";
  const aircraftOptionElements = aircraftList.map((aircraft) => {
    if (aircraft._id === defaultAircraft) {
      defaultAircraftValue = aircraft._id;
    }
    return (
      <option key={aircraft._id} value={aircraft._id}>
        {aircraft.aircraftRegistration}
      </option>
    );
  });

  aircraftOptionElements.splice(
    0,
    0,
    <option key={0} value="" disabled>
      --Selecting Aircraft--
    </option>
  );

  return (
    <select
      value={defaultAircraftValue}
      name={props.name}
      id=""
      onChange={(event) => {
        console.log(event.target.value);
        props.onChange(event.target.value);
      }}
    >
      {aircraftOptionElements}
    </select>
  );
}
