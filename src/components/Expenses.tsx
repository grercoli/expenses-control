import Expense from "./Expense";

import { ExpensesProps } from "./types";

const Expenses: React.FC<ExpensesProps> = ({ expenses, setExpenseToEdit, deleteExpense, filter, filteredExpenses }) => {
  const listOfExpenses = expenses.map((expense) => (
    <div key={expense.id}>
      <h2>{expenses.length ? "Expenses" : "No expenses yet"}</h2>
      <Expense expense={expense} setExpenseToEdit={setExpenseToEdit} deleteExpense={deleteExpense} />
    </div>
  ));

  const listOfFilteredExpenses = filteredExpenses.map((expense) => (
    <div key={expense.id}>
      <h2>{filteredExpenses.length ? "Expenses" : "No expenses for this category"}</h2>
      <Expense expense={expense} setExpenseToEdit={setExpenseToEdit} deleteExpense={deleteExpense} />
    </div>
  ));

  return <div className="listado-gastos contenedor">{filter ? listOfFilteredExpenses : listOfExpenses}</div>;
};

export default Expenses;
