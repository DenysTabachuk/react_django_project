import "./Select.css";

export default function Select({
  name,
  values,
  defaultValue,
  handleChange,
  selectedValue,
}) {
  // let value;
  const handleSelectChange = (e) => {
    handleChange(name, e.target.value);
  };

  return (
    <div className="select-container">
      <select value={selectedValue} onChange={(e) => handleSelectChange(e)}>
        <option value="" disabled>
          {defaultValue}
        </option>
        {values.map((value, index) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      {selectedValue && (
        <i className="fas fa-times" onClick={() => handleChange(name, "")}></i>
      )}
    </div>
  );
}
