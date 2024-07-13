import { NextRequest } from "next/server";

let blogs:any = []
let blogIndex = blogs.length


export async function POST(req: Request, res: Response) {
  const data = await req.json();
  const header = data.header;
  const author = data.author;
  const text = data.text;
  const id = blogIndex
//   blogs.push({header,author,text,id})
  blogs[blogIndex]= {header,author,text,id}
blogIndex++

  return Response.json({ operation: "done"},{status:200});
}

export async function GET(req: Request, res: Response) {
//   const users = await Users.findAll();
  return Response.json({data: blogs});
}

export async function DELETE(req: NextRequest, res: Response) {
  const id = req.nextUrl.searchParams.get("id");
  if(!id){
    return
  }
    console.log('id in database',id);
    blogs[id].remove()
  
//   blogs[id]
  
//   Users.destroy({ where: { id } });
  return Response.json({ operation: "done" });
}
