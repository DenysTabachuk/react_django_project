import { useRef } from "react";
import AddSmthImage from "./AddSmthImage";

export default function AddMainImage({ carDataObj, setCarData }) {
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

  console.log("CarDataObj 111", carDataObj);
  return (
    <>
      <label>Основне фото авто</label>
      <div id="main-image-container">
        {carDataObj.mainImageUrl ? (
          <>
            <div className="added-image-container">
              <img
                className="delete-image-icon"
                src="/icons/bin.png"
                alt=""
                onClick={handleDeleteMainImage}
              />
              {carDataObj.mainImageUrl instanceof File ? (
                <img
                  className="added-image"
                  src={URL.createObjectURL(carDataObj.mainImageUrl)}
                ></img>
              ) : (
                <img
                  className="added-image"
                  src={carDataObj.mainImageUrl}
                ></img>
              )}
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
