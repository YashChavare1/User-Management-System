import { Home } from "./Page/Home Page/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfilePage } from "./Page/Profile Page/ProfilePage";
import { ChangePassword } from "./Page/Change Password Page/ChangePassword";
import { Navbar } from "./Components/Navbar/Navbar";

function App() {
  const userToken = localStorage.getItem("token");

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={userToken ? <ProfilePage /> : <Navigate to="/" />} />
          <Route path="/change-password" element={userToken ? <ChangePassword /> : <Navigate to="/" />} />
          <Route path="*" element={ <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;