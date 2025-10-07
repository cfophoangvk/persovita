export async function addShipping(payload: any) {
  const res = await fetch("http://localhost:6789/api/shipping/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function getShipping() {
  const res = await fetch("http://localhost:6789/api/shipping/");
  return res.json();
}
