import React, { Component } from "react";

class Pdf extends Component {
      componentDidMount() {
            if (typeof window.orientation !== "undefined") {
                  document.getElementById("enlaceDescargarPdf").click();
                  window.close();
            }
      }

      render() {
            return (
                  <div
                        style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                        }}
                  >
                        <object
                              data="C:/Users/sibel/Downloads/Di8J6p28.pdf"
                              type="application/pdf"
                              width="100%"
                              height="100%"
                        >
                              <br />
                              <a
                                    href="C:/Users/sibel/Downloads/Di8J6p28.pdf"
                                    id="enlaceDescargarPdf"
                                    download="ReactJS.pdf"
                              >
                                    Tu dispositivo no puede visualizar los PDF,
                                    da click aquí para descargarlo
                              </a>
                        </object>
                  </div>
            );
      }
}

export default Pdf;
