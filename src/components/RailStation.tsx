import { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CircularProgress,
} from "@heroui/react";
import axios from "axios";
import { LineChip } from "./LineChip";
import { StatusChip } from "./StatusChip";
import { StationSelect } from "./StationSelect";
import {
  getStationName,
  formatStationName,
  getStation,
} from "../services/stations";
import { TrainPrediction } from "../objects";

interface RailStationProps {
  selectedStation: string;
  onStationChange?: (station: string) => void;
  apiKey: string;
  showStationSelect?: boolean;
  currentTime: Date;
}

const RailStation: React.FC<RailStationProps> = ({
  selectedStation,
  onStationChange,
  apiKey,
  showStationSelect = true,
  currentTime,
}) => {
  const [predictions, setPredictions] = useState<TrainPrediction[]>([]);
  const [countdown, setCountdown] = useState(10);

  const fetchTimings = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/${selectedStation}`,
        {
          headers: {
            api_key: apiKey,
          },
        },
      );

      setPredictions(response.data.Trains);
      setCountdown(10);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  }, [selectedStation, apiKey]);

  useEffect(() => {
    fetchTimings();
    const predictionInterval = setInterval(fetchTimings, 10000);
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
  }, [fetchTimings]);

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div className="flex flex-col p-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">
              {formatStationName(getStationName(selectedStation))}
            </h1>
            {getStation(selectedStation).lines.map((line) => (
              <LineChip key={line} line={line} size="sm" />
            ))}
          </div>
          <h2 className="text-gray-500">WMATA Rail</h2>
        </div>
        <div className="flex gap-4 items-center">
          {showStationSelect ? (
            <StationSelect
              selectedStation={selectedStation}
              onStationChange={onStationChange!}
            />
          ) : (
            <span className="font-mono text-lg">
              {currentTime.toLocaleTimeString()}
            </span>
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
                  {train.DestinationCode
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
  );
};

export default RailStation;
