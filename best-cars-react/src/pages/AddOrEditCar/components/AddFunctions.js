import { useState } from "react";
import AddSmthImage from "./AddSmthImage";


export default function AddFunctions({carDataObj, setCarData}){
    const [addingFunction, setAddingFunction] = useState(false);
    const [enteredFunction, setEnteredFunction] = useState('');

    const handleFunctionInput = (e) => {
        setEnteredFunction(e.target.value);
    }

    const handleAddFunction = () => {
        setAddingFunction(  !addingFunction);
    }

    const handleSaveFunction = () => {
        setCarData({...carDataObj,
            additionalFunctions : [ ...carDataObj.additionalFunctions, enteredFunction]
        })
        setAddingFunction(!addingFunction);
        setEnteredFunction('');
    }

    const handleDeleteFunction = (key) => {
        setCarData({...carDataObj,
            additionalFunctions : carDataObj.additionalFunctions.filter(item => item !== key)
        })
    }

    return (
        <>
        <label>Додаткові функції</label>
        {carDataObj.additionalFunctions.map( (func) =>
            <div className="func-container" key={func}>
                <span>{func}</span>
                <div className="bin-icon-container">
                    <img className="icon" src="/icons/bin.png" onClick={() => handleDeleteFunction(func)} alt="bin icon" />
                </div>
            </div>
         ) }

        { addingFunction ?
                <div id="input-function-container">
                <input type="text" 
                value={enteredFunction} 
                onChange={handleFunctionInput}/>
                
                <button 
                id="add-function-button" 
                type="button"  
                onClick={handleSaveFunction}>Додати</button>

                <button 
                id="cancel-action-button" 
                onClick={handleAddFunction}
                type="button">Відмінити</button>
               </div>
            :
              <AddSmthImage 
              handleImageClick = {handleAddFunction} 
              inputType = {"text"}
              imageId = {"add-function-image"}  
              ></AddSmthImage>         
        }
        <br />
        </>
    );
}