import "./Select.css";

export default function Select({
  name,
  values,
  defaultValue,
  handleChange,
  selectedValue,
}) {
  const handleSelectChange = (e) => {
    if (name) {
      handleChange(name, e.target.value);
    } else {
      console.log("e.target.value", e.target.value);
      handleChange(e.target.value);
    }
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
