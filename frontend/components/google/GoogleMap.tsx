import { useLoadScript, GoogleMap, Marker,Libraries } from "@react-google-maps/api";
import {
    useEffect
} from "react";


const libraries:Libraries = ["places"]; // Load the Places library if needed

export const GoogleMapComponent = ({ location }:{location: google.maps.LatLngLiteral}) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries,
    });

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    return (
        <GoogleMap
            zoom={12}
            center={location}
            mapContainerStyle={{ width: "100%", height: "400px" }}
        >
            <Marker position={location} />
        </GoogleMap>
    );
};



const MapComponentTest = () => {
    useEffect(() => {
        const mapOptions = {
            center: { lat: 37.4221, lng: -122.0841 },
            zoom: 11,
            mapId: 'DEMO_MAP_ID',
        };

        const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
        new google.maps.Marker({ position: mapOptions.center, map });
    }, []);

    return <div id="map" style={{ height: '500px', width: '600px' }}></div>;
};
