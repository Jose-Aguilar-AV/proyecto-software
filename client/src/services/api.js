const API_URL = "http://localhost:4000/api"; // luego se reemplaza si cambian el puerto

export async function fetchData(endpoint) {
  const res = await fetch(`${API_URL}/${endpoint}`);
  return await res.json();
}
