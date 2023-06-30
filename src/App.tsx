import { useState, useEffect } from "react";

import Header from "./components/Header";
import Modal from "./components/Modal";
import Expenses from "./components/Expenses";
import Filter from "./components/Filter";

import { generateId } from "./helpers";

import { Expense } from "./components/types";

import NewExpenseIcon from "./assets/nuevo-gasto.svg";

const App = () => {
  const [budget, setBudget] = useState(Number(localStorage.getItem("budget")) ?? 0);
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>(
    localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")!) : []
  );
  const [expenseToEdit, setExpenseToEdit] = useState({});
  const [filter, setFilter] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    if (Object.keys(expenseToEdit).length > 0) {
      // has something so open modal
      setModal(true);

      setTimeout(() => {
        setModalAnimation(true);
      }, 500);
    }
  }, [expenseToEdit]);

  useEffect(() => {
    localStorage.setItem("budget", String(budget) ?? 0);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses) ?? []);
  }, [expenses]);

  useEffect(() => {
    const budgetInLS = Number(localStorage.getItem("budget")) ?? 0;

    if (budgetInLS > 0) {
      setIsValidBudget(true);
    }
  }, []);

  useEffect(() => {
    if (filter) {
      // Filter expenses by category
      const filteredExp = expenses.filter((expense) => expense.category === filter);

      setFilteredExpenses(filteredExp);
    }
  }, [filter]);

  const handleNewExpense = () => {
    setModal(true);
    setExpenseToEdit({});

    setTimeout(() => {
      //Animating modal after 3 secs
      setModalAnimation(true);
    }, 500);
  };

  const saveExpense = (expense: Expense) => {
    if (expense.id) {
      const updatedExpenses = expenses.map((expState) => (expState.id === expense.id ? expense : expState));
      setExpenses(updatedExpenses);
      setExpenseToEdit({});
    } else {
      expense.id = generateId();
      setExpenses([...expenses, expense]);
    }

    setModalAnimation(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter((expState) => expState.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        expenses={expenses}
        setExpenses={setExpenses}
      />

      {isValidBudget && (
        <>
          <main>
            <Filter filter={filter} setFilter={setFilter} />
            <Expenses
              expenses={expenses}
              setExpenseToEdit={setExpenseToEdit}
              deleteExpense={deleteExpense}
              filter={filter}
              filteredExpenses={filteredExpenses}
            />
          </main>
          <div className="nuevo-gasto">
            <img src={NewExpenseIcon} alt="New expense icon" onClick={handleNewExpense} />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          modalAnimation={modalAnimation}
          setModalAnimation={setModalAnimation}
          saveExpense={saveExpense}
          expenseToEdit={expenseToEdit}
          setExpenseToEdit={setExpenseToEdit}
        />
      )}
    </div>
  );
};

export default App;
