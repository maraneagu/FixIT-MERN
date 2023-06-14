import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/pages/homePage";
import LoginPage from "scenes/pages/loginPage";
import ProfilePage from "scenes/pages/profilePage";
import ShowPost from "scenes/crud/show/showPost";
import CreatePostPage from "scenes/crud/create/createPostPage";
import EditProfilePage from "scenes/crud/edit/editProfilePage";
import ShowMoreFriends from "scenes/crud/show/showMoreFriends";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import EditPost from "scenes/crud/edit/editPost";
import CreateTipPage from "scenes/crud/create/createTipPage";
import TipsPage from "scenes/pages/tipsPage";
import EditTip from "scenes/crud/edit/editTip";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/createpost/:userId"
              element={isAuth ? <CreatePostPage /> : <Navigate to="/" />}
            />
            <Route
              path="/createtip/:userId"
              element={isAuth ? <CreateTipPage /> : <Navigate to="/" />}
            />
            <Route
              path="/edit/:userId"
              element={isAuth ? <EditProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/editpost/:postId"
              element={isAuth ? <EditPost /> : <Navigate to="/" />}
            />
            <Route
              path="/edittip/:tipId"
              element={isAuth ? <EditTip /> : <Navigate to="/" />}
            />
            <Route
              path="/showMoreFriends/:userId"
              element={isAuth ? <ShowMoreFriends /> : <Navigate to="/" />}
            />
            <Route
              path="/show/:postId"
              element={isAuth ? <ShowPost /> : <Navigate to="/" />}
            />
            <Route
              path="/tips"
              element={isAuth ? <TipsPage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
