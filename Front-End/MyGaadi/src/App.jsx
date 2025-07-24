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
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />}>
          <Route index element={<HomeLanding />} />
          <Route path="Profile" element={<ProfilePage />} />
          <Route path="My-Short-List" element={<ShortlistedVehicles />} />
          <Route path="Filter" element={<Filter />} />
          <Route path="AddCar" element={<AddCarForm />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
