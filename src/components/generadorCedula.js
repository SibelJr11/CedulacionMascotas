import { Grid, Paper } from "@material-ui/core";
import { Button, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";

const GeneradorCedula = () => {
      const { cc } = useParams();
      const baseUrl = process.env.REACT_APP_API_URL;
      const dni = `/dni-${cc}.pdf`;

      const generarPDF = () => {
            fetch(baseUrl + `/pdf/${cc}`)
                  .then((res) => res.blob())
                  .then((res) => {
                        const url = window.URL.createObjectURL(res);
                        const link = document.createElement("a");
                        link.href = url;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                  });
      };

      const theme = createTheme();
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
            fontSize: "1.1rem",
            "@media (max-width:600px)": {
                  fontSize: "0.4rem",
            },
      };
      theme.typography.subtitle1 = {
            fontSize: "0.9rem",
            "@media (max-width:600px)": {
                  fontSize: "0.4rem",
            },
      };

      return (
            <>
                  <embed
                        src={baseUrl + dni}
                        width="100%"
                        height="700px"
                        type="application/pdf"
                  />
            </>
      );
};
export default GeneradorCedula;
