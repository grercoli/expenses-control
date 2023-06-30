import { useState, useEffect } from "react";

import { FilterProps } from "./types";

const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="filterExpenses">Filter Expenses</label>
          <select name="filterExpenses" id="filterExpenses" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">-- All Categories --</option>
            <option value="earnings">Earnings</option>
            <option value="food">Food</option>
            <option value="house">House</option>
            <option value="miscellaneous">Miscellaneous Expenses</option>
            <option value="freeTime">Free Time</option>
            <option value="health">Health</option>
            <option value="suscriptions">Suscriptions</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filter;
