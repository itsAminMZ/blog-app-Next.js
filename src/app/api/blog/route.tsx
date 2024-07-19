import { NextRequest } from "next/server";

let blogs: any[] = [];
let idCounter = 0;


export async function POST(req: Request, res: Response) {
  const data = await req.json();
  const header = data.header;
  const author = data.author;
  const text = data.text;
  const id = idCounter++;
  blogs.push({ header, author, text, id });

  return Response.json({ operation: "done" }, { status: 200 });
}

export async function GET(req: Request, res: Response) {
  
  return Response.json({blogs},{status:200});
}

export async function DELETE(req: NextRequest, res: Response) {
  const id = req.nextUrl.searchParams.get("id");
  if (id === null || isNaN(Number(id))) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const index = blogs.findIndex(blog => blog.id === Number(id));
  if (index === -1) {
    return  Response.json({ error: "ID not found" }, { status: 404 });
  }

  blogs.splice(index, 1);

  return Response.json({ operation: "done" }, { status: 200 });
}
