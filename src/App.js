import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GeneradorCedula from "./components/generadorCedula";
import InformacionMascota from "./components/informacionMascota";
import ListDNI from "./components/listDNI";
import RegistrarDatos from "./components/registro";
import Pdf from "./components/viewerPdf";

function App() {
      return (
            <Router>
                  <Routes>
                        <Route path="/" exact element={<ListDNI />}></Route>
                        <Route
                              path="/cedula/:cc"
                              exact
                              element={<GeneradorCedula />}
                        ></Route>
                        <Route
                              path="/informacion/:cc"
                              exact
                              element={<InformacionMascota />}
                        ></Route>
                        <Route
                              path="/registro/:cc"
                              exact
                              element={<RegistrarDatos />}
                        ></Route>
                        <Route path="/pdf" exact element={<Pdf />}></Route>
                  </Routes>
            </Router>
      );
}

export default App;
