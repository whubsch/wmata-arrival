import React, { useState, useEffect } from "react";
import { Card, CardBody, Chip, Divider, Spinner } from "@heroui/react";
import { MarqueeText } from "./MarqueeText";
import bolt from "../assets/bolt.svg";
import bike from "../assets/bike.svg";
import parking from "../assets/parking.svg";

interface StatusItemProps {
  icon: string;
  alt: string;
  count: number;
  itemLoading: boolean;
}

const StatusItem: React.FC<StatusItemProps> = ({
  icon,
  alt,
  count,
  itemLoading,
}) => {
  const getChipColor = (count: number) => {
    if (count === 0) return "danger";
    if (count <= 2) return "warning";
    return "success";
  };

  return (
    <div className="flex items-center justify-between h-6">
      <div className="flex items-center gap-2">
        <img
          src={icon}
          className="h-6 w-6 brightness-0 dark:brightness-100 dark:invert"
          alt={alt}
        />
      </div>
      {!itemLoading ? (
        <Chip color={getChipColor(count)} variant="flat">
          {count}
        </Chip>
      ) : (
        <div className="h-[28]">
          <Spinner size="sm" />
        </div>
      )}
    </div>
  );
};

interface VehicleTypeAvailable {
  count: number;
  vehicle_type_id: string;
}

interface StationStatus {
  station_id: string;
  num_bikes_available: number;
  num_ebikes_available: number;
  num_docks_available: number;
  is_renting: number;
  is_returning: number;
  vehicle_types_available: VehicleTypeAvailable[];
}

interface StationInfo {
  station_id: string;
  name: string;
  capacity: number;
}

interface StationStatusResponse {
  data: {
    stations: StationStatus[];
  };
}

interface StationInfoResponse {
  data: {
    stations: StationInfo[];
  };
}

interface BikeShareStationProps {
  stationId: string;
}

const STATION_INFO_URL =
  "https://gbfs.lyft.com/gbfs/2.3/dca-cabi/en/station_information.json";
const STATION_STATUS_URL =
  "https://gbfs.lyft.com/gbfs/2.3/dca-cabi/en/station_status.json";

const BikeShareStation: React.FC<BikeShareStationProps> = ({ stationId }) => {
  const [stationStatuses, setStationStatuses] = useState<StationStatus[]>([]);
  const [stationInfos, setStationInfos] = useState<StationInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStationInfo = async () => {
      try {
        const infoResponse = await fetch(STATION_INFO_URL);
        if (!infoResponse.ok) {
          throw new Error("Failed to fetch station information");
        }
        const infoData: StationInfoResponse = await infoResponse.json();
        const filteredInfos = infoData.data.stations.filter((station) =>
          stationId.includes(station.station_id),
        );
        setStationInfos(filteredInfos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchStationInfo();
  }, [stationId]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const statusResponse = await fetch(STATION_STATUS_URL);

        if (!statusResponse.ok) {
          throw new Error("Failed to fetch status data");
        }

        const statusData: StationStatusResponse = await statusResponse.json();
        const filteredStatuses = statusData.data.stations.filter((station) =>
          stationId.includes(station.station_id),
        );

        setStationStatuses(filteredStatuses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();

    // Set up polling every 60 seconds for status updates only
    const interval = setInterval(fetchStatus, 60000);

    return () => clearInterval(interval);
  }, [stationId]);

  if (error) {
    return (
      <Card>
        <div className="text-red-500 text-center">Error: {error}</div>
      </Card>
    );
  }

  const stationStatus = stationStatuses.find(
    (status) => status.station_id === stationId,
  );
  const stationInfo = stationInfos.find(
    (info) => info.station_id === stationId,
  );

  if (!stationStatus || !stationInfo) return null;

  const regularBikes =
    stationStatus.vehicle_types_available.find(
      (type) => type.vehicle_type_id === "1",
    )?.count || 0;

  const eBikes =
    stationStatus.vehicle_types_available.find(
      (type) => type.vehicle_type_id === "2",
    )?.count || 0;

  const docksAvailable = stationStatus.num_docks_available || 0;

  const isOperational =
    stationStatus.is_renting === 1 && stationStatus.is_returning === 1;

  return (
    <Card className="flex-auto">
      <CardBody>
        <div className="flex flex-col p-2">
          <div className="flex items-center gap-2 justify-between">
            <MarqueeText text={stationInfo.name} maxWidth={60} />
            {!isOperational ? (
              <Chip color="danger" variant="flat">
                Out of Service
              </Chip>
            ) : null}
          </div>
          <h2 className="text-gray-500">Capital Bikeshare</h2>
        </div>

        <Divider />

        <div className="flex flex-col gap-2 p-2 justify-evenly">
          <StatusItem
            icon={bike}
            alt="Bikes"
            count={regularBikes}
            itemLoading={loading}
          />
          <StatusItem
            icon={bolt}
            alt="E-Bikes"
            count={eBikes}
            itemLoading={loading}
          />
          <StatusItem
            icon={parking}
            alt="Open docks"
            count={docksAvailable}
            itemLoading={loading}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default BikeShareStation;
