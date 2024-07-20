import { revalidatePath } from "next/cache";

const blogs: any[] = [];
let idCounter: number = 0;

async function createUser(formData: FormData) {
  "use server";
  const header = formData.get("header");
  const author = formData.get("author");
  const text = formData.get("text");
  idCounter++;
  const id = idCounter;
  blogs.push({ header, author, text, id });
  revalidatePath("/server2");
}

async function deleteUser(formData: FormData) {
  "use server";
  
  const id = formData.get("id");
  const shouldBeDeleted = blogs.findIndex((blog) => blog.id === Number(id));

  
  blogs.splice(shouldBeDeleted, 1);
  revalidatePath("/server2");
}

function Page() {
  return (
    <main>
      <section>
        <form action={createUser}>
          <label htmlFor='header'>header</label>
          <input type='text' name='header' id='header' />

          <label htmlFor='author'>author</label>
          <input type='text' name='author' id='author' />

          <label htmlFor='text'>text</label>
          <textarea name='text' id='text' />

          <input type='submit' name='submit' id='submit' />
        </form>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>header</th>
              <th>author</th>
              <th>text</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog: any, index) => {
              return (
                <tr key={index}>
                  <td>{blog.id}</td>
                  <td>{blog.header}</td>
                  <td>{blog.author}</td>
                  <td>{blog.text}</td>
                  <td>
                    <form action={deleteUser}>                        
                    <input name="id" value={blog.id} className="hidden" />
                        <input
                          type="submit"
                          className="bg-black text-red-600 font-medium p-2 rounded-lg cursor-pointer"
                          value="delete blog"
                        />
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Page;
