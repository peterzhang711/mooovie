import React, { useState, useEffect } from "react";
import { NavLink, Route } from "react-router-dom";
import Header from "./components/Header";
import Amc from "./pages/Amc";
import Arclight from "./pages/Arclight";
import PacificTheatres from "./pages/PacificTheatres";
import axios from "axios";
import "./App.css";

function App() {
  const [Theater, setTheater] = useState([]);

  useEffect(async () => {
    const theater = await axios("http://localhost:3001/theater");
    if (theater) {
      setTheater([...theater.data]);
    }
  }, []);

  return (
    <div className="App">
      <div className="logo">
        <Header />
      </div>
      <div className="movie-lists">
        <NavLink
          activeClassName="active"
          className="list-item"
          to={{
            pathname: "/Arclight",
            showtimes: { id: Theater[0] && Theater[0].showtimes },
          }}
        >
          {Theater[0] && Theater[0].name}
        </NavLink>
        <NavLink
          activeClassName="active"
          className="list-item"
          to={{
            pathname: "/Arclight",
            showtimes: { id: Theater[1] && Theater[1].showtimes },
          }}
        >
          {Theater[1] && Theater[1].name}
        </NavLink>
        <NavLink
          activeClassName="active"
          className="list-item"
          to={{
            pathname: "/Arclight",
            showtimes: { id: Theater[2] && Theater[2].showtimes },
          }}
        >
          {Theater[2] && Theater[2].name}
        </NavLink>
      </div>
      <div className="movie-items">
        <Route path="/Arclight" component={Arclight} />
        <Route path="/PacificTheatres" component={PacificTheatres} />
        <Route path="/Amc" component={Amc} />
      </div>
    </div>
  );
}

export default App;
