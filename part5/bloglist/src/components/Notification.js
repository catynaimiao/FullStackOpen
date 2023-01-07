const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const { type, content } = message;
  if (type === "error") return <div className="error">{content}</div>;
  if (type === "default") return <div className="default">{content}</div>;
  if (type === "success") return <div className="success">{content}</div>;
};

export default Notification;
