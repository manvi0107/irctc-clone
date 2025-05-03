document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const fromStation = document.getElementById('fromStation').value;
  const toStation = document.getElementById('toStation').value;

  // Example fixed input values for testing prediction (replace with real inputs)
  const payload = {
    baseFare: 200,
    reservationCharge: 40,
    superfastCharge: 30,
    fuelAmount: 60,
    distance: 500,
    duration: 6
  };

  fetch('https://1e9b-103-178-60-169.ngrok-free.app', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      if (data.predictedFare) {
        document.getElementById('results').innerHTML = `
          <h3>Train Found</h3>
          <p><strong>From:</strong> ${fromStation}</p>
          <p><strong>To:</strong> ${toStation}</p>
          <p><strong>Predicted Fare:</strong> ₹${data.predictedFare}</p>
        `;
      } else {
        document.getElementById('results').innerHTML = `<p>Error: ${data.error}</p>`;
      }
    })
    .catch(err => {
      document.getElementById('results').innerHTML = `<p>Error: ${err.message}</p>`;
    });
});
