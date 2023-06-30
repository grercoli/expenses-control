type BooleanDispatchFunc = React.Dispatch<React.SetStateAction<boolean>>;

export interface HeaderProps {
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
  isValidBudget: boolean;
  setIsValidBudget: BooleanDispatchFunc;
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

export interface NewBudgetProps extends Pick<HeaderProps, "budget" | "setBudget" | "setIsValidBudget"> {}

export interface BudgetControlProps
  extends Pick<HeaderProps, "budget" | "expenses" | "setExpenses" | "setBudget" | "setIsValidBudget"> {}

export interface MessageProps {
  children: React.ReactNode;
  type: string;
}

export interface ModalProps {
  modalAnimation: boolean;
  saveExpense: (e: Expense) => void;
  setModal: BooleanDispatchFunc;
  setModalAnimation: BooleanDispatchFunc;
  expenseToEdit: any;
  setExpenseToEdit: any;
}

export interface Expense {
  category: string;
  date: number;
  id: string;
  name: string;
  quantity: number;
}

export interface ExpensesProps {
  expenses: Expense[];
  setExpenseToEdit: any;
  deleteExpense: (id: string) => void;
  filter: string;
  filteredExpenses: Expense[];
}

export interface ExpenseProps {
  expense: Expense;
  setExpenseToEdit: any;
  deleteExpense: (id: string) => void;
}

export interface FilterProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}
