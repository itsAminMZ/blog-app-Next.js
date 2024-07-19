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
  const [isFormEmpty, setIsFormEmpty] = useState(true)


 

  function deleteUser(id: any) {
    setLoading(true);
    axios
      .delete(`/api/blog?id=${id}`)
      .then((res) => {
        if (res.data.operation === "done") {
          axios.get("/api/blog").then((res) => {
            setData((res.data.data).splice(-3));
            if((res.data.data).length !== 0 ){
              setIsFormEmpty(true)
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
    axios.get("/api/blog").then((res) => {
      setData((res.data.data).splice(-3));
      if((res.data.data).length !== 0 ){
        setIsFormEmpty(true)
    }
    });
  }, []);


  return (
    <div className='h-screen w-full flex flex-col  items-center p-5 gap-10'>
      <div className=' w-3/4 flex flex-col gap-5 '>
        <section>
          <h1 className='text-2xl font-bold'>Blogs</h1>
        </section>
      </div>

      <div className=' w-3/4'>
        <div
          className={
            error &&
            "flex w-[100%] justify-center text-red-600 bg-black p-3 rounded-xl mb-2 text-2xl font-bold"
          }
        >
          {error}
        </div>
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
              {
              data.map((user: any, index) => (
                <tr key={index} className='hover:bg-gray-50 text-center'>
                  <td className='py-3 px-4 border-b'>{user.id}</td>
                  <td className='py-3 px-4 border-b'>{user.author}</td>
                  <td className='py-3 px-4 border-b'>{user.header}</td>
                  <td className='py-3 px-4 border-b'>{user.text}</td>
                  <td className='py-3 px-4 border-b'>
                    <button
                      type='submit'
                      className='bg-red-600 text-white p-2 rounded-lg cursor-pointer'
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      delete user
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
