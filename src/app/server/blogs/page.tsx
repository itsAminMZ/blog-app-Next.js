// pages/blogs/page.tsx
import {blogs,idCounter} from '@/app/server/blog/create/page'

import { revalidatePath } from "next/cache";




// Ensure this action is correctly handled on the server side
async function deleteUserAction(formData: FormData) {
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
  revalidatePath("/blogs"); // Adjust path as needed
}

export default async function Page() {
  // Fetch all blogs
  const fetchBlogs = () => {
    return blogs;
  };

  // Simulate data fetching
  const allBlogs = fetchBlogs();

  return (
    <div className='h-screen w-full flex flex-col items-center p-5 gap-10'>
      <div className='w-3/4 flex flex-col gap-5'>
        <section>
          <h1 className='text-2xl font-bold'>Blogs</h1>
        </section>
      </div>

      <div className='w-3/4'>
        {allBlogs.length === 0 && (
          <div className='flex w-[100%] justify-center text-white bg-slate-400 p-3 rounded-xl mb-2 text-2xl font-bold'>
            No blogs to display
          </div>
        )}
        {allBlogs.length > 0 && (
          <div className='flex justify-center'>
            <table className='w-full bg-white shadow-md rounded-2xl'>
              <thead>
                <tr className='bg-slate-400 text-center text-gray-800 font-semibold uppercase text-sm'>
                  <th className='py-3 px-4 border-b rounded-tl-xl'>ID</th>
                  <th className='py-3 px-4 border-b'>Author</th>
                  <th className='py-3 px-4 border-b'>Header</th>
                  <th className='py-3 px-4 border-b'>Text</th>
                  <th className='py-3 px-4 border-b rounded-tr-xl'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allBlogs.map((blog, index) => (
                  <tr key={index} className='hover:bg-gray-50 text-center'>
                    <td className='py-3 px-4 border-b'>{blog.id}</td>
                    <td className='py-3 px-4 border-b'>{blog.author}</td>
                    <td className='py-3 px-4 border-b'>{blog.header}</td>
                    <td className='py-3 px-4 border-b'>{blog.text}</td>
                    <td className='py-3 px-4 border-b'>
                      <form action={deleteUserAction} method='post'>
                        <input name='id' value={blog.id} className='hidden' />
                        <input
                          type='submit'
                          className='bg-black text-red-600 font-medium p-2 rounded-lg cursor-pointer'
                          value='delete blog'
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
