import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Home from "./pages/home";
import Studio from "./pages/studio";
import Archive from "./pages/closet";
import About from "./pages/about";
import { authStore } from "./store/authStore";

function App() {
  const {} = authStore((state) => state);
  return (
    <>
      <BrowserRouter>
        <NavigationBar>
          <Routes>
            <>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/closet" element={<Archive />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
            </>
          </Routes>
        </NavigationBar>
      </BrowserRouter>
    </>
  );
}

export default App;
