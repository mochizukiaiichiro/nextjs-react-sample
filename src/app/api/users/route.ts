import { User } from "@/types/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = `https://jsonplaceholder.typicode.com/users`;
    const res:Response = await fetch(url);

    if (!res.ok) {
      return NextResponse.json(
        { error: "外部APIエラー" },
        { status: res.status }
      );
    }

    const users: User[] = await res.json();
    return NextResponse.json({ users });
  } catch (error) {
    console.log("API取得失敗", error);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}