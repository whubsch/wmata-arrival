import stationsJson from "../assets/stations.json";

export function getStationName(stationCode: string): string {
  const station = stationsJson.stations.find((stationJson) =>
    stationJson.code.includes(stationCode),
  );
  return station?.name || stationCode;
}

export function formatStationName(name: string): string {
  return name
    .replace("Grv", "Grove")
    .replace("N Car", "New Car")
    .replace("MtVern Sq", "Mount Vernon Square");
}
