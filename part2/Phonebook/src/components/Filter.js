const Filter = ({ condition, handleConditionChange }) => {
  return (
    <div>
      filter shown with:
      <input value={condition} onChange={handleConditionChange} />
    </div>
  );
};

export default Filter;
