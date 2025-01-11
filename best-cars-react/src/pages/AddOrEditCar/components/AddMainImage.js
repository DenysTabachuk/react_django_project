import { useRef } from "react";
import AddSmthImage from "./AddSmthImage";

export default function AddMainImage({ carDataObj, setCarData }) {
  console.log(carDataObj);
  const fileInputRef = useRef(null);

  const handleDeleteMainImage = () => {
    setCarData({ ...carDataObj, mainImage: null });
  };

  const handleAddMainImage = () => {
    fileInputRef.current.click();
  };

  const handleMainImageChange = (e) => {
    setCarData({
      ...carDataObj,
      mainImage: e.target.files[0],
    });
  };

  return (
    <>
      <label>Основне фото авто</label>
      <div id="main-image-container">
        {carDataObj.mainImage ? (
          <>
            <div className="added-image-container">
              <img
                className="delete-image-icon"
                src="/icons/bin.png"
                alt=""
                onClick={handleDeleteMainImage}
              />

              <img
                className="added-image"
                src={URL.createObjectURL(carDataObj.mainImage)}
              ></img>
            </div>
          </>
        ) : (
          <>
            <input
              id="input-main-photo"
              type="file"
              name="mainImage"
              onChange={handleMainImageChange}
              ref={fileInputRef}
            />
            <AddSmthImage
              handleImageClick={handleAddMainImage}
              imageId={"add-main-img"}
            ></AddSmthImage>
          </>
        )}
      </div>
    </>
  );
}
