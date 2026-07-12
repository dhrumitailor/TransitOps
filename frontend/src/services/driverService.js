const BASE_URL = "http://127.0.0.1:5000/api/drivers";

export async function getDrivers() {
  const response = await fetch(BASE_URL);
  return response.json();
}

export async function addDriver(driver) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(driver),
  });

  return response.json();
}

export async function updateDriver(id, driver) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(driver),
  });

  return response.json();
}

export async function deleteDriver(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return response.json();
}