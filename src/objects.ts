export interface TrainPrediction {
  Car: string;
  Destination: string;
  DestinationCode: string;
  DestinationName: string;
  Line: string;
  Min: string;
}

export interface BusPrediction {
  DirectionNum: string;
  DirectionText: string;
  Minutes: number;
  RouteID: string;
  TripID: string;
  VehicleID: string;
}

export interface BusStopResponse {
  Predictions: BusPrediction[];
  StopName: string;
}
