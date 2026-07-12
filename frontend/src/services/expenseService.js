const BASE_URL = "http://127.0.0.1:5000/api/expenses";

export async function getExpenses() {
  const response = await fetch(BASE_URL);
  return await response.json();
}

export async function addExpense(expense) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  return await response.json();
}

export async function deleteExpense(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return await response.json();
}