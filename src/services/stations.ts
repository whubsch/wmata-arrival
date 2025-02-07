import stationsJson from "../assets/stations.json";

interface Station {
  code: string[];
  name: string;
  lines: string[];
}

export function getStations(): Station[] {
  return stationsJson.stations;
}

export function getStation(stationCode: string): Station {
  const station = stationsJson.stations.find((stationJson) =>
    stationJson.code.includes(stationCode),
  );
  if (!station) {
    throw new Error(`Station ${stationCode} not found`);
  }
  return station;
}

export function getStationName(stationCode: string): string {
  const station = getStation(stationCode);
  return station?.name || stationCode;
}

export function formatStationName(name: string): string {
  return name
    .replace(/Grv$/, "Grove")
    .replace("N Car", "New Car")
    .replace(/Mt ?Vern\b/, "Mount Vernon")
    .replace("NewCrlton", "New Carrollton")
    .replace(/Sq/, "Square")
    .replace(/(Av|Ave)$/, "Avenue");
}

export function formatBusStationName(name: string): string {
  const directionals = ["nw", "ne", "sw", "se", "n", "s", "e", "w"];
  const dirRegex = new RegExp(`\\b(${directionals.join("|")})\\b`, "gi");

  return name
    .replace(/\+\w/, (match) => match.toUpperCase())
    .replace(dirRegex, (match) => match.toUpperCase())
    .replace(/\+/, " & ")
    .replaceAll(/\s+/g, " ")
    .replace(/Av\b/, "Ave")
    .replace(/-([a-z])/g, (_, letter) => `-${letter.toUpperCase()}`);
}
