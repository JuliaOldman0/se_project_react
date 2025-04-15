import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ clothingItems, handleCardClick, handleAddClick, weatherData }) {
    return (
        <div className="profile">
            <section className="profile__sidebar">
                <SideBar />
            </section>
            <section className="profile__clothing-items">
                <ClothesSection 
                clothingItems={clothingItems} 
                handleCardClick={handleCardClick}
                weatherData={weatherData}
                handleAddClick={handleAddClick} 
                />
            </section>
        </div>
    );
}

export default Profile;
