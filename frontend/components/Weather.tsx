import {
    useEffect,
    useState
} from "react";
import {
    fetchWeather
} from "@/utils/fetchWeather";
import Search
    from "@/components/Search";


function WeatherDisplay({ data }:{data:{city:string,temperature:number,description:string}}) {
    return (
        <div>
            <h2>{data.city}</h2>
            <p>Temperature: {data.temperature}°C</p>
            <p>Description: {data.description}</p>
        </div>
    );
}


export  function Weather() {
    const [weatherData, setWeatherData] = useState<{city:string,temperature:number,description:string}|null>(null);

    useEffect(() => {
        fetch('/api/weather')
            .then(response => response.json())
            .then(data => setWeatherData(data));
    }, []);

    if(!weatherData) return null

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Weather
                App</h1>
            {weatherData ?
                <WeatherDisplay
                    data={weatherData}/> :
                <p>Loading...</p>}
        </div>);
}




export  function Weather2() {
    const [weather, setWeather] = useState<{
        name: string;
        sys: any;
        weather: { description: string }[];
        main: { temp: string; humidity: string };
        wind: { speed: string };
    } | null>(null);
    const [error, setError] = useState("");

    const handleSearch = async (city: string) => {
        const data = await fetchWeather(city);
        if (data) {
            setWeather(data);
            setError("");
        } else {
            setError("City not found. Please try again.");
            setWeather(null);
        }
    };

    return (
            <div
                className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <h1>Weather
                    App</h1>
                <Search
                    onSearch={handleSearch}/>
                {error &&
                    <p style={{color: "red"}}>{error}</p>}
                {weather && (
                    <div>
                        <h2>
                            {weather.name}, {weather.sys.country}
                        </h2>
                        <p>{weather.weather[0].description}</p>
                        <p>Temperature: {weather.main.temp}°C</p>
                        <p>Humidity: {weather.main.humidity}%</p>
                        <p>Wind
                            Speed: {weather.wind.speed} m/s</p>
                    </div>)}
            </div>
            );
            }
