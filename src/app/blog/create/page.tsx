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

  function createUser() {
    setLoading(true);
    if (!header || !author || !text) {
      setError("you have to fill all inputs ");
    } else {
      axios
        .post("/api/blog", {
          header,
          author,
          text,
        })
        .then((res) => {
          if (res.data.operation === "done") {
            axios.get("/api/blog").then((res) => {
              setData(res.data.data);
            });
            setLoading(false);
          }
          setHeader("");
          setAuthor("");
          setText("");
          setError("");
        });
    }
  }

  function deleteUser(id: any) {
    console.log("Deleting user with id:", id);
    
    setLoading(true);
    axios.delete(`/api/blog?id=${id}`).then((res) => {
      console.log("Response from delete:", res.data);
      if (res.data.operation === "done") {
        axios.get("/api/blog").then((res) => {
          setData(res.data.data);
        });
        setLoading(false);
      } else {
        console.error("Failed to delete user");
        setLoading(false);
      }
    }).catch((error) => {
      console.error("Error deleting user:", error);
      setLoading(false);
    });
  }

  useEffect(() => {
    axios.get("/api/blog").then((res) => {
      setData(res.data.data);
    });
  }, []);


  return (
    <div className='h-screen w-full flex flex-col justify-center items-center '>
      <div className='h-1/2'>
        <h1>Creating a Blogs</h1>
        <div className='flex justify-center flex-col items-center gap-5'>
          <input
            className='border-2 p-2 text-black'
            placeholder='name'
            onChange={(e) => {
              setHeader(e.target.value);
            }}
            value={header}
          />
          <input
            className='border-2 p-2 text-black'
            placeholder='lastName'
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            value={author}
          />
          <input
            className='border-2 p-2 text-black'
            placeholder='email'
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          />
          <button
            className='border-2 bg-green-700 p-2 rounded-lg text-white cursor-pointer'
            onClick={createUser}
          >
            {loading ? "loading" : "create user"}
          </button>
        </div>
      </div>
      <div className='h-1/2'>
        <div className='flex justify-center text-red-700'>{error}</div>
        <div className='flex justify-center'>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>last name</th>
                <th>email</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {
              
              data.map((user: any, index) => {
                return (
                  <tr key={index}>
                    <td>{user.header}</td>
                    <td>{user.author}</td>
                    <td>{user.text}</td>
                    <td>
                      <button
                        type='submit'
                        className='bg-red-600 text-white p-2 rounded-lg cursor-pointer'
                        value='delete user'
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                      >
                        delete user
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
