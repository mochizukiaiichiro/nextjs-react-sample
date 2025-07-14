import { NextResponse } from "next/server";

export async function GET() {
  const url = `https://jsonplaceholder.typicode.com/users`;
  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json({ data });
}

