import { Header } from "@/components/header/Header";
import React from "react";

const Home = () => {
  // useEffect(() => {
  //   if (localStorage.getItem("token") === null) {
  //     // navigate login
  //     return;
  //   }
  //   const url: string = process.env.API_URL as string;
  //   fetch(`${url}/users`, {
  //     method: "GET",
  //     headers: new Headers({
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <div>
      <Header />
      <div>Hello world!</div>
    </div>
  );
};

export default Home;
