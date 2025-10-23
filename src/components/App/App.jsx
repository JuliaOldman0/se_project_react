import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { register, authorize, checkToken } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setAuthMessage("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (cardToDelete) => {
    const token = localStorage.getItem("jwt");
    deleteItem(cardToDelete._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegister = (formData) => {
    register(formData)
      .then(() =>
        handleLogin({ email: formData.email, password: formData.password })
      )
      .catch((err) => {
        console.error(err);
        setAuthMessage("Registration failed. Please try again.");
      });
  };

  const handleLogin = (formData) => {
    authorize(formData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        navigate("/profile");
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
        setAuthMessage("Login failed. Please check your credentials.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/");
  };

  const switchToLogin = () => {
    setActiveModal("login");
  };

  const switchToRegister = () => {
    setActiveModal("register");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then(() => setIsLoggedIn(true))
        .catch(() => localStorage.removeItem("jwt"));
    }
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTempUnitContext.Provider
      value={{ currentTempUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            onLogin={switchToLogin}
            onRegister={switchToRegister}
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    weatherData={weatherData}
                    isLoggedIn={isLoggedIn}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div>Not Found</div>} /> // Fallback for undefined routes
          </Routes>

          <Footer />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteItem}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            message={authMessage}
            onSwitchToLogin={switchToLogin}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            message={authMessage}
            onSwitchToRegister={() => setActiveModal("register")}
          />
        </div>
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
