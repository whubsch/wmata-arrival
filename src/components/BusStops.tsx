import { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CircularProgress,
} from "@heroui/react";
import axios from "axios";
import { StatusChip } from "./StatusChip";
import { BusPrediction } from "../objects";
import { MarqueeText } from "./MarqueeText";
import { formatBusStationName } from "../services/stations";

interface BusStopsProps {
  stopId: string;
  apiKey: string;
}

const BusStops: React.FC<BusStopsProps> = ({ stopId, apiKey }) => {
  const [predictions, setPredictions] = useState<BusPrediction[]>([]);
  const [stopName, setStopName] = useState<string>("");
  const [countdown, setCountdown] = useState(10);

  const fetchPredictions = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.wmata.com/NextBusService.svc/json/jPredictions`,
        {
          headers: {
            api_key: apiKey,
          },
          params: {
            StopID: stopId,
          },
        },
      );

      setPredictions(response.data.Predictions);
      setStopName(response.data.StopName);
      setCountdown(10);
    } catch (error) {
      console.error("Error fetching bus predictions:", error);
    }
  }, [stopId, apiKey]);

  useEffect(() => {
    fetchPredictions();
    const predictionInterval = setInterval(fetchPredictions, 10000);
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) return 10;
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(predictionInterval);
      clearInterval(countdownTimer);
    };
  }, [fetchPredictions]);

  return (
    <Card key={stopId} className="flex-auto">
      <CardHeader className="flex justify-between items-center gap-4">
        <div className="flex flex-col p-2">
          <MarqueeText text={formatBusStationName(stopName)} maxWidth={60} />
          <h2 className="text-gray-500">WMATA Bus</h2>
        </div>
        <CircularProgress
          value={(10 - countdown) * 10}
          color="primary"
          showValueLabel
          valueLabel={countdown}
          aria-label={`${countdown} seconds to refresh`}
          size="lg"
          strokeWidth={4}
        />
      </CardHeader>
      <Divider />
      <CardBody>
        {predictions.map((bus, index) => (
          <Card key={index} className="mb-2" shadow="sm">
            <CardBody className="flex flex-row justify-between items-center">
              <div className="flex items-center">
                <div className="bg-[#ea181b] text-white font-bold px-3 py-1 rounded-lg mr-2">
                  {bus.RouteID}
                </div>
                <span className="font-medium">{bus.DirectionText}</span>
              </div>
              <StatusChip minutes={String(bus.Minutes)} />
            </CardBody>
          </Card>
        ))}
      </CardBody>
    </Card>
  );
};

export default BusStops;
