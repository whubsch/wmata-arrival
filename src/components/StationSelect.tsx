import { Autocomplete, AutocompleteItem } from "@heroui/react";
import stations from "../assets/stations.json";
import { LineChip } from "./LineChip";

interface StationSelectProps {
  selectedStation: string;
  onStationChange: (value: string) => void;
}

export function StationSelect({
  selectedStation,
  onStationChange,
}: StationSelectProps) {
  const sortedStations = [...stations.stations].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <Autocomplete
      label="Select a station"
      className="w-80"
      defaultSelectedKey={selectedStation}
      onSelectionChange={(key) => onStationChange(key as string)}
      scrollShadowProps={{
        isEnabled: false,
      }}
    >
      {sortedStations.map((station) => (
        <AutocompleteItem key={station.code[0]} textValue={station.name}>
          <div className="flex items-center justify-between gap-2">
            <span className="overflow-x-auto whitespace-nowrap max-w-64">
              {station.name}
            </span>
            <div className="flex gap-1">
              {station.lines.map((line) => (
                <LineChip key={line} line={line} size="sm" />
              ))}
            </div>
          </div>
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
