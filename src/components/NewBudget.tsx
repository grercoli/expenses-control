import { useState } from "react";

import Message from "./Message";

import { NewBudgetProps } from "./types";

const NewBudget: React.FC<NewBudgetProps> = ({ budget, setBudget, setIsValidBudget }) => {
  const [message, setMessage] = useState("");

  const handleBudget = (e: React.FormEvent) => {
    e.preventDefault();

    if (!budget || budget < 0) {
      setMessage("It's not a valid budget");
      return;
    }

    setMessage("");
    setIsValidBudget(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handleBudget}>
        <div className="campo">
          <label htmlFor="newBudget">Define Budget</label>
          <input
            id="newBudget"
            name="newBudget"
            type="number"
            className="nuevo-presupuesto"
            placeholder="Add your budget"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>

        <input type="submit" value="Add" />

        {message && <Message type="error">{message}</Message>}
      </form>
    </div>
  );
};

export default NewBudget;
