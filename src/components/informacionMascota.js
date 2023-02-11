import { Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";

const InformacionMascota = () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      const { cc } = useParams();
      const [datosMascota, setDatosMascota] = useState([]);
      const theme = createTheme();
      const navigate = useNavigate();

      theme.typography.subtitle2 = {
            fontSize: "1rem",
            "@media (max-width:600px)": {
                  fontSize: "0.8rem",
            },
      };
      useEffect(() => {
            infoMascota();
      }, []);

      const infoMascota = () => {
            fetch(baseUrl + `/cedulacion/datosmascota/${cc}`)
                  .then((res) => res.json())
                  .then((res) => {
                        if (res.length === 0) {
                              Swal.fire({
                                    position: "center",
                                    icon: "warning",
                                    title: "Ups!!",
                                    text:
                                          "El código " +
                                          cc +
                                          " No tiene ninguna Cédula asignada",
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                    timer: 6000,
                                    showClass: {
                                          popup: "animate__animated animate__fadeInDown",
                                    },
                                    hideClass: {
                                          popup: "animate__animated animate__fadeOutUp",
                                    },
                              }).then(() => {
                                    window.location = `/registro/${cc}`;
                              });
                        } else {
                              setDatosMascota(res);
                        }
                  });
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
                                                marginBottom: "12px",
                                                color: "#404040",
                                          }}
                                    >
                                          <b>Información de la mascota</b>
                                    </Typography>
                              </Grid>

                              {datosMascota.map((d) => (
                                    <Grid
                                          container
                                          justifyContent="center"
                                          alignItems={"center"}
                                          xs={12}
                                          sm={12}
                                          md={7}
                                    >
                                          <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                style={{
                                                      display: "flex",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                }}
                                          >
                                                <div
                                                      style={{
                                                            width: "150px",
                                                            height: "150px",
                                                            border: "solid 5px #057FC7",
                                                            borderRadius: "5px",
                                                      }}
                                                >
                                                      <img
                                                            width={"100%"}
                                                            height={"100%"}
                                                            src={d.Url}
                                                      />
                                                </div>
                                          </Grid>
                                          <Grid item xs={12} sm={10} md={12}>
                                                <ThemeProvider theme={theme}>
                                                      <table
                                                            className="table table-bordered table-sm mt-1 table-hover"
                                                            style={{
                                                                  background:
                                                                        "#f6fbfe",
                                                            }}
                                                      >
                                                            <thead>
                                                                  <tr
                                                                        style={{
                                                                              background:
                                                                                    "#057FC7",
                                                                              color: "white",
                                                                        }}
                                                                  >
                                                                        <th colSpan="5">
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    align="center"
                                                                              >
                                                                                    <b>
                                                                                          DATOS
                                                                                          DE
                                                                                          LA
                                                                                          MASCOTA
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                  </tr>
                                                            </thead>

                                                            <tbody>
                                                                  <tr>
                                                                        <th
                                                                              colSpan="1"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          ID
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                        <th
                                                                              colSpan="4"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          {
                                                                                                d.cc
                                                                                          }
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                  </tr>
                                                                  <tr>
                                                                        <th
                                                                              colSpan="1"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          NOMBRE
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                        <th
                                                                              colSpan="3"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                              >
                                                                                    {
                                                                                          d.Nombre
                                                                                    }
                                                                              </Typography>
                                                                        </th>
                                                                  </tr>
                                                                  <tr>
                                                                        <th
                                                                              colSpan="2"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          FECHA
                                                                                          DE
                                                                                          NACIMIENTO
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                        <th
                                                                              colSpan="2"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                              >
                                                                                    {
                                                                                          d.FecNacimiento
                                                                                    }
                                                                              </Typography>
                                                                        </th>
                                                                  </tr>
                                                                  <tr>
                                                                        <th
                                                                              colSpan="2"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          ESPECIE
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                        <th
                                                                              colSpan="2"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    {(d.Tipo ===
                                                                                          "PERRO" &&
                                                                                          "CANINO") ||
                                                                                          "FELINO"}
                                                                              </Typography>
                                                                        </th>
                                                                  </tr>

                                                                  <tr>
                                                                        <th
                                                                              colSpan="2"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          SEXO
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                        <th
                                                                              colSpan="2"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    {
                                                                                          d.Sexo
                                                                                    }
                                                                              </Typography>
                                                                        </th>
                                                                  </tr>

                                                                  <tr>
                                                                        <th
                                                                              colSpan="2"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          RAZA
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                        <th
                                                                              colSpan="2"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    {
                                                                                          d.Raza
                                                                                    }
                                                                              </Typography>
                                                                        </th>
                                                                  </tr>
                                                                  <tr>
                                                                        <th
                                                                              colSpan="2"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          TAMAÑO
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                        <th
                                                                              colSpan="2"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          {
                                                                                                d.Tamaño
                                                                                          }
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                  </tr>
                                                                  <tr>
                                                                        <th
                                                                              colSpan="1"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          RESIDENCIA
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                        <th
                                                                              colSpan="4"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    {
                                                                                          d.Lugar
                                                                                    }
                                                                              </Typography>
                                                                        </th>
                                                                  </tr>

                                                                  <tr
                                                                        style={{
                                                                              background:
                                                                                    "#057FC7",
                                                                              color: "white",
                                                                        }}
                                                                  >
                                                                        <th colSpan="5">
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    align="center"
                                                                              >
                                                                                    <b>
                                                                                          DATOS
                                                                                          DEL
                                                                                          PROPIETARIO
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                  </tr>

                                                                  <tr>
                                                                        <th
                                                                              colSpan="1"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          C.C
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                        <th
                                                                              colSpan="4"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          {
                                                                                                d.IdPropietario
                                                                                          }
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                  </tr>
                                                                  <tr>
                                                                        <th
                                                                              colSpan="1"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          NOMBRE
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                        <th
                                                                              colSpan="4"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    {
                                                                                          d.NomPropietario
                                                                                    }
                                                                              </Typography>
                                                                        </th>
                                                                  </tr>
                                                                  <tr>
                                                                        <th
                                                                              colSpan="1"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          DIRECCIÓN
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                        <th
                                                                              colSpan="4"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    {
                                                                                          d.Direccion
                                                                                    }
                                                                              </Typography>
                                                                        </th>
                                                                  </tr>
                                                                  <tr>
                                                                        <th
                                                                              colSpan="1"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <b>
                                                                                          TELÉFONO
                                                                                    </b>
                                                                              </Typography>
                                                                        </th>
                                                                        <th
                                                                              colSpan="4"
                                                                              scope="rowgroup"
                                                                        >
                                                                              <Typography
                                                                                    variant="subtitle2"
                                                                                    component="h2"
                                                                                    align="start"
                                                                                    style={{
                                                                                          color: "#404040",
                                                                                    }}
                                                                              >
                                                                                    <a
                                                                                          href={`https://api.whatsapp.com/send?phone=+57${d.Telefono}&text=Hola, He encontrado a tu peludito ${d.Nombre}!`}
                                                                                    >
                                                                                          {
                                                                                                d.Telefono
                                                                                          }
                                                                                    </a>
                                                                              </Typography>
                                                                        </th>
                                                                  </tr>
                                                            </tbody>
                                                      </table>
                                                </ThemeProvider>
                                          </Grid>
                                    </Grid>
                              ))}
                        </Grid>
                  </ThemeProvider>
            </Container>
      );
};
export default InformacionMascota;
