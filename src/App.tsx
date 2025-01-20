import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CircularProgress,
} from "@heroui/react";
import axios from "axios";
import { LineChip } from "./components/LineChip";
import { StatusChip } from "./components/StatusChip";
import { StationSelect } from "./components/StationSelect";
import { getStationName, formatStationName } from "./services/stations";
import { TrainPrediction } from "./objects";

export default function App() {
  const [predictions, setPredictions] = useState<TrainPrediction[]>([]);
  const [countdown, setCountdown] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());
  // const station = import.meta.env.VITE_METRO_STATION || "D03";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  // const params = new URLSearchParams(window.location.search);
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const [selectedStation, setSelectedStation] = useState(
    params.get("station") || import.meta.env.VITE_METRO_STATION || "D03",
  );

  const handleStationChange = (station: string) => {
    setSelectedStation(station);
    // Update URL with new station
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("station", station);
    window.history.pushState({}, "", newUrl);
  };
  const fetchTimings = useCallback(async () => {
    try {
      console.log(
        "API Key:",
        params.get("api_key") || import.meta.env.VITE_WMATA_API_KEY,
      );
      console.log("Station:", selectedStation);

      const response = await axios.get(
        `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/${selectedStation}`,
        {
          headers: {
            api_key:
              params.get("api_key") || import.meta.env.VITE_WMATA_API_KEY,
          },
        },
      );

      setPredictions(response.data.Trains);
      setCountdown(10);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  }, [selectedStation, params]);

  useEffect(() => {
    // Fetch initial predictions
    fetchTimings();

    // Set up interval to fetch predictions every 20 seconds
    const predictionInterval = setInterval(fetchTimings, 10000);

    // Set up countdown timer
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) return 10;
        return prev - 1;
      });
    }, 1000);

    // Cleanup intervals
    return () => {
      clearInterval(predictionInterval);
      clearInterval(countdownTimer);
    };
  }, [fetchTimings]);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex flex-col p-2">
            <h1 className="text-2xl font-bold">
              {getStationName(selectedStation)}
            </h1>
            <h2 className="text-gray-500">WMATA Next Arrivals</h2>
          </div>
          <div className="flex gap-4 items-center">
            {params.get("station") ? (
              <span className="font-mono text-lg">
                {currentTime.toLocaleTimeString()}
              </span>
            ) : (
              <StationSelect
                selectedStation={selectedStation}
                onStationChange={handleStationChange}
              />
            )}
            <CircularProgress
              value={(10 - countdown) * 10}
              color="primary"
              showValueLabel
              valueLabel={countdown}
              aria-label={`${countdown} seconds to refresh`}
              size="lg"
              strokeWidth={4}
            />
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          {predictions.map((train, index) => (
            <Card key={index} className="mb-2" shadow="sm">
              <CardBody className="flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <LineChip line={train.Line} className="mr-2" size="lg" />
                  <span className="font-medium">
                    {getStationName(train.DestinationCode)
                      ? getStationName(train.DestinationCode)
                      : formatStationName(train.DestinationName)}
                  </span>
                </div>
                <StatusChip minutes={train.Min} />
              </CardBody>
            </Card>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
