import { MessageProps } from "./types";

const Message: React.FC<MessageProps> = ({ children, type }) => {
  return <div className={`alerta ${type}`}>{children}</div>;
};

export default Message;
