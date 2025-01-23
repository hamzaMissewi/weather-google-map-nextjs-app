import {
    useState
} from "react";
import {
    ReactSearchAutocomplete
} from "react-search-autocomplete";
import {
    GoogleMapComponent
} from "@/components/google/GoogleMap";

const GoogleSearchComponent = () => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [items, setItems] = useState<{     id: string,     name: string,placeId: string }[]>([]);


    const handleOnSelect = async (item: google.maps.places.PlaceDetailsRequest) => {
        // Use Google Places API to get coordinates for the selected place
        const service = new window.google.maps.places.PlacesService(
            document.createElement("div")
        );

        service.getDetails({ placeId: item.placeId }, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
                const { lat, lng } = place.geometry.location;
                setLocation({ lat: lat(), lng: lng() });
            }
        });
    };

    const handleOnSearch = async (query:string) => {
        // Use Google Places Autocomplete to fetch suggestions
        const autocompleteService = new window.google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions(
            { input: query, types: ["(cities)"] },
            (predictions, status) => {
                if (predictions && status === window.google.maps.places.PlacesServiceStatus.OK) {
                    const items = predictions.map((prediction) => ({
                        id: prediction.place_id,
                        name: prediction.description,
                        placeId: prediction.place_id,
                    }));
                    setItems(items);
                }
            }
        );
    };


    return (
        <div>
            <ReactSearchAutocomplete
                items={items}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                placeholder="Search for a city"
                styling={{ zIndex: 2 }}
            />
            <GoogleMapComponent location={location} />
        </div>
    );
};

export default GoogleSearchComponent;