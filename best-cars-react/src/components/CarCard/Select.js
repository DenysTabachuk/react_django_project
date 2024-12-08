export default function Select({values, selectedValue, handleChange, children}){
    return (
        <select value={selectedValue} onChange={handleChange}>
            <option value="">{selectedValue}</option>
            {values.map((value, index) => (
            <option key={value} value={value}>
                {value}
            </option>
            ))}
        </select>
    );
}