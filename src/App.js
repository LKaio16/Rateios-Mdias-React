import React, { useRef, useState, useEffect } from "react";
import logo from "./Assets/Images/logo-mdias.png";
import icon_add from "./Assets/add_icon.svg";
import "./App.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

function App() {
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async (event) => {
    try {
      setError(null);
      setFileName(event.target.files[0].name);
      setLoading(true);
      const response = await axios.post(
        "https://projeto-mdiasbranco-954aa89e39e8.herokuapp.com/api/upload",
        {
          file: event.target.files[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { data } = response;

      const blob = new Blob([data]);

      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.setAttribute("download", "output_mdiasbranco.txt");
      downloadLink.click();
      setLoading(false);
      setFileName(null);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      setError(
        "Ocorreu um erro inesperado, contate o administrador do sistema."
      );
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        {error !== null && (
          <Alert
            severity="error"
            style={{ width: "60%", borderRadius: "40px" }}
          >
            {error}
          </Alert>
        )}
        <img src={logo} className="logo" alt="logo" />

        <div className="titulo">
          <p>Processador</p>
          <p>Rateios Telefonia</p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => handleUpload(e)}
          method="POST"
          encType="multipart/form-data"
          disabled={loading}
        />
        <div className="button_upload" onClick={handleFileInputClick}>
          {!loading ? (
            <img src={icon_add} className="icon_add" alt="Add icon" />
          ) : (
            <CircularProgress size="35px" />
          )}

          <p>{fileName === null ? "Selecionar Arquivo" : fileName}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
