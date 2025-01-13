import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PriceTable from "./components/PriceTable.js";
import AddFunctions from "./components/AddFunctions.js";
import AddMainImage from "./components/AddMainImage.js";
import AddAdditionalImages from "./components/AddAdditionalImages.js";
import { convertToSnakeCase, convertToCamelCase } from "../../utils/index.js";
import axiosConfig from "../../api/axiosConfig.js";
import "./AddOrEditCar.css";

const AddCarForm = () => {
  const accessToken = localStorage.getItem("access_token");
  const isAdmin = localStorage.getItem("is_admin");

  const [isLoading, setIsLoading] = useState(false);

  const [brands, setBrands] = useState([]);
  const [carClasses, setCarClasses] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [carData, setCarData] = useState({
    name: "",
    brand: "",
    class: "",
    gearBox: "",
    fuelType: "",
    consumption: "",
    engineVolume: "",
    enginePower: "",
    mainImage: null,
    additionalImages: [],
    additionalFunctions: [],
    description: "",
    prices: [
      { range: "1-3", price: 0, editing: false },
      { range: "4-9", price: 0, editing: false },
      { range: "10-25", price: 0, editing: false },
      { range: "26+", price: 0, editing: false },
    ],
  });

  const [errorsTexts, setErrorsTexts] = useState({
    brandError: "",
    classError: "",
    gearBoxError: "",
    fuelTypeError: "",
    globalError: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsCorrect = true;
    let newErrorsTexts = { ...errorsTexts };
    if (!carData.brand) {
      newErrorsTexts.brandError = "Обов'язково оберіть марку авто";
      formIsCorrect = false;
    } else {
      newErrorsTexts.brandError = "";
    }

    if (!carData.class) {
      newErrorsTexts.classError = "Обов'язково оберіть клас авто";
      formIsCorrect = false;
    } else {
      newErrorsTexts.classError = "";
    }

    if (!carData.gearBox) {
      newErrorsTexts.gearBoxError = "Обов'язково оберіть тип коробки передач";
      formIsCorrect = false;
    } else {
      newErrorsTexts.gearBoxError = "";
    }

    if (!carData.fuelType) {
      newErrorsTexts.fuelTypeError = "Обов'язково оберіть тип пального";
      formIsCorrect = false;
    } else {
      newErrorsTexts.fuelTypeError = "";
    }

    setErrorsTexts(newErrorsTexts);
    if (!formIsCorrect) {
      newErrorsTexts.globalError = "Заповніть всі поля";
      setErrorsTexts(newErrorsTexts);
      return;
    }

    const dataToSend = convertToSnakeCase(carData);

    dataToSend.prices = dataToSend.prices.map((price) => ({
      range: price.range,
      price: price.price,
    }));

    console.log("Data to send:", dataToSend);
    const formData = new FormData();
    for (const key of Object.keys(dataToSend)) {
      if (key === "additional_images") {
        dataToSend.additional_images.forEach((image, index) => {
          formData.append(`additional_images[${index}]`, image);
        });
      } else {
        const value =
          key === "additional_functions" || key === "prices"
            ? JSON.stringify(dataToSend[key])
            : dataToSend[key];
        formData.append(key, value);
      }
    }

    try {
      console.log("Id ", id);
      debugger;
      const result = isEditing
        ? await axiosConfig.put(`cars/${id}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await axiosConfig.post("cars/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log(
          "Помилка при виконанні запиту на оновлення машини:",
          error.message
        );
      }
    }
  };

  useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await axiosConfig.get("cars/brands/");
        setBrands(response.data);
        console.log("brands", response.data);
      } catch (error) {
        console.error("Error fetching brands data", error);
      }
    };

    const getCarData = async () => {
      try {
        const response = await axiosConfig.get(`cars/${id}/`);
        const carData = convertToCamelCase(response.data);
        console.log("Car data to edit", carData);

        if (carData.mainImageUrl) {
          //   // url To File
          console.log(carData.mainImageUrl);
          const imgResponse = await fetch(carData.mainImageUrl);
          const data = await imgResponse.blob();
          const mainImageFile = new File([data], carData.name + "main.jpeg", {
            type: "image/jpeg",
          });
          delete carData.mainImageUrl;
          carData.mainImage = mainImageFile;

          const additionalImageFiles = [];
          for (let i = 0; i < carData.additionalImages.length; i++) {
            const imageUrl = carData.additionalImages[i].image;
            if (imageUrl) {
              console.log(imageUrl);
              const imageResponse = await fetch(imageUrl);
              const imageData = await imageResponse.blob();
              const imageFile = new File(
                [imageData],
                `additional_image_${i + 1}.jpeg`,
                {
                  type: "image/jpeg",
                }
              );
              additionalImageFiles.push(imageFile);
            }
          }

          console.log("additionalImageFiles ", additionalImageFiles);
          carData.additionalImages = additionalImageFiles;
          delete carData.mainImageUrl;
          carData.mainImage = mainImageFile;
          setCarData(carData);
        }
        console.log("Car data we are editing ", carData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching car data", error);
      }
    };

    const getCarClasses = async () => {
      try {
        const response = await axiosConfig.get("cars/classes/");
        setCarClasses(response.data);
        console.log("car classes", response.data);
      } catch (error) {
        console.error("Error fetching car classes data", error);
      }
    };

    getBrands();
    getCarClasses();

    if (id) {
      setIsEditing(true);
      setIsLoading(true);
      getCarData();
    }
  }, [id]);

  return (
    <>
      <Header></Header>
      <div id="page-content">
        {isLoading ? (
          <h2>Завантаження</h2>
        ) : isAdmin ? (
          <>
            <h1 className="centered-text">Створення нового оголошення</h1>

            <form onSubmit={handleSubmit} id="add-new-car-form">
              <div id="column-container">
                <div id="column1">
                  {/* car name */}
                  <div className="input-container">
                    <label>Назва машини*</label>
                    <br />
                    <input
                      type="text"
                      name="name"
                      value={carData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-container">
                    <label>Марка*</label>
                    <br />

                    <select
                      name="brand"
                      value={carData.brand}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Оберіть марку авто
                      </option>
                      {brands.map((brand) => (
                        <option value={brand.id}>{brand.name}</option>
                      ))}
                    </select>

                    {errorsTexts.brandError && (
                      <p className="error-text">
                        <small>{errorsTexts.brandError}</small>
                      </p>
                    )}
                  </div>

                  <div className="input-container">
                    <label>Клас авто*</label>
                    <br />

                    <select
                      name="class"
                      value={carData.class}
                      onChange={handleChange}
                    >
                      <option value="">Оберіть клас авто</option>
                      {carClasses.map((carClass) => (
                        <option key={carClass[0]} value={carClass[0]}>
                          {carClass[1]}{" "}
                          {/* Виводимо назву класу, наприклад, "Бізнес" */}
                        </option>
                      ))}
                    </select>

                    {errorsTexts.classError && (
                      <p className="error-text">
                        <small>{errorsTexts.classError}</small>
                      </p>
                    )}
                  </div>

                  {/* Gear Box Radio Buttons */}
                  <div className="input-container">
                    <label>Коробка передач*</label>
                    <br />
                    <input
                      type="radio"
                      name="gearBox"
                      value="manual"
                      checked={carData.gearBox === "manual"}
                      onChange={handleChange}
                    />{" "}
                    Механічна
                    <input
                      type="radio"
                      name="gearBox"
                      value="automatic"
                      checked={carData.gearBox === "automatic"}
                      onChange={handleChange}
                    />{" "}
                    Автомат
                    <input
                      type="radio"
                      name="gearBox"
                      value="semi-automatic"
                      checked={carData.gearBox === "semi-automatic"}
                      onChange={handleChange}
                    />{" "}
                    Напівавтоматична
                  </div>

                  {/* Fuel Type Radio Buttons */}
                  <div className="input-container">
                    <label>Тип пального*</label>
                    <br />
                    <input
                      type="radio"
                      name="fuelType"
                      value="petrol"
                      checked={carData.fuelType === "petrol"}
                      onChange={handleChange}
                    />{" "}
                    Бензин
                    <input
                      type="radio"
                      name="fuelType"
                      value="diesel"
                      checked={carData.fuelType === "diesel"}
                      onChange={handleChange}
                    />{" "}
                    Дизель
                    <input
                      type="radio"
                      name="fuelType"
                      value="electricity"
                      checked={carData.fuelType === "electricity"}
                      onChange={handleChange}
                    />{" "}
                    Електроенергія
                    <input
                      type="radio"
                      name="fuelType"
                      value="hybrid"
                      checked={carData.fuelType === "hybrid"}
                      onChange={handleChange}
                    />{" "}
                    Гібрид
                  </div>

                  {/* Consumption */}
                  <div className="input-container">
                    <label>Розхід*</label>
                    <br />
                    <input
                      type="number"
                      step="0.1"
                      name="consumption"
                      value={carData.consumption}
                      onChange={handleChange}
                      required
                      min="0.1"
                    />
                  </div>

                  {/* Engine Volume */}
                  <div className="input-container">
                    <label>Об'м двигуна*</label>
                    <br />
                    <input
                      type="number"
                      step="0.1"
                      name="engineVolume"
                      value={carData.engineVolume}
                      onChange={handleChange}
                      required
                      min="0.1"
                    />
                  </div>

                  {/* Engine Power  */}
                  <div className="input-container">
                    <label>Потужність двигуна*</label>
                    <br />
                    <input
                      type="number"
                      name="enginePower"
                      step="0.1"
                      value={carData.enginePower}
                      onChange={handleChange}
                      required
                      min="0.1"
                    />
                  </div>

                  {/* Description */}
                  <div className="input-container">
                    <label>Опис</label>
                    <br />
                    <textarea
                      name="description"
                      value={carData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div id="column2">
                  <AddFunctions
                    carDataObj={carData}
                    setCarData={setCarData}
                  ></AddFunctions>
                  <PriceTable
                    carDataObj={carData}
                    setCarData={setCarData}
                  ></PriceTable>
                  <AddMainImage
                    carDataObj={carData}
                    setCarData={setCarData}
                  ></AddMainImage>
                  <AddAdditionalImages
                    carDataObj={carData}
                    setCarData={setCarData}
                  ></AddAdditionalImages>
                </div>
              </div>

              <div id="global-error-container">
                {errorsTexts.classError && (
                  <p className="error-text centered-text">
                    <big>{errorsTexts.globalError}</big>
                  </p>
                )}
                <br />
              </div>
              <div id="add-car-button-container">
                <button id="add-edit-car-button" type="submit">
                  {isEditing ? "Редагувати оголошення" : "Додати оголошення"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1>Для створення оголошення необхідні права адміністратора.</h1>
            <p>
              <big>
                Якщо ви впевнені, що у вас мають бути права адміністратора
                спробуйте перелогінитися на аккаунт.
              </big>
            </p>
          </>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};

export default AddCarForm;
