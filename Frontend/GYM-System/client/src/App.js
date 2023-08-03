import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Container, Root } from "./style";
import Navbar from "./components/Navigation/Navbar";
import Homepage from "./components/Home/Homepage";
import Footer from "./components/Footer/Footer";
import SignupPage from "./components/auth/Signup/SignupPage";
import SignInPage from "./components/auth/SignIn/SignInPage";
import Dashboard from "./components/Dashboard/Dashboard";
import AboutUsPage from "./components/AboutUs/AboutUsPage";
import ContactUsPage from "./components/Contact/ContactUsPage";
import TeamPage from "./components/Team/TeamPage";

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userLogged, setUserLogged] = useState(false);


  // Retrieve user from session storage
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
    setUserRole(JSON.parse(sessionStorage.getItem("userRole")))
  }, [userLogged])
  


  return (
    <Root>
      <BrowserRouter>
        <Navbar user={user} userRole={userRole}/>
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/dashboard" /> : <Navigate to="home" />
              }
            />
            <Route
              path="/home"
              element={!user ? <Homepage /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/auth/login"
              element={user ? <Navigate to="/dashboard" /> : <SignInPage setUserLogged={setUserLogged}/>}
            />
            <Route
              path="/auth/signup"
              element={user ? <Navigate to="/dashboard" /> : <SignupPage />}
            />

            <Route
              path="/dashboard"
              element={user ? <Dashboard userRole={userRole}/> : <Navigate to="/" />}
            />
             <Route
              path="/aboutUs"
              element={<AboutUsPage />}
            />
             <Route
              path="/contactUs"
              element={<ContactUsPage />}
            />
             <Route
              path="/ourTeam"
              element={<TeamPage />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
      <Footer />
    </Root>
  );
}

export default App;
