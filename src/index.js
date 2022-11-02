import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./index.css";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarLink,
  MDBNavbarNav,
} from "mdb-react-ui-kit";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MDBNavbar expand="md" dark bgColor="primary">
          <MDBContainer fluid>
            <MDBNavbarBrand href="/"> MdB StudentBoard </MDBNavbarBrand>
            <MDBNavbarNav className="me-auto">
              <MDBNavbarLink href="/">Home</MDBNavbarLink>
              <MDBNavbarLink href="/students">Studenten</MDBNavbarLink>
              <MDBNavbarLink href="/courses">Cursussen</MDBNavbarLink>
              <MDBNavbarLink href="/assignments">Opdrachten</MDBNavbarLink>
            </MDBNavbarNav>
          </MDBContainer>
        </MDBNavbar>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
