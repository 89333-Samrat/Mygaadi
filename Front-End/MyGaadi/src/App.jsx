import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import HomeLanding from "./components/home-page-com/HomeLanding";
import ProfilePage from "./pages/ProfilePage";
import ShortlistedVehicles from "./pages/ShortlistedVehicles";
import AddCarForm from "./components/car-page/AddCarForm";
import AllCarsPage from "./components/car-page/AllCarsPage";
import CarDetailsPage from "./components/car-page/CarDetailsPage";
import FilterCar from "./components/car-page/FilteredCar";
import Myvehicles from "./pages/profile-pages/MyVehicles";
import ProfileUpdate from "./pages/profile-pages/ProfileUpdatePage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />}>
          <Route index element={<HomeLanding />} />
          <Route path="Profile" element={<ProfilePage />} />
          <Route path="MyWishList" element={<ShortlistedVehicles />} />
          <Route path="AddCar" element={<AddCarForm />} />
          <Route path="AllCar" element={<AllCarsPage />} />
          <Route path="cars/:carId" element={<CarDetailsPage />} />
          <Route path="Filtercar" element={<FilterCar />} />
          <Route path="MyVehicles" element={<Myvehicles />} />
          <Route path="ProfileUpdate" element={<ProfileUpdate />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
