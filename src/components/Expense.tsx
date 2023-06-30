import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { formatDate } from "../helpers";

import { ExpenseProps } from "./types";

import EarningsIcon from "../assets/icono_ahorro.svg";
import HouseIcon from "../assets/icono_casa.svg";
import FoodIcon from "../assets/icono_comida.svg";
import MiscellaneousIcon from "../assets/icono_gastos.svg";
import FreeTimeIcon from "../assets/icono_ocio.svg";
import HealthIcon from "../assets/icono_salud.svg";
import SuscriptionsIcon from "../assets/icono_suscripciones.svg";

const iconsDictionary: any = {
  earnings: EarningsIcon,
  food: FoodIcon,
  house: HouseIcon,
  miscellaneous: MiscellaneousIcon,
  freeTime: FreeTimeIcon,
  health: HealthIcon,
  suscriptions: SuscriptionsIcon,
};

const Expense: React.FC<ExpenseProps> = ({ expense, setExpenseToEdit, deleteExpense }) => {
  const { category, name, date, quantity, id } = expense;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setExpenseToEdit(expense)}>Edit</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => deleteExpense(id)} destructive>
        Remove
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={iconsDictionary[category]} alt="Expense Icon" />
            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto">
                Agregado el: <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${quantity}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Expense;
