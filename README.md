# WMATA Arrival Dashboard

A simple React-based dashboard that displays real-time public transport arrival information for Washington Metropolitan Area Transit Authority (WMATA) stations.

## Features

- Real-time train and bus arrival predictions and Capital Bikeshare bike availability
- Station selection via dropdown menu
- Color-coded line indicators
- Auto-refresh every 10 seconds
- Dark/Light mode support
- URL parameter support for enhanced configurations

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your WMATA API key:
   ```
   VITE_WMATA_API_KEY=your_api_key_here
   VITE_METRO_STATION=D03  # Optional default station
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Select a station from the dropdown menu to view arrivals
- The display automatically updates every 10 seconds
- Train arrivals show the line color, destination, and time until arrival

## URL Parameters

The dashboard supports the following URL parameters for configuration:

- `rail`: WMATA 3-character station code to display train arrivals. Look up the station codes [here](https://gist.githubusercontent.com/emma-k-alexandra/a2da1c58732908c915ca729f2b55f392/raw/8dc7f0ee1e64efb4ec5ac73f9561e15bacb7982b/wmata-rail-stations-alphabetical.csv).

  ```
  ?rail=D03
  ```

- `cabi`: **Comma-separated** Capital Bikeshare station IDs. Look up the station IDs [here](https://opendata.dc.gov/datasets/DCGIS::capital-bikeshare-locations/explore).

  ```
  ?cabi=08246cd5-1f3f-11e7-bf6b-3863bb334450
  ```

- `bus`: **Comma-separated** WMATA 7-digit bus stop IDs. Look up the stop IDs [here](https://gis.wmata.com/mbsi/default.htm).

  ```
  ?bus=1002472,1002335
  ```

> [!NOTE]
> If you use this project as a dashboard, consider getting a WMATA API key to use this application. You can obtain one from the [WMATA Developer Portal](https://developer.wmata.com/).

- `api_key`: Your **optional** WMATA API key (please create one if you use this dashboard frequently)

  ```
  ?api_key=your_api_key_here
  ```

Example with multiple parameters:

```
https://whubsch.github.io/?cabi=08246cd5-1f3f-11e7-bf6b-3863bb334450,cdeeb133-ccd7-418f-a8d7-0b5c5380a8ae&bus=1002472,1002335&rail=K04
```

This configuration would show:

- Train arrivals for Ballston-MU
- Bike availability for two Capital Bikeshare stations
- Bus arrivals for two bus stops

## Technologies Used

- React
- Vite
- TypeScript
- Tailwind CSS
- HeroUI Components
- WMATA API

## License

[MIT License](LICENSE)
