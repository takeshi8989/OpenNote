import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      // navigate login
      return;
    }
    const url: string = process.env.API_URL as string;
    fetch(`${url}/users`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return <div>home update</div>;
};

export default Home;
