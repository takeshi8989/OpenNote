import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // fetch(
    //   // "http://open-note-lb-806737518.us-west-2.elb.amazonaws.com:8080/api/v1/users"
    //   "http://localhost:8080/api/v1/users"
    //   // "https://openlibrary.org/books/OL7353617M.json"
    // )
    // .then((res) => res.json())
    // .then((data) => console.log(data));
    fetch("http://localhost:8080/api/v1/users", {
      method: "GET",
      headers: new Headers({
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZXd1c2VyIiwiaWF0IjoxNjc3MDk5NTk5LCJleHAiOjE2NzcxODU5OTl9.xWGdk90rFXvlfnJPUcZW4zEDVetP9jXn8HUB5Pz1pm8",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return <div>home</div>;
};

export default Home;
