import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import supabase from "../Config/supabaseclient"; // ✅ Import Supabase

const containerStyle = {
  width: "10%",
  height: "50px",
  borderRadius: "10px",
};

const GoogleMapComponent = () => {
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchEmployeeLocations();
  }, []);

  const fetchEmployeeLocations = async () => {
    const { data, error } = await supabase
      .from("attendance")
      .select("user_id, latitude, longitude, status")
      .order("timestamp", { ascending: false });

    if (error) console.error("Error fetching locations:", error);
    else setLocations(data);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="p-5 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Live Employee Locations</h2>
        <GoogleMap mapContainerStyle={containerStyle} center={{ lat: 20, lng: 78 }} zoom={5}>
          {locations.map((loc, index) => (
            <Marker
              key={index}
              position={{ lat: loc.latitude, lng: loc.longitude }}
              onClick={() => setSelected(loc)}
            />
          ))}
          {selected && (
            <InfoWindow position={{ lat: selected.latitude, lng: selected.longitude }} onCloseClick={() => setSelected(null)}>
              <div className="p-2">
                <h3 className="font-bold text-blue-600">Employee ID: {selected.user_id}</h3>
                <p>Status: {selected.status}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;
