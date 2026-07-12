const BASE_URL = "http://127.0.0.1:5000/api/trips";

export async function getTrips() {
  const response = await fetch(BASE_URL);
  return response.json();
}

export async function addTrip(trip) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  });

  return response.json();
}

export async function updateTrip(id, trip) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  });

  return response.json();
}

export async function deleteTrip(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return response.json();
}