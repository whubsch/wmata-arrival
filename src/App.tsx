import { useState, useEffect, useMemo } from "react";
import RailStation from "./components/RailStation";
import BikeShareStations from "./components/BikeShareStations";
import BusStops from "./components/BusStops";

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const [selectedStation, setSelectedStation] = useState(
    params.get("rail") || import.meta.env.VITE_METRO_STATION || "D03",
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStationChange = (station: string) => {
    setSelectedStation(station);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("rail", station);
    window.history.pushState({}, "", newUrl);
  };

  const cabiStationIds = useMemo(() => {
    const cabiParam = params.get("cabi");
    return cabiParam ? cabiParam.split(",") : [];
  }, [params]);

  const busStopIds = useMemo(() => {
    const busStopParam = params.get("bus");
    return busStopParam ? busStopParam.split(",") : [];
  }, [params]);

  return (
    <div className="container mx-auto p-4 md:h-screen">
      <div className="flex gap-2">
        <RailStation
          selectedStation={selectedStation}
          onStationChange={handleStationChange}
          apiKey={params.get("api_key") || import.meta.env.VITE_WMATA_API_KEY}
          showStationSelect={!params.get("rail")}
          currentTime={currentTime}
        />
        {cabiStationIds ? (
          <BikeShareStations stationIds={cabiStationIds} />
        ) : null}
        {busStopIds
          ? busStopIds.map((busStopId) => (
              <BusStops
                apiKey={
                  params.get("api_key") || import.meta.env.VITE_WMATA_API_KEY
                }
                stopId={busStopId}
                currentTime={currentTime}
              />
            ))
          : null}
      </div>
    </div>
  );
}
