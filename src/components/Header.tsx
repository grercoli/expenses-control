import NewBudget from "./NewBudget";
import BudgetControl from "./BudgetControl";

import { HeaderProps } from "./types";

const Header: React.FC<HeaderProps> = ({
  budget,
  setBudget,
  isValidBudget,
  setIsValidBudget,
  expenses,
  setExpenses,
}) => {
  return (
    <header>
      <h1>Expense Planner</h1>

      {isValidBudget ? (
        <BudgetControl
          budget={budget}
          expenses={expenses}
          setExpenses={setExpenses}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      ) : (
        <NewBudget budget={budget} setBudget={setBudget} setIsValidBudget={setIsValidBudget} />
      )}
    </header>
  );
};

export default Header;
