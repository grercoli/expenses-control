import { useState, useEffect } from "react";

import Message from "./Message";

import { ModalProps } from "./types";

import CloseBtn from "../assets/cerrar.svg";

const Modal: React.FC<ModalProps> = ({
  setModal,
  modalAnimation,
  setModalAnimation,
  saveExpense,
  expenseToEdit,
  setExpenseToEdit,
}) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (Object.keys(expenseToEdit).length > 0) {
      setName(expenseToEdit.name);
      setQuantity(expenseToEdit.quantity);
      setCategory(expenseToEdit.category);
      setMessage(expenseToEdit.message);
      setId(expenseToEdit.id);
    }
  }, []);

  const hideModal = () => {
    setModalAnimation(false);
    setExpenseToEdit({});

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if ([name, quantity, category].includes("")) {
      setMessage("Every field is required");

      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    saveExpense({ name, quantity, category, id, date: Date.now() });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CloseBtn} alt="Close modal" onClick={hideModal} />
      </div>

      <form className={`formulario ${modalAnimation ? "animar" : "cerrar"}`} onSubmit={handleSubmit}>
        <legend>{expenseToEdit.name ? "Edit Expense" : "New Expense"}</legend>

        {message && <Message type="error">{message}</Message>}

        <div className="campo">
          <label htmlFor="name">Expense Name</label>
          <input
            type="text"
            id="name"
            placeholder="Add the expense name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            placeholder="Add the quantity of the expense"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="category">Category</label>
          <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="earnings">Earnings</option>
            <option value="food">Food</option>
            <option value="house">House</option>
            <option value="miscellaneous">Miscellaneous Expenses</option>
            <option value="freeTime">Free Time</option>
            <option value="health">Health</option>
            <option value="suscriptions">Suscriptions</option>
          </select>
        </div>

        <input type="submit" value={expenseToEdit.name ? "Save Changes" : "Add Expense"} />
      </form>
    </div>
  );
};

export default Modal;
