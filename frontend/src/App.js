import { Home } from "./Page/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProfilePage } from "./Page/ProfilePage";
import { ChangePassword } from "./Page/ChangePassword";
import { Navbar } from "./Components/Navbar/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
