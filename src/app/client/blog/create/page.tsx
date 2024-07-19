"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
function Page() {
  const [header, setHeader] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  function createUser() {
    setIsFormVisible(true);
    setLoading(true);
    if (!header || !author || !text) {
      setError("fill up the form 😡");
      setLoading(true);
    } else {
      axios
        .post("/client/api/blog", {
          header,
          author,
          text,
        })
        .then((res) => {
          if (res.status === 200) {
            axios.get("/client/api/blog").then((res) => {
              console.log("res.data.blogs  get :", res.data.blogs.slice(-3));
              setData(res.data.blogs.slice(-3));
            });
            setLoading(false);
          }
          setHeader("");
          setAuthor("");
          setText("");
          setError("");
        })
        .catch((err) => {
          setError("An error occurred");
          setLoading(false);
        });
    }
  }

  function deleteUser(id: any) {
    setError("");
    setLoading(true);
    axios
      .delete(`/client/api/blog?id=${id}`)
      .then((res) => {
        

        if (res.data.operation === "done") {
          axios.get("/client/api/blog").then((res) => {
            setData(res.data.blogs.slice(-3));
            if (res.data.blogs.length === 0) {
              console.log("isFormEmpty is falsed");
      
              setIsFormVisible(false);
            } else {
              setIsFormVisible(true);
            }
          });
          setLoading(false);
        } else {
          setLoading(false);
        }
        
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  useEffect(() => {
    axios.get("/client/api/blog").then((res) => {
      console.log("get useEffect length: ", res.data.blogs.length);

      setData(res.data.blogs.slice(-3));
      if (res.data.blogs.length === 0) {
        console.log("isFormEmpty is falsed");

        setIsFormVisible(false);
      } else {
        setIsFormVisible(true);
      }
    });
  }, []);

  return (
    <div className='h-screen w-full flex flex-col justify-center items-center p-5 gap-10'>
      <div className='h-3/4 w-3/4 flex flex-col gap-5 '>
        <section>
          <h1 className='text-2xl text-gray-800  font-bold'>Creating a Blog</h1>
        </section>

        <section className='bg-slate-400 rounded-xl flex p-5 justify-center h-4/5 text-gray-800'>
          <div className='flex flex-col justify-between mr-14'>
            <label
              htmlFor='header'
              className='relative top-1 text-xl font-medium'
            >
              header
            </label>
            <label
              htmlFor='author'
              className='relative -top-9 text-xl font-medium'
            >
              author
            </label>
            <label
              htmlFor='text'
              className='relative -top-16 text-xl font-medium'
            >
              text
            </label>
          </div>
          <div className='flex flex-col gap-5 mr-20'>
            <input
              className='border-2 p-2 text-black rounded-xl '
              id='header'
              name='header'
              onChange={(e) => {
                setHeader(e.target.value);
                if (header && author && text) {
                  setError("");
                  setLoading(false);
                }
              }}
              value={header}
            />
            <input
              className='border-2 p-2 text-black rounded-xl'
              id='author'
              name='author'
              onChange={(e) => {
                setAuthor(e.target.value);
                if (header && author && text) {
                  setError("");
                  setLoading(false);
                }
              }}
              value={author}
            />
            <textarea
              className='border-2 p-2 text-black w-[180%] h-[150%] rounded-xl'
              id='text'
              name='text'
              onChange={(e) => {
                setText(e.target.value);
                if (header && author && text) {
                  setError("");
                  setLoading(false);
                }
              }}
              value={text}
            />
          </div>
        </section>

        <section className='flex justify-center '>
          <button
            className='bg-black p-2 px-4 rounded-3xl text-[#ecf0f1] text-xl font-bold cursor-pointer'
            onClick={createUser}
          >
            {loading ? "wait bro" : " ➕ create blog"}
          </button>
        </section>
      </div>

      <div className='h-1/2 w-3/4'>
        <div
          className={
            error &&
            "flex w-[100%] justify-center text-red-600 bg-black  p-3 rounded-xl mb-2 text-2xl font-bold"
          }
        >
          {error}
        </div>
        {isFormVisible ? (
          <div className='flex justify-center'>
            <table className='w-full bg-white shadow-md rounded-2xl'>
              <thead>
                <tr className='bg-slate-400 text-center text-gray-800 font-semibold uppercase text-sm '>
                  <th className='py-3 px-4 border-b rounded-tl-xl'>id</th>
                  <th className='py-3 px-4 border-b'>author</th>
                  <th className='py-3 px-4 border-b'>header</th>
                  <th className='py-3 px-4 border-b'>text</th>
                  <th className='py-3 px-4 border-b rounded-tr-xl'>actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user: any, index) => (
                  <tr key={index} className='hover:bg-gray-50 text-center '>
                    <td className='py-3 px-4 border-b '>{user.id}</td>
                    <td className='py-3 px-4 border-b'>{user.author}</td>
                    <td className='py-3 px-4 border-b'>{user.header}</td>
                    <td className='py-3 px-4 border-b'>{user.text}</td>
                    <td className='py-3 px-4 border-b'>
                      <button
                        type='submit'
                        className='bg-black text-red-600 font-medium p-2 rounded-lg cursor-pointer'
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                      >
                        delete blog
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='flex w-[100%] justify-center text-white bg-slate-400 p-3 rounded-xl mb-2 text-2xl font-bold'>
            No blogs to display
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
