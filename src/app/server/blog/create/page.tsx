import { revalidatePath } from "next/cache";

export const blogs: any[] = [];
export let idCounter = 0;

export default async function Page() {
  async function createUserAction(formData: any) {
    "use server";
    const header = formData.get("header");
    const author = formData.get("author");
    const text = formData.get("text");

    if (!header || !author || !text) {
      console.error("Please fill out all fields");
      return;
    }

    const id = idCounter++;
    blogs.push({ header, author, text, id });
    revalidatePath("/users/signup");
  }

  async function deleteUserAction(formData: any) {
    "use server";
    const id = formData.get("id");

    if (!id) {
      console.error("Invalid ID");
      return;
    }

    const index = blogs.findIndex((blog) => blog.id === Number(id));
    if (index === -1) {
      console.error("Blog not found");
      return;
    }

    blogs.splice(index, 1);
    revalidatePath("/users/signup");
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center p-5">
      <div className="h-3/4 w-3/4 flex flex-col gap-5">
        <section>
          <h1 className="text-2xl font-bold">Creating a Blog</h1>
        </section>
        <form
          className="bg-slate-400 rounded-xl flex p-5 justify-center h-4/5 text-gray-800 gap-10"
          action={createUserAction}
          method="post"
        >
          <div className="flex flex-col justify-between mr-14">
            <label htmlFor="header" className="relative top-1 text-xl font-medium">
              Header
            </label>
            <label htmlFor="author" className="relative -top-20 text-xl font-medium">
              Author
            </label>
            <label htmlFor="text" className="relative -top-28 text-xl font-medium">
              Text
            </label>
          </div>
          <div className="flex flex-col gap-5 mr-20">
            <input
              className="border-2 p-2 text-black rounded-xl"
              id="header"
              name="header"
              placeholder="header"
            />
            <input
              className="border-2 p-2 text-black rounded-xl"
              id="author"
              name="author"
              placeholder="author"
            />
            <textarea
              className="border-2 p-2 text-black w-[180%] h-[150%] rounded-xl "
              id="text"
              name="text"
              placeholder="text"
            />
            <input
              className="bg-black p-2 px-4  rounded-3xl text-[#ecf0f1] text-xl font-bold cursor-pointer"
              type="submit"
              value=" ➕ create blog"
            />
          </div>
        </form>
      </div>
      <div className="h-1/2 w-3/4">
        {blogs.length === 0 && (
          <div className="flex w-[100%] justify-center text-white bg-slate-400 p-3 rounded-xl mb-2 text-2xl font-bold">
            No blogs to display
          </div>
        )}
        {blogs.length > 0 && (
          <div className="flex justify-center">
            <table className="w-full bg-white shadow-md rounded-2xl">
              <thead>
                <tr className="bg-slate-400 text-center text-gray-800 font-semibold uppercase text-sm">
                  <th className="py-3 px-4 border-b rounded-tl-xl">ID</th>
                  <th className="py-3 px-4 border-b">Author</th>
                  <th className="py-3 px-4 border-b">Header</th>
                  <th className="py-3 px-4 border-b">Text</th>
                  <th className="py-3 px-4 border-b rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.slice(-3).map((blog, index) => (
                  <tr key={index} className="hover:bg-gray-50 text-center">
                    <td className="py-3 px-4 border-b">{blog.id}</td>
                    <td className="py-3 px-4 border-b">{blog.author}</td>
                    <td className="py-3 px-4 border-b">{blog.header}</td>
                    <td className="py-3 px-4 border-b">{blog.text}</td>
                    <td className="py-3 px-4 border-b">
                      <form action={deleteUserAction} method="post">
                        <input name="id" value={blog.id} className="hidden" />
                        <input
                          type="submit"
                          className="bg-black text-red-600 font-medium p-2 rounded-lg cursor-pointer"
                          value="delete blog"
                        />
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
