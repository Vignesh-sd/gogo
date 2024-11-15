// The URL of your deployed Edge function
const edgeFunctionUrl = 'https://ocndhcklbgtrtlrdrwer.supabase.co/functions/v1/bigquery/getSwapStationDetails';

async function callEdgeFunction() {
  const bikeNumber = 'UFS474S';
  const payload = { bikeNumber };

  try {
    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jbmRoY2tsYmd0cnRscmRyd2VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1MTU1MjIsImV4cCI6MjAzMzA5MTUyMn0.hL5GsW44Exs3rjuWrwjJV1PnCbELAJ3eWAu75MQ0Sf8'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("API Response:", data); // Log the entire response to check its structure

    const swapStationDetails = document.getElementById('swapStationDetails');

    if (response.ok && Array.isArray(data)) {
      // Clear previous content
      swapStationDetails.innerHTML = '';

      // Iterate over each station in the array
      data.forEach(station => {
        const stationDetails = `
          <div>
            <p>Station ID: ${station.id}</p>
            <p>Name: ${station.name}</p>
            <p>Latitude: ${station.latitude}</p>
            <p>Longitude: ${station.longitude}</p>
            <p>Batteries:</p>
            <ul>
              <li>Total: ${station.batteries.total}</li>
              <li>Charge 0%: ${station.batteries.charge0}</li>
              <li>Charge 10%: ${station.batteries.charge10}</li>
              <li>Charge 20%: ${station.batteries.charge20}</li>
              <li>Charge 30%: ${station.batteries.charge30}</li>
              <li>Charge 40%: ${station.batteries.charge40}</li>
              <li>Charge 50%: ${station.batteries.charge50}</li>
              <li>Charge 60%: ${station.batteries.charge60}</li>
              <li>Charge 70%: ${station.batteries.charge70}</li>
              <li>Charge 80%: ${station.batteries.charge80}</li>
              <li>Charge 90%: ${station.batteries.charge90}</li>
            </ul>
          </div>
          <hr />
        `;

        // Append each station's details to the container
        swapStationDetails.innerHTML += stationDetails;
      });
    } else {
      swapStationDetails.innerHTML = `<p>Error: No data available or unknown error occurred.</p>`;
    }
  } catch (error) {
    console.error('Request failed:', error);
    document.getElementById('swapStationDetails').innerHTML = `<p>Error: Request failed. Please try again later.</p>`;
  }
}



// Call the edge function when the page loads
document.addEventListener('DOMContentLoaded', callEdgeFunction);
