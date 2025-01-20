# WMATA Train Arrival Dashboard

A simple React-based dashboard that displays real-time train arrival information for Washington Metropolitan Area Transit Authority (WMATA) stations.

## Features

- Real-time train arrival predictions
- Station selection via dropdown menu
- Color-coded line indicators
- Auto-refresh every 10 seconds
- Dark/Light mode support
- URL parameter support for station selection

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
- Alternatively, use URL parameters to specify a station: `?station=D03`
- The display automatically updates every 10 seconds
- Train arrivals show the line color, destination, and time until arrival

## Technologies Used

- React
- Vite
- TypeScript
- Tailwind CSS
- HeroUI Components
- WMATA API

## License

[MIT License](LICENSE)

## Note

If you use this project as a dashboard, consider getting a WMATA API key to use this application. You can obtain one from the [WMATA Developer Portal](https://developer.wmata.com/) and pass it as a URL parameter (`?api_key=your_api_key_here`).
