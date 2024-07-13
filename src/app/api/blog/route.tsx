import { NextRequest } from "next/server";

let blogs:any = [];
let blogIndex = 0;

export async function POST(req: Request, res: Response) {
  const data = await req.json();
  const header = data.header;
  const author = data.author;
  const text = data.text;
  const id = blogIndex;
  blogs[blogIndex] = { header, author, text, id };
  blogIndex++;

  return new Response(JSON.stringify({ operation: "done" }), { status: 200 });
}

export async function GET(req: Request, res: Response) {
  return new Response(JSON.stringify({ data: blogs }));
}

export async function DELETE(req: NextRequest, res: Response) {
  const id = req.nextUrl.searchParams.get("id");
  if (id === null || isNaN(Number(id))) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }

  const index = Number(id);
  if (index < 0 || index >= blogs.length) {
    return new Response(JSON.stringify({ error: "ID out of bounds" }), { status: 404 });
  }

  blogs.splice(index, 1);
  
  // برای بروزرسانی مقادیر id بعد از حذف یک عنصر
  blogs = blogs.map((blog:any, idx:any) => ({ ...blog, id: idx }));
  blogIndex = blogs.length;

  return new Response(JSON.stringify({ operation: "done" }), { status: 200 });
}
