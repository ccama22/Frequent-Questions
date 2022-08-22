import React, { Component } from "react";

class WikipediaSearch extends Component {
  constructor(props) {
    super(props);
    const { steps } = this.props;
    const {
      seleccion,
      seleccionFront,
      seleccionAperturaCursos,
      seleccionCapacitaIngresante,
      seleccionIRegistrado,
      MD,
    } = steps;
    this.state = {
      seleccion,
      seleccionFront,
      seleccionAperturaCursos,
      seleccionCapacitaIngresante,
      seleccionIRegistrado,
      MD,
      busqueda: "",
      nombreCurado: "",
    };
  }

  componentDidMount() {
    if (this.state.seleccion.value === "f") {
      this.setState({
        busqueda: this.state.seleccionFront.value,
      });
      if (this.state.seleccionFront.value.includes("_")) {
        var texto = this.state.seleccionFront.value;
        texto = texto.substring(0, texto.indexOf("_"));
        this.setState({
          nombreCurado: texto,
        });
      } else {
        this.setState({
          nombreCurado: this.state.seleccionFront.value,
        });
      }
    } else if (this.state.seleccion.value === "g") {
      this.setState({
        busqueda: this.state.seleccionAperturaCursos.value,
      });
      if (this.state.seleccionAperturaCursos.value.includes("_")) {
        var texto = this.state.seleccionAperturaCursos.value;
        texto = texto.substring(0, texto.indexOf("_"));
        this.setState({
          nombreCurado: texto,
        });
      } else {
        this.setState({
          nombreCurado: this.state.seleccionAperturaCursos.value,
        });
      }
    } else if (this.state.seleccion.value === "h") {
      this.setState({
        busqueda: this.state.seleccionCapacitaIngresante.value,
      });
      if (this.state.seleccionCapacitaIngresante.value.includes("_")) {
        var texto = this.state.seleccionCapacitaIngresante.value;
        texto = texto.substring(0, texto.indexOf("_"));
        this.setState({
          nombreCurado: texto,
        });
      } else {
        this.setState({
          nombreCurado: this.state.seleccionCapacitaIngresante.value,
        });
      }
    } else if (this.state.seleccion.value === "i") {
      this.setState({
        busqueda: this.state.seleccionIRegistrado.value,
      });
      if (this.state.seleccionIRegistrado.value.includes("_")) {
        var texto = this.state.seleccionIRegistrado.value;
        texto = texto.substring(0, texto.indexOf("_"));
        this.setState({
          nombreCurado: texto,
        });
      } else {
        this.setState({
          nombreCurado: this.state.seleccionIRegistrado.value,
        });
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.busqueda === "sobreManual" ? (
          <div>
            <p>
              Aquí hay un enlace al manual{" "}
              {/* {this.state.nombreCurado}:{" "} */}
            </p>
            <a href={"https://www.unamad.edu.pe/"} target="_blank">
              {this.state.nombreCurado}
            </a>
          </div>
        ) : (
          <div>
            {
              <div>
                {this.state.busqueda === "sobrePlanEstudio" ? (
                  <div>
                    <p>
                      Aquí hay un enlace a la página{" "}
                      {/* {this.state.nombreCurado}:{" "} */}
                    </p>
                    <a
                      href={
                        "https://academico.unamad.edu.pe/index.php?id=curriculas"
                      }
                      target="_blank"
                    >
                      {this.state.nombreCurado}
                    </a>
                  </div>
                ) : (
                  <div>
                    <p>
                      Aquí hay un enlace a la página{" "}
                      {/* {this.state.nombreCurado}:{" "} */}
                    </p>
                    <a
                      href={
                        "https://es.wikipedia.org/wiki/" + this.state.busqueda
                      }
                      target="_blank"
                    >
                      {this.state.nombreCurado}
                    </a>
                  </div>
                )}
              </div>
            }
          </div>
        )}
      </div>
    );
  }
}
export default WikipediaSearch;
