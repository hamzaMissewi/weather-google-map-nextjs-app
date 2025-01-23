import { useEffect, useRef } from "react";
import { APILoader } from "@googlemaps/extended-component-library";

const CONFIGURATION = {
  ctaTitle: "Checkout",
  mapOptions: {
    center: { lat: 37.4221, lng: -122.0841 },
    fullscreenControl: true,
    mapTypeControl: false,
    streetViewControl: true,
    zoom: 11,
    zoomControl: false,
    maxZoom: 22,
    mapId: "",
  },
  mapsApiKey: "YOUR_API_KEY_HERE",
  capabilities: {
    addressAutocompleteControl: true,
    mapDisplayControl: true,
    ctaControl: true,
  },
};

const SHORT_NAME_ADDRESS_COMPONENT_TYPES = new Set([
  "street_number",
  "administrative_area_level_1",
  "postal_code",
]);
const ADDRESS_COMPONENT_TYPES_IN_FORM = [
  "location",
  "locality",
  "administrative_area_level_1",
  "postal_code",
  "country",
];

const AddressSelection = () => {
  const locationInputRef = useRef<HTMLInputElement>(null);
  const localityInputRef = useRef<HTMLInputElement>(null);
  const administrativeAreaInputRef = useRef<HTMLInputElement>(null);
  const postalCodeInputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const { Autocomplete } = await APILoader.importLibrary("places");

      const mapOptions = CONFIGURATION.mapOptions;
      mapOptions.mapId = mapOptions.mapId || "DEMO_MAP_ID";
      mapOptions.center = mapOptions.center || { lat: 37.4221, lng: -122.0841 };

      const autocomplete = new Autocomplete(locationInputRef.current!, {
        fields: ["address_components", "geometry", "name"],
        types: ["address"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          window.alert(`No details available for input: '${place.name}'`);
          return;
        }
        fillInAddress(place);
      });
    };

    initMap();
  }, []);

  const fillInAddress = (place: google.maps.places.PlaceResult) => {
    const getComponentName = (componentType: string) => {
      for (const component of place.address_components || []) {
        if (component.types[0] === componentType) {
          return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType)
            ? component.short_name
            : component.long_name;
        }
      }
      return "";
    };

    const getComponentText = (componentType: string) => {
      return componentType === "location"
        ? `${getComponentName("street_number")} ${getComponentName("route")}`
        : getComponentName(componentType);
    };

    ADDRESS_COMPONENT_TYPES_IN_FORM.forEach((componentType) => {
      const inputElement = document.getElementById(
        `${componentType}-input`,
      ) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = getComponentText(componentType);
      }
    });
  };

  return (
    <div style={{ margin: 0 }}>
      <div
        style={{
          position: "relative",
          top: "-12px",
          fontFamily: "Roboto, sans-serif",
          fontWeight: 500,
        }}
      >
        <img
          style={{ position: "relative", top: "-5px" }}
          src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg"
          alt=""
        />
        <span>Address Selection</span>
      </div>
      <input
        type="text"
        placeholder="Address"
        id="location-input"
        ref={locationInputRef}
      />
      <input type="text" placeholder="Apt, Suite, etc (optional)" />
      <input
        type="text"
        placeholder="City"
        id="locality-input"
        ref={localityInputRef}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="text"
          style={{ maxWidth: "120px" }}
          placeholder="State/Province"
          id="administrative_area_level_1-input"
          ref={administrativeAreaInputRef}
        />
        <input
          type="text"
          style={{ maxWidth: "120px" }}
          placeholder="Zip/Postal code"
          id="postal_code-input"
          ref={postalCodeInputRef}
        />
      </div>
      <input
        type="text"
        placeholder="Country"
        id="country-input"
        ref={countryInputRef}
      />
      <button
        style={{
          backgroundColor: "#6200ee",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Checkout
      </button>
    </div>
  );
};

export default AddressSelection;
