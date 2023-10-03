const axios = require("axios");

async function flightMod(fly_from, fly_to, date_from, date_to, sort) {
  const API_KEY = "0tvfUPHxSK3axHyPv0wOlCKPcwcF-T7f";
  const BASE_URL = `https://api.tequila.kiwi.com/v2/search?fly_from=${fly_from}&fly_to=${fly_to}&date_from=${date_from}&date_to=${date_to}&sort=${sort}&limit=10&curr=USD`;
  const headers = {
    apikey: API_KEY,
  };

  try {
    const response = await axios.get(BASE_URL, { headers: headers });
    const data = response.data;
    const flights = [];

    for (let flight of data.data) {
      const price = flight.price;
      const duration = flight.duration.departure / 3600;
      const availability = flight.availability;

      let detail = "";
      flight.route.forEach((route, idx) => {
        detail += `<Stop-${idx}>: ${route.airline}${route.flight_no}, ${route.cityFrom}/${route.flyFrom} to ${route.cityTo}/${route.flyTo}, ${route.local_departure} to ${route.local_arrival} \r\n`;
      });

      const flightInfo = {
        price: price,
        duration: duration,
        availability: availability,
        route: detail,
      };

      flights.push(flightInfo);
    }

    return flights;
  } catch (error) {
    console.error("Error fetching flight data:", error);
    return [];
  }
}

//   getFlightInPeriod("NYC", "LAX", "2023-09-01", "2023-09-30", "price").then(
//     (flights) => console.log(flights)
//   );

module.exports = {
  flightMod,
};
