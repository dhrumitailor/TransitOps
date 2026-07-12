const BASE_URL = "http://127.0.0.1:5000/api/fuel";

export async function getFuel() {
  const response = await fetch(BASE_URL);
  return await response.json();
}

export async function addFuel(fuel) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fuel),
  });

  return await response.json();
}

export async function deleteFuel(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return await response.json();
}