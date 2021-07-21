import React from "react";
import Footer from "Footer/Footer.jsx";
import ThingsToDo from "ThingsToDo/ThingsToDo.jsx";
import Navigation from "Navigation/Navigation.jsx";

function ThingsToDoView() {
  return (
    <div>
      <Navigation />
      <ThingsToDo />
      <Footer />
    </div>
  );
}

export default ThingsToDoView;
