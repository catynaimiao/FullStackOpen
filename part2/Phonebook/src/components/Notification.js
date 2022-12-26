const Notification = ({ message, errstate }) => {
  if (message === null) {
    return null;
  }

  return <div className={errstate}>{message}</div>;
};

export default Notification;