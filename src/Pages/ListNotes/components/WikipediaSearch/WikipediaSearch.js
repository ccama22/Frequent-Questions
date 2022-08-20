import React, { Component } from "react";

class WikipediaSearch extends Component {
  constructor(props) {
    super(props);
    const { steps } = this.props;
    const { seleccion, seleccionFront,seleccionAperturaCursos } = steps;
    this.state = {
      seleccion,
      seleccionFront,
      seleccionAperturaCursos,
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
    }
    else if(this.state.seleccion.value === "g"){
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
    }
  }

  render() {
    return (
      <div>
        <p>
          Aquí hay un enlace a la página{" "}
          {/* {this.state.nombreCurado}:{" "} */}
        </p>
        <a
          href={"https://es.wikipedia.org/wiki/" + this.state.busqueda}
          target="_blank"
        >
          {this.state.nombreCurado}
        </a>
      </div>
    );
  }
}
export default WikipediaSearch;
