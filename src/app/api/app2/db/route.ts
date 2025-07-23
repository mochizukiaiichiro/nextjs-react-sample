import Database from "better-sqlite3";
import { NextResponse } from "next/server";

export async function GET() {
  const db = new Database("src/app/api/app2/db/database.sqlite3");

  // テーブル作成
  db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT
  );
`);

  // データ挿入
  // const names = ["name1", "name2",];
  // const insert = db.prepare("INSERT INTO users (name) VALUES (?)");
  // names.forEach((name) => {
  //   insert.run(name);
  // });

  const users = db.prepare("SELECT * FROM users").all();
  return NextResponse.json({ users });
}
