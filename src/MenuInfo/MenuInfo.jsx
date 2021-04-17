import React from "react";
import styles from "./MenuInfo.module.scss";

function MenuInfo() {
  return (
    <div className={styles.menuInfo}>
      <h1 className={styles.title}>Cocktail Hour - 5:30 PM</h1>
      <h2 className={styles.title}>Passed Hors d'oeuvres</h2>
      <p>
        <b>Citrus Grilled Shrimp</b>
        <br/>
        Cilatro Orange Glaze
      </p>
      <p>
        <b>Wild Mushroom and Artisan Cheese Tart</b>
        <br/>
        Tarragon Aioli
      </p>
      <p>
        <b>Spanikopita</b>
        <br/>
        Spinach & Feta
      </p>
      <p>
        <b>Vegetable Spring Roll</b>
        <br/>
        Plum Teriyaki Glaze
      </p>
      <h1 className={styles.title}>Dinner Menu - 6:30 PM</h1>
      <h2 className={styles.title}>Plated Salad Course</h2>
      <p>
        <b>Celebrations Salad</b>
        <br/>
        Delicate mesclun greens with grape tomatoes, green onions, and a
        julienne of carrots
        <br/>
        Drizzled with an apple cider vinaigrette
      </p>
      <h2 className={styles.title}>Plated Entree</h2>
      <p>
        <b>Filet Mignon of Beef</b>
        <br/>
        Madeira wine reduction and apple horseradish cream
        <br/>
        Served with Yukon Gold Mashed Potatoes and Fresh Green Beans
      </p>
      <p>
        <b>Rosemary Roast Chicken</b>
        <br/>
        Lemon Caper Au Jus
        <br/>
        Served with Savory Herbed Rice Pilaf and Grilled Vegetable Trio
        <br/>
        (red peppers, asparagus, and yellow squash)
      </p>
      <p>
        <b>Chesapeake Style Crab Cake</b>
        <br/>
        Lump crab meat blended with savory herbs with creamy old bay mustard
        <br/>
        Served with Yukon Gold Mashed Potatoes and Fresh Green Beans
      </p>
      <p>
        <b>Butternut Squash Ravioli (Vegetarian)</b>
        <br/>
        Sun-dried tomato cream sauce drizzled with basil purée
        <br/>
        Served with Grilled Vegetable Trio
        <br/>
        (red peppers, asparagus, and yellow squash)
      </p>
    </div>
  );
}

export default MenuInfo;
