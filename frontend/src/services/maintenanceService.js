const BASE_URL = "http://127.0.0.1:5000/api/maintenance";

// Get all maintenance records
export async function getMaintenance() {
  const response = await fetch(BASE_URL);
  return await response.json();
}

// Add maintenance
export async function addMaintenance(maintenance) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(maintenance),
  });

  return await response.json();
}

// Update maintenance
export async function updateMaintenance(id, maintenance) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(maintenance),
  });

  return await response.json();
}

// Delete maintenance
export async function deleteMaintenance(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return await response.json();
}