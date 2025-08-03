import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import HomeLanding from "./components/home-page-com/HomeLanding";
import ProfilePage from "./pages/ProfilePage";
import Filter from "./pages/Filter";
import ShortlistedVehicles from "./pages/ShortlistedVehicles";
import AddCarForm from "./components/car-page/AddCarForm";
import WishList from "./components/home-page-com/Wishlist";
import AllCarsPage from "./components/car-page/AllCarsPage";
import CarDetailsPage from "./components/car-page/CarDetailsPage";
import FilterCar from "./components/car-page/FilteredCar";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />}>
          <Route index element={<HomeLanding />} />
          <Route path="Profile" element={<ProfilePage />} />
          <Route path="WishList" element={<WishList />} />
          <Route path="My-Short-List" element={<ShortlistedVehicles />} />
          <Route path="Filter" element={<Filter />} />
          <Route path="AddCar" element={<AddCarForm />} />
          <Route path="AllCar" element={<AllCarsPage />} />
          <Route path="cars/:carId" element={<CarDetailsPage />} />
          <Route path="Filtercar" element={<FilterCar />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
