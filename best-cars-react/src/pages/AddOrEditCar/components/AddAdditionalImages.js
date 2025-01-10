import { useRef } from "react";
import AddSmthImage from "./AddSmthImage";

export default function AddAdditionalImages({ carDataObj, setCarData }) {
  const fileInputRef = useRef(null);

  const handleDeleteImage = (index) => {
    setCarData({
      ...carDataObj,
      additionalImages: carDataObj.additionalImages.filter(
        (_, i) => i !== index
      ),
    });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    setCarData({
      ...carDataObj,
      additionalImages: [...carDataObj.additionalImages, e.target.files[0]],
    });
  };

  return (
    <>
      <label>Додаткові фото</label>
      <div id="additional-images-container">
        {carDataObj.additionalImages.map((img, index) => (
          <div div className="added-image-container">
            <img
              className="delete-image-icon"
              src="/icons/bin.png"
              alt="delete image icon"
              onClick={() => handleDeleteImage(index)}
            />
            {img instanceof File ? (
              <img className="added-image" src={URL.createObjectURL(img)}></img>
            ) : (
              <img className="added-image" src={img.image}></img>
            )}
          </div>
        ))}
        <input
          id="input-main-photo"
          type="file"
          name="additionalImage"
          onChange={handleImageChange}
          ref={fileInputRef}
        />

        <AddSmthImage
          handleImageClick={handleImageClick}
          imageId={"add-additional-img"}
        ></AddSmthImage>
      </div>
    </>
  );
}
