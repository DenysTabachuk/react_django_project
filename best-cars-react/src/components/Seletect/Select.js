import "./Select.css";

export default function Select({
  values,
  defaultValue,
  handleChange,
  selectedValue,
}) {
  const handleSelectChange = (event) => {
    handleChange(event.target.value);
  };

  console.log("default value", defaultValue);
  return (
    <div className="select-container">
      <select value={selectedValue} onChange={handleSelectChange}>
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
        <i className="fas fa-times" onClick={() => handleChange("")}></i>
      )}
    </div>
  );
}
