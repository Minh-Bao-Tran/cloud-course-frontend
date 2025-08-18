export default function SelectAirports(props) {
  //must pass in: name property, airports, and default airport
  const defaultAirport = props.defaultAirport; //in name
  const airportList = props.airports || []; //Fall back if no props for airport is passed

  let defaultAirportValue = "";
  const airportOptionElements = airportList.map((airport) => {
    if (airport.name === defaultAirport) {
      defaultAirportValue = airport.name;
    }
    return (
      <option key={airport._id} value={airport.name}>
        {airport.name}
      </option>
    );
  });

  airportOptionElements.splice(
    0,
    0,
    <option key={0} value="" disabled>
      --Selecting Airport--
    </option>
  );

  return (
    <select
      value={defaultAirportValue}
      name={props.name}
      id=""
      onChange={(event) => {
        console.log(event.target.value);
        props.onChange(props.name, event.target.value);
      }}
    >
      {airportOptionElements}
    </select>
  );
}
