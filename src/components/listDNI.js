import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import "../styles/listDNI.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const ListDNI = () => {
      const [codigos, setCodigos] = useState([]);
      const [pets, setPets] = useState([]);
      const baseUrl = process.env.REACT_APP_API_URL;
      const urlCodificacion = "https://desarrollo.rumas.com.co/informacion/";
      const theme = createTheme();
      const navigate = useNavigate();

      theme.typography.subtitle2 = {
            fontSize: "1rem",
            "@media (max-width:600px)": {
                  fontSize: "0.8rem",
            },
      };

      useEffect(() => {
            traerPets();
            generateUUID();
      }, []);

      const traerPets = () => {
            fetch(baseUrl + "/cedulacion/mascotas")
                  .then((res) => res.json())
                  .then((res) => setPets(res));
      };

      const generateUUID = () => {
            for (let i = 0; i < 6; i++) {
                  var d = new Date().getTime();
                  var uuid = "xxx4xxyx".replace(/[xy]/g, function (c) {
                        var r = (d + Math.random() * 16) % 16 | 0;
                        d = Math.floor(d / 16);
                        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
                  });

                  codigos.push({
                        id: i + 1,
                        codigo: uuid,
                  });
            }
      };

      return (
            <Container>
                  <ThemeProvider theme={theme}>
                        <Grid
                              container
                              justifyContent="center"
                              md={12}
                              alignItems="center"
                        >
                              <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    justifyContent="center"
                              >
                                    <Typography
                                          variant="h5"
                                          component="h2"
                                          align="center"
                                          style={{
                                                marginTop: "12px",
                                                marginBottom: "20px",
                                                color: "#404040",
                                          }}
                                    >
                                          <b>Codigos QR Disponibles 1232323</b>
                                    </Typography>
                              </Grid>

                              <Grid
                                    container
                                    justifyContent="center"
                                    alignItems={"center"}
                                    xs={12}
                                    sm={12}
                                    md={12}
                              >
                                    <Grid item xs={12} sm={12} md={10}>
                                          <ThemeProvider theme={theme}>
                                                <table
                                                      className="table table-bordered  mt-1 table-hover"
                                                      style={{
                                                            background:
                                                                  "#f6fbfe",
                                                            width: "100%",
                                                            fontFamily:
                                                                  "Roboto",
                                                      }}
                                                >
                                                      <thead className="thead-dark">
                                                            <tr
                                                                  style={{
                                                                        textAlign:
                                                                              "center",
                                                                  }}
                                                            >
                                                                  <th scope="col">
                                                                        NO.
                                                                  </th>
                                                                  <th scope="col">
                                                                        CÓDIGO
                                                                  </th>
                                                                  <th scope="col">
                                                                        QR
                                                                  </th>
                                                                  <th scope="col">
                                                                        OPCIONES
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {codigos.map(
                                                                  (item) => (
                                                                        <tr>
                                                                              <td scope="row">
                                                                                    <Typography
                                                                                          variant="subtitle2"
                                                                                          align="center"
                                                                                    >
                                                                                          {
                                                                                                item.id
                                                                                          }
                                                                                    </Typography>
                                                                              </td>
                                                                              <td>
                                                                                    <Typography
                                                                                          variant="h6"
                                                                                          align="center"
                                                                                    >
                                                                                          <b>
                                                                                                {
                                                                                                      item.codigo
                                                                                                }
                                                                                          </b>
                                                                                    </Typography>
                                                                              </td>
                                                                              <td
                                                                                    style={{
                                                                                          textAlign:
                                                                                                "center",
                                                                                          display: "flex",
                                                                                          justifyContent:
                                                                                                "center",
                                                                                    }}
                                                                              >
                                                                                    <div
                                                                                          style={{
                                                                                                maxHeight: 90,
                                                                                                maxWidth: 90,
                                                                                                width: "100%",
                                                                                                border: "solid 3px grey",
                                                                                                padding: "4px",
                                                                                                borderRadius:
                                                                                                      "5px",
                                                                                          }}
                                                                                    >
                                                                                          <QRCode
                                                                                                size={
                                                                                                      256
                                                                                                }
                                                                                                style={{
                                                                                                      height: "auto",
                                                                                                      maxWidth: "100%",
                                                                                                      width: "100%",
                                                                                                      borderRadius:
                                                                                                            "5px",
                                                                                                }}
                                                                                                value={`https://desarrollo.rumas.com.co/informacion/${item.codigo}`}
                                                                                                viewBox={`0 0 256 256`}
                                                                                          />
                                                                                    </div>
                                                                              </td>

                                                                              <td
                                                                                    style={{
                                                                                          textAlign:
                                                                                                "center",
                                                                                    }}
                                                                              >
                                                                                    <Button
                                                                                          variant="contained"
                                                                                          color="primary"
                                                                                          onClick={() =>
                                                                                                navigate(
                                                                                                      `registro/${item.codigo}`
                                                                                                )
                                                                                          }
                                                                                    >
                                                                                          ASIGNAR
                                                                                          CÓDIGO
                                                                                    </Button>
                                                                              </td>
                                                                        </tr>
                                                                  )
                                                            )}
                                                      </tbody>
                                                </table>
                                          </ThemeProvider>
                                    </Grid>
                              </Grid>
                        </Grid>
                  </ThemeProvider>
            </Container>
      );
};

export default ListDNI;
