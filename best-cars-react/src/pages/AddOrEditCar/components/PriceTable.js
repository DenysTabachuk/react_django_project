import React, { useState } from "react";

export default function PriceTable({ carDataObj, setCarData }) {
  const [prices, setPrices] = useState(carDataObj.prices);

  function handleEditPrices(index) {
    const copyPrices = [...prices];
    copyPrices[index] = {
      ...copyPrices[index],
      editing: !copyPrices[index].editing,
    };
    setPrices(copyPrices);
  }

  function handleChangePrice(index, newPrice) {
    const copyPrices = [...prices];
    copyPrices[index] = { ...copyPrices[index], price: newPrice };
    setPrices(copyPrices);
    setCarData({ ...carDataObj, prices: copyPrices });
  }

  console.log("PriceTable: ", prices);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Оренда</th>
            <th>Ціна</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {prices.map((item, index) => (
            <tr key={index} className="price-row">
              <td>{item.range} дн.</td>
              <td className="cell-input-container">
                <input
                  type="number"
                  className="price-input"
                  value={item.price}
                  onChange={(e) =>
                    handleChangePrice(index, parseInt(e.target.value))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
