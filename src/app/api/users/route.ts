export async function GET() {
  const url = `https://jsonplaceholder.typicode.com/users`;
  const res = await fetch(url);
  const data = await res.json();
  return Response.json({ data });
}

