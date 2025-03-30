import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ clothingItems, weatherData }) {
    return (
        <div className="profile">
            <section className="profile__sidebar">
                <SideBar />
            </section>
            <section className="profile__clothing-items">
                <ClothesSection clothingItems={clothingItems} weatherData={weatherData} />
            </section>
        </div>
    );
}

export default Profile;
