import React, { useState, useEffect } from "react";
import {
      Container,
      Grid,
      Typography,
      Button,
      Autocomplete,
} from "@mui/material";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
      MuiPickersUtilsProvider,
      KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import {
      Card,
      Dialog,
      DialogActions,
      DialogContent,
      DialogTitle,
      Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const RegistrarDatos = () => {
      const { cc } = useParams();
      const baseUrl = process.env.REACT_APP_API_URL;
      const fecha = new Date();
      const fechaActual =
            fecha.getFullYear() +
            "-" +
            (fecha.getMonth() + 1) +
            "-" +
            fecha.getDate();
      const [openModal, setOpenModal] = useState(false);
      const [visible, setVisible] = useState(true);
      const [propietarios, setPropietarios] = useState([]);
      const [actualizar, setActualizar] = useState(false);
      const [file, setFile] = useState(null);
      const navigate = useNavigate();
      const theme = createTheme();

      useEffect(() => {
            fetch(baseUrl + "/cedulacion/propietarios")
                  .then((res) => res.json())
                  .then((res) => setPropietarios(res));
            //setActualizar(!actualizar);
      }, []);

      const verificarCedula = (values) => {
            fetch(baseUrl + `/cedulacion/datosmascota/${cc}`)
                  .then((res) => res.json())
                  .then((res) => {
                        if (res.length > 0) {
                              Swal.fire({
                                    position: "center",
                                    icon: "error",
                                    title: "Ups!!",
                                    text:
                                          "El código " +
                                          values.cc +
                                          " Ya esta asignado a una Cédula",
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
                                    navigate("/");
                              });
                        } else {
                              peticioHTTP(values);
                        }
                  });
      };
      theme.typography.h6 = {
            fontSize: "0.6rem",
            "@media (max-width:600px)": {
                  fontSize: "0.7rem",
            },
      };

      theme.typography.subtitle2 = {
            fontSize: "0.9rem",
            "@media (max-width:600px)": {
                  fontSize: "0.4rem",
            },
      };

      theme.typography.h5 = {
            fontSize: "1rem",
            "@media (max-width:600px)": {
                  fontSize: "0.4rem",
            },
      };
      theme.typography.subtitle1 = {
            fontSize: "0.8rem",
            "@media (max-width:600px)": {
                  fontSize: "0.4rem",
            },
      };

      const selectedHandler = (e) => {
            console.log(e);
            setFile(e.target.files[0]);
      };

      const peticioHTTP = (values) => {
            let fecNac = values.FecNacimiento;

            if (!file) {
                  alert("Por Favor Cargue una Foto!!");
                  return;
            }

            values.FecExpedicion = fechaActual;

            fecNac =
                  fecNac.getFullYear() +
                  "-" +
                  (fecNac.getMonth() + 1) +
                  "-" +
                  fecNac.getDate();

            const formdata = new FormData();
            formdata.append("cc", values.cc);
            formdata.append("Nombre", values.Nombre);
            formdata.append("Sexo", values.Sexo);
            formdata.append("Raza", values.Raza);
            formdata.append("FecNacimiento", fecNac);
            formdata.append("Lugar", values.Lugar);
            //formdata.append("Tamano", values.Tamano);
            formdata.append("Color", values.Color);
            formdata.append("Tipo", values.Tipo);
            formdata.append("FecExpedicion", values.FecExpedicion);
            formdata.append("IdPropietario", values.IdPropietario);
            formdata.append("image", file);

            const requestInit = {
                  method: "POST",
                  // headers: { "Content-Type": "application/json" },
                  body: formdata,
            };

            fetch(baseUrl + "/cedulacion/registroMascotas", requestInit)
                  .then((res) => res.text())
                  .then((res) => {
                        Swal.fire({
                              position: "center",
                              title: res,
                              text: "Ahora procederemos con la creación de la cédula!!!",
                              icon: "success",
                              showConfirmButton: false,
                              timerProgressBar: true,
                              timer: 2000,
                        }).then(() => {
                              crearPDF();
                        });
                  });
      };

      const guardarMascotas = (values) => {
            verificarCedula(values); //Verifica si el CODIGO de cedula ya esta en uso y si no es asi procede a registra la cédula
      };

      const guardarPropietario = (values) => {
            const requestInit = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
            };
            fetch(baseUrl + "/cedulacion/registroPropietarios", requestInit)
                  .then((res) => res.text())
                  .then((res) =>
                        Swal.fire({
                              position: "center",
                              icon: "success",
                              title: res,
                              showConfirmButton: false,
                              timer: 2000,
                        })
                  );
            setOpenModal(!openModal);
            setActualizar(!actualizar);
      };

      const crearPDF = () => {
            fetch(baseUrl + `/pdf/${cc}`)
                  .then((res) => res.text())
                  .then((res) =>
                        Swal.fire({
                              position: "center",
                              icon: "success",
                              title: res,
                              showConfirmButton: false,
                              showConfirmButton: false,
                              timerProgressBar: true,
                              timer: 2000,
                        }).then(() => {
                              navigate(`/cedula/${cc}`);
                        })
                  );
      };

      return (
            <Container>
                  <Dialog open={openModal} onClose={openModal}>
                        <div style={{ padding: "20px" }}>
                              <Formik
                                    initialValues={{
                                          Nombre: "",
                                          Cedula: "",
                                          Direccion: "",
                                          Telefono: "",
                                    }}
                                    validationSchema={Yup.object().shape({
                                          Nombre: Yup.string()
                                                .matches(
                                                      /^[A-Za-z\sÀ-ÿ]+$/,
                                                      "* Solo se admiten letras"
                                                )
                                                .required("* Requerido"),

                                          Cedula: Yup.number(
                                                "* Solo se admiten números"
                                          ).required("* Requerido"),
                                          Direccion:
                                                Yup.string().required(
                                                      "* Requerido"
                                                ),
                                          Telefono: Yup.number(
                                                "* Solo se admiten números"
                                          ).required("* Requerido"),
                                    })}
                                    onSubmit={(values, { resetForm }) => {
                                          guardarPropietario(values);
                                          resetForm();
                                    }}
                              >
                                    {({
                                          errors,
                                          touched,
                                          values,
                                          setFieldValue,
                                          handleBlur,
                                          handleChange,
                                    }) => (
                                          <Form>
                                                <DialogTitle>
                                                      <Typography
                                                            variant="h5"
                                                            component="h3"
                                                            align="center"
                                                            style={{
                                                                  marginBottom:
                                                                        "6px",
                                                            }}
                                                      >
                                                            <b>
                                                                  Datos del
                                                                  Propietario
                                                            </b>
                                                      </Typography>
                                                </DialogTitle>
                                                <DialogContent>
                                                      <TextField
                                                            name="Cedula"
                                                            label="No. Cedula *"
                                                            size="small"
                                                            value={
                                                                  values.Cedula
                                                            }
                                                            onBlur={handleBlur}
                                                            onChange={
                                                                  handleChange
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
                                                            error={Boolean(
                                                                  touched.Cedula &&
                                                                        errors.Cedula
                                                            )}
                                                            helperText={
                                                                  touched.Cedula &&
                                                                  errors.Cedula
                                                            }
                                                      />
                                                      <TextField
                                                            name="Nombre"
                                                            label="Nombre *"
                                                            size="small"
                                                            value={
                                                                  values.Nombre
                                                            }
                                                            onBlur={handleBlur}
                                                            onChange={
                                                                  handleChange
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
                                                            error={Boolean(
                                                                  touched.Nombre &&
                                                                        errors.Nombre
                                                            )}
                                                            helperText={
                                                                  touched.Nombre &&
                                                                  errors.Nombre
                                                            }
                                                      />
                                                      <TextField
                                                            name="Direccion"
                                                            label="Dirección *"
                                                            size="small"
                                                            value={
                                                                  values.Direccion
                                                            }
                                                            onBlur={handleBlur}
                                                            onChange={
                                                                  handleChange
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
                                                            error={Boolean(
                                                                  touched.Direccion &&
                                                                        errors.Direccion
                                                            )}
                                                            helperText={
                                                                  touched.Direccion &&
                                                                  errors.Direccion
                                                            }
                                                      />
                                                      <TextField
                                                            name="Telefono"
                                                            label="Teléfono *"
                                                            size="small"
                                                            value={
                                                                  values.Telefono
                                                            }
                                                            onBlur={handleBlur}
                                                            onChange={
                                                                  handleChange
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
                                                            error={Boolean(
                                                                  touched.Telefono &&
                                                                        errors.Telefono
                                                            )}
                                                            helperText={
                                                                  touched.Telefono &&
                                                                  errors.Telefono
                                                            }
                                                      />
                                                </DialogContent>
                                                <DialogActions>
                                                      <Grid
                                                            container
                                                            md={12}
                                                            justifyContent="center"
                                                      >
                                                            <Button
                                                                  variant="outlined"
                                                                  size="medium"
                                                                  type="submit"
                                                                  style={{
                                                                        marginRight:
                                                                              "20px",
                                                                        color: "white",
                                                                        background:
                                                                              "#057FC7",
                                                                  }}
                                                            >
                                                                  Registrar
                                                            </Button>
                                                            <Button
                                                                  variant="contained"
                                                                  size="medium"
                                                                  type="button"
                                                                  style={{
                                                                        color: "white",
                                                                        background:
                                                                              "#057FC7",
                                                                  }}
                                                                  onClick={() =>
                                                                        setOpenModal(
                                                                              !openModal
                                                                        )
                                                                  }
                                                            >
                                                                  Cancelar
                                                            </Button>
                                                      </Grid>
                                                </DialogActions>
                                          </Form>
                                    )}
                              </Formik>
                        </div>
                  </Dialog>
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
                                          color: "#1b1b1b",
                                    }}
                              >
                                    <b> Cedulación de mascotas</b>
                              </Typography>
                        </Grid>
                        <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              justifyContent="start"
                        >
                              <Button
                                    style={{
                                          color: "white",
                                          background: "#057FC7",
                                          marginBottom: "10px",
                                    }}
                                    onClick={() => setOpenModal(!openModal)}
                              >
                                    PROPIETARIO
                              </Button>
                        </Grid>
                        <Grid
                              container
                              justifyContent="center"
                              alignItems={"center"}
                              xs={12}
                              sm={12}
                              md={12}
                        >
                              <Grid item xs={12} sm={12} md={6}>
                                    <Paper
                                          elevation={24}
                                          style={{
                                                padding: "20px",
                                                borderRadius: "6px",
                                                border: "2px solid #057FC7",
                                          }}
                                    >
                                          <Formik
                                                initialValues={{
                                                      cc: cc,
                                                      Nombre: "",
                                                      Sexo: "",
                                                      Raza: "",
                                                      FecNacimiento: null,
                                                      Lugar: "",
                                                      Tamano: "",
                                                      Color: "",
                                                      Tipo: "",
                                                      FecExpedicion: "",
                                                      IdPropietario: "",
                                                }}
                                                validationSchema={Yup.object().shape(
                                                      {
                                                            FecNacimiento:
                                                                  Yup.date()
                                                                        .nullable()
                                                                        .required(
                                                                              "* Requerido"
                                                                        ),

                                                            Nombre: Yup.string()
                                                                  .matches(
                                                                        /^[A-Za-z\sÀ-ÿ]+$/,
                                                                        "* Solo se admiten letras"
                                                                  )
                                                                  .required(
                                                                        "* Requerido"
                                                                  ),

                                                            Sexo: Yup.string().required(
                                                                  "* Requerido"
                                                            ),
                                                            Raza: Yup.string().required(
                                                                  "* Requerido"
                                                            ),
                                                            Lugar: Yup.string().required(
                                                                  "* Requerido"
                                                            ),
                                                            Tamano: Yup.string().required(
                                                                  "* Requerido"
                                                            ),
                                                            Color: Yup.string().required(
                                                                  "* Requerido"
                                                            ),
                                                            Tipo: Yup.string().required(
                                                                  "* Requerido"
                                                            ),
                                                            IdPropietario:
                                                                  Yup.string().required(
                                                                        "* Requerido"
                                                                  ),
                                                      }
                                                )}
                                                onSubmit={(
                                                      values,
                                                      { resetForm }
                                                ) => {
                                                      guardarMascotas(values);
                                                      resetForm();
                                                }}
                                          >
                                                {({
                                                      errors,
                                                      touched,
                                                      values,
                                                      handleBlur,
                                                      handleChange,
                                                      setFieldValue,
                                                      resetForm,
                                                }) => (
                                                      <Form>
                                                            <Grid
                                                                  container
                                                                  spacing={1}
                                                                  xs={12}
                                                                  sm={12}
                                                                  md={12}
                                                            >
                                                                  <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={12}
                                                                        md={12}
                                                                  >
                                                                        <Typography
                                                                              variant="subtitle1"
                                                                              component="h4"
                                                                        >
                                                                              <b>
                                                                                    Datos
                                                                                    de
                                                                                    la
                                                                                    Mascota
                                                                              </b>
                                                                        </Typography>
                                                                  </Grid>
                                                                  <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={12}
                                                                        md={6}
                                                                        justifyContent="center"
                                                                  >
                                                                        <TextField
                                                                              id="Nombre"
                                                                              name="Nombre"
                                                                              label="Nombres *"
                                                                              fullWidth
                                                                              margin="none"
                                                                              variant="outlined"
                                                                              type="text"
                                                                              size="small"
                                                                              value={
                                                                                    values.Nombre
                                                                              }
                                                                              onBlur={
                                                                                    handleBlur
                                                                              }
                                                                              onChange={
                                                                                    handleChange
                                                                              }
                                                                              error={Boolean(
                                                                                    touched.Nombre &&
                                                                                          errors.Nombre
                                                                              )}
                                                                              helperText={
                                                                                    touched.Nombre &&
                                                                                    errors.Nombre
                                                                              }
                                                                        />
                                                                  </Grid>
                                                                  <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={12}
                                                                        md={6}
                                                                  >
                                                                        <MuiPickersUtilsProvider
                                                                              utils={
                                                                                    DateFnsUtils
                                                                              }
                                                                              locale={
                                                                                    esLocale
                                                                              }
                                                                        >
                                                                              <KeyboardDatePicker
                                                                                    size="small"
                                                                                    name="FecNacimiento"
                                                                                    format="dd/MM/yyyy"
                                                                                    margin="none"
                                                                                    label="Fecha de Nacimiento *"
                                                                                    fullWidth
                                                                                    inputVariant="outlined"
                                                                                    value={
                                                                                          values.FecNacimiento
                                                                                    }
                                                                                    error={Boolean(
                                                                                          touched.FecNacimiento &&
                                                                                                errors.FecNacimiento
                                                                                    )}
                                                                                    helperText={
                                                                                          touched.FecNacimiento &&
                                                                                          errors.FecNacimiento
                                                                                    }
                                                                                    onChange={(
                                                                                          value
                                                                                    ) =>
                                                                                          setFieldValue(
                                                                                                "FecNacimiento",
                                                                                                value
                                                                                          )
                                                                                    }
                                                                                    KeyboardButtonProps={{
                                                                                          "aria-label":
                                                                                                "change date",
                                                                                    }}
                                                                              />
                                                                        </MuiPickersUtilsProvider>
                                                                  </Grid>
                                                                  <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={12}
                                                                        md={6}
                                                                        justifyContent="center"
                                                                  >
                                                                        <TextField
                                                                              name="Lugar"
                                                                              label="Lugar de Nacimiento *"
                                                                              fullWidth
                                                                              margin="none"
                                                                              variant="outlined"
                                                                              type="text"
                                                                              size="small"
                                                                              value={
                                                                                    values.Lugar
                                                                              }
                                                                              onBlur={
                                                                                    handleBlur
                                                                              }
                                                                              onChange={
                                                                                    handleChange
                                                                              }
                                                                              error={Boolean(
                                                                                    touched.Lugar &&
                                                                                          errors.Lugar
                                                                              )}
                                                                              helperText={
                                                                                    touched.Lugar &&
                                                                                    errors.Lugar
                                                                              }
                                                                        />
                                                                  </Grid>
                                                                  <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={12}
                                                                        md={6}
                                                                        justifyContent="center"
                                                                  >
                                                                        <FormControl
                                                                              variant="outlined"
                                                                              fullWidth
                                                                              size="small"
                                                                        >
                                                                              <InputLabel id="demo-simple-select-filled-label">
                                                                                    Tipo
                                                                                    *
                                                                              </InputLabel>
                                                                              <Select
                                                                                    labelId="demo-simple-select-filled-label"
                                                                                    id="demo-simple-select-filled"
                                                                                    name="Tipo"
                                                                                    value={
                                                                                          values.Tipo
                                                                                    }
                                                                                    onBlur={
                                                                                          handleBlur
                                                                                    }
                                                                                    onChange={
                                                                                          handleChange
                                                                                    }
                                                                                    error={Boolean(
                                                                                          touched.Tipo &&
                                                                                                errors.Tipo
                                                                                    )}
                                                                                    helperText={
                                                                                          touched.Tipo &&
                                                                                          errors.Tipo
                                                                                    }
                                                                              >
                                                                                    <MenuItem
                                                                                          value={
                                                                                                "PERRO"
                                                                                          }
                                                                                    >
                                                                                          PERRO
                                                                                    </MenuItem>
                                                                                    <MenuItem
                                                                                          value={
                                                                                                "GATO"
                                                                                          }
                                                                                    >
                                                                                          GATO
                                                                                    </MenuItem>
                                                                              </Select>
                                                                        </FormControl>
                                                                  </Grid>

                                                                  <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={12}
                                                                        md={6}
                                                                        justifyContent="center"
                                                                  >
                                                                        <FormControl
                                                                              variant="outlined"
                                                                              fullWidth
                                                                              size="small"
                                                                        >
                                                                              <InputLabel id="demo-simple-select-filled-label">
                                                                                    Tamaño
                                                                                    *
                                                                              </InputLabel>
                                                                              <Select
                                                                                    labelId="demo-simple-select-filled-label"
                                                                                    id="demo-simple-select-filled"
                                                                                    name="Tamano"
                                                                                    value={
                                                                                          values.Tamano
                                                                                    }
                                                                                    onBlur={
                                                                                          handleBlur
                                                                                    }
                                                                                    onChange={
                                                                                          handleChange
                                                                                    }
                                                                                    error={Boolean(
                                                                                          touched.Tamano &&
                                                                                                errors.Tamano
                                                                                    )}
                                                                                    helperText={
                                                                                          touched.Tamano &&
                                                                                          errors.Tamano
                                                                                    }
                                                                              >
                                                                                    <MenuItem
                                                                                          value={
                                                                                                "PEQUEÑO"
                                                                                          }
                                                                                    >
                                                                                          PEQUEÑO
                                                                                    </MenuItem>
                                                                                    <MenuItem
                                                                                          value={
                                                                                                "MEDIANO"
                                                                                          }
                                                                                    >
                                                                                          MEDIANO
                                                                                    </MenuItem>
                                                                                    <MenuItem
                                                                                          value={
                                                                                                "GRANDE"
                                                                                          }
                                                                                    >
                                                                                          GRANDE
                                                                                    </MenuItem>
                                                                              </Select>
                                                                        </FormControl>
                                                                  </Grid>
                                                                  <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={12}
                                                                        md={6}
                                                                        justifyContent="center"
                                                                  >
                                                                        <TextField
                                                                              name="Raza"
                                                                              label="Raza *"
                                                                              fullWidth
                                                                              margin="none"
                                                                              variant="outlined"
                                                                              type="text"
                                                                              size="small"
                                                                              value={
                                                                                    values.Raza
                                                                              }
                                                                              onBlur={
                                                                                    handleBlur
                                                                              }
                                                                              onChange={
                                                                                    handleChange
                                                                              }
                                                                              error={Boolean(
                                                                                    touched.Raza &&
                                                                                          errors.Raza
                                                                              )}
                                                                              helperText={
                                                                                    touched.Raza &&
                                                                                    errors.Raza
                                                                              }
                                                                        />
                                                                  </Grid>
                                                                  <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={12}
                                                                        md={6}
                                                                        justifyContent="center"
                                                                  >
                                                                        <FormControl
                                                                              variant="outlined"
                                                                              fullWidth
                                                                              size="small"
                                                                        >
                                                                              <InputLabel id="demo-simple-select-filled-label">
                                                                                    Sexo
                                                                                    *
                                                                              </InputLabel>
                                                                              <Select
                                                                                    labelId="demo-simple-select-filled-label"
                                                                                    id="demo-simple-select-filled"
                                                                                    name="Sexo"
                                                                                    value={
                                                                                          values.Sexo
                                                                                    }
                                                                                    onBlur={
                                                                                          handleBlur
                                                                                    }
                                                                                    onChange={
                                                                                          handleChange
                                                                                    }
                                                                                    error={Boolean(
                                                                                          touched.Sexo &&
                                                                                                errors.Sexo
                                                                                    )}
                                                                                    helperText={
                                                                                          touched.Sexo &&
                                                                                          errors.Sexo
                                                                                    }
                                                                              >
                                                                                    <MenuItem
                                                                                          value={
                                                                                                "MACHO"
                                                                                          }
                                                                                    >
                                                                                          MACHO
                                                                                    </MenuItem>
                                                                                    <MenuItem
                                                                                          value={
                                                                                                "HEMBRA"
                                                                                          }
                                                                                    >
                                                                                          HEMBRA
                                                                                    </MenuItem>
                                                                              </Select>
                                                                        </FormControl>
                                                                  </Grid>
                                                                  <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={12}
                                                                        md={6}
                                                                        justifyContent="center"
                                                                  >
                                                                        <TextField
                                                                              name="Color"
                                                                              label="Color *"
                                                                              fullWidth
                                                                              margin="none"
                                                                              variant="outlined"
                                                                              type="text"
                                                                              size="small"
                                                                              value={
                                                                                    values.Color
                                                                              }
                                                                              onBlur={
                                                                                    handleBlur
                                                                              }
                                                                              onChange={
                                                                                    handleChange
                                                                              }
                                                                              error={Boolean(
                                                                                    touched.Color &&
                                                                                          errors.Color
                                                                              )}
                                                                              helperText={
                                                                                    touched.Color &&
                                                                                    errors.Color
                                                                              }
                                                                        />
                                                                  </Grid>

                                                                  <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={12}
                                                                        md={12}
                                                                        justifyContent="center"
                                                                  >
                                                                        <Autocomplete
                                                                              id="Id"
                                                                              name="IdPropietario"
                                                                              options={
                                                                                    propietarios
                                                                              }
                                                                              variant="outlined"
                                                                              size="small"
                                                                              getOptionLabel={(
                                                                                    option
                                                                              ) =>
                                                                                    option.Nombre +
                                                                                    " - " +
                                                                                    option.Cedula
                                                                              }
                                                                              onChange={(
                                                                                    e,
                                                                                    value
                                                                              ) => {
                                                                                    console.log(
                                                                                          value
                                                                                    );
                                                                                    setFieldValue(
                                                                                          "IdPropietario",
                                                                                          value.Cedula !==
                                                                                                null
                                                                                                ? value.Cedula
                                                                                                : values.IdPropietario
                                                                                    );
                                                                              }}
                                                                              renderInput={(
                                                                                    params
                                                                              ) => (
                                                                                    <TextField
                                                                                          error={Boolean(
                                                                                                touched.IdPropietario &&
                                                                                                      errors.IdPropietario
                                                                                          )}
                                                                                          helperText={
                                                                                                touched.IdPropietario &&
                                                                                                errors.IdPropietario
                                                                                          }
                                                                                          label="Propietario ..."
                                                                                          fullWidth
                                                                                          name="IdPropietario"
                                                                                          {...params}
                                                                                    />
                                                                              )}
                                                                        />
                                                                  </Grid>
                                                                  <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={12}
                                                                        md={12}
                                                                        justifyContent="center"
                                                                  >
                                                                        <input
                                                                              id="fileinput"
                                                                              onChange={
                                                                                    selectedHandler
                                                                              }
                                                                              className="form-control"
                                                                              type="file"
                                                                        />
                                                                  </Grid>

                                                                  <Grid
                                                                        container
                                                                        xs={12}
                                                                        sm={12}
                                                                        md={12}
                                                                        justifyContent="center"
                                                                        style={{
                                                                              marginTop:
                                                                                    "15px",
                                                                        }}
                                                                  >
                                                                        <Button
                                                                              style={{
                                                                                    color: "white",
                                                                                    background:
                                                                                          "#057FC7",
                                                                              }}
                                                                              variant="contained"
                                                                              size="medium"
                                                                              type="submit"
                                                                        >
                                                                              GUARDAR
                                                                        </Button>
                                                                  </Grid>
                                                            </Grid>
                                                      </Form>
                                                )}
                                          </Formik>
                                    </Paper>
                              </Grid>
                        </Grid>
                  </Grid>
            </Container>
      );
};

export default RegistrarDatos;
