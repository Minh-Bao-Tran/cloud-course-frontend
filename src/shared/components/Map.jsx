import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100vh",
  height: "100vh",
};

const center = {
  lat: 37.7749, // San Francisco, CA
  lng: -122.4194,
};

export default function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script", // internal script tag ID
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, //API key
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      <Marker
        position={center}
        icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        }}
      />
      <Marker
        position={{ lat: 37.332405721760566, lng: -121.86642788483934 }}
      />
      <Polyline
        path={[center, { lat: 37.332405721760566, lng: -121.86642788483934 }]}
      />
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}
