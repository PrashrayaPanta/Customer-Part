import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

import PrivateRoute from "./Routes/PrivateRoute";

import * as Pages from "./pages";

function App() {
  return (
    <>
      {/* <Login /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Pages.CustomerVisible.Home />} />

            <Route path="register" element={<Pages.Auth.Register />} />
            <Route path="login" element={<Pages.Auth.Login />} />
            <Route
              path="product/:id"
              element={<Pages.CustomerVisible.Detail />}
            />
            <Route
              path="category/:id"
              element={<Pages.CustomerVisible.Categories />}
            />
            <Route path="brand/:id" element={<Pages.CustomerVisible.Brand />} />
            <Route path="search" element={<Pages.CustomerVisible.Search />} />
            <Route
              path="cart"
              element={
                <PrivateRoute element={<Pages.CustomerVisible.Cart />} />
              }
            />
             <Route
              path="dashboard"
              element={
                <PrivateRoute element={<Pages.Profile.Dashboard />} />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
