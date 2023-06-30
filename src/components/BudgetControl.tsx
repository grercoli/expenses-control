import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { BudgetControlProps } from "./types";

const BudgetControl: React.FC<BudgetControlProps> = ({
  budget,
  expenses,
  setExpenses,
  setBudget,
  setIsValidBudget,
}) => {
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);
  const [percentage, setPercentage] = useState(0);

  //listen to expenses changes
  useEffect(() => {
    const totalSpent = expenses.reduce((total, expense) => expense.quantity + total, 0);

    const totalAvailable = budget - totalSpent;

    // calculate the percentage spent
    const newPercentage = Number((((budget - totalAvailable) / budget) * 100).toFixed(2));

    setTimeout(() => {
      setPercentage(newPercentage);
    }, 500);

    setSpent(totalSpent);
    setAvailable(totalAvailable);
  }, [expenses]);

  const formatBudget = (quantity: number) => {
    return quantity.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const response = confirm("Would you like to reset app?");

    if (response) {
      setExpenses([]);
      setBudget(0);
      setIsValidBudget(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: percentage > 100 ? "#DC2626" : "#3B82F6",
          })}
          text={`${percentage}% Spent`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Reset App
        </button>
        <p>
          <span>Budget: </span>
          {formatBudget(budget)}
        </p>

        <p className={`${available < 0 ? "negativo" : ""}`}>
          <span>Available: </span>
          {formatBudget(available)}
        </p>

        <p>
          <span>Spent: </span>
          {formatBudget(spent)}
        </p>
      </div>
    </div>
  );
};

export default BudgetControl;
