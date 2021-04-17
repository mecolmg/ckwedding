import React from "react";
import Footer from "Footer/Footer";
import MenuInfo from "MenuInfo/MenuInfo";
import Navigation from "Navigation/Navigation";

function MenuInfoView() {
  return (
    <div>
      <Navigation />
      <MenuInfo />
      <Footer />
    </div>
  );
}

export default MenuInfoView;
