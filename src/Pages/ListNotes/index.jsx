import React, { useEffect, useState } from "react";
import CardNote from "./components/CardNote";

import { getPages } from "../../services";
import { Affix, Button, Input, Switch } from "antd";
import logoUNAMAD from "../../assets/img/logoUNAMAD.png";
import {
  PlusOutlined,
  SortAscendingOutlined,
  WechatOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./styles.css";
import "./chat.css";
import SingleQuestion from "./Question";
import image from "../../assets/img/ErrorBusqued.png";
import Contenido from "../../Pages/ListNotes/components/Contenido/Contenido";

const { Search } = Input;

const ListNotes = () => {
  const newPage = {
    title: "",
    description: "",
    link: "",
    tags: [],
  };

  const [pages, setPages] = useState([]);
  const [currentNote, setCurrentNote] = useState(newPage);
  const [valueSearch, setValueSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  let [showChat, setShowChat] = useState(false);

  const startChat = () => {
    setShowChat(true);
  };
  const hideChat = () => {
    setShowChat(false);
  };

  useEffect(() => {
    // debugger;
    if (valueSearch.includes("#")) {
      const searchValue = valueSearch.replace("#", "");
      const filterByTags = pages.filter((page) =>
        page.tags.find((tag) => tag === searchValue)
      );
      setFilterData([...filterByTags]);
    } else {
      searchPage(valueSearch);
    }
  }, [valueSearch]);

  const searchPage = (value) => {
    const filterByTitle = FilteredByPath(value, "title");
    // const filterByDescription = FilteredByPath(value, "description");
    const filteresPages = [...filterByTitle];
    setFilterData([...new Set(filteresPages)]);
  };

  const FilteredByPath = (value, path) =>
    pages.filter(
      (page) =>
        page[path]
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .search(
            value
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
          ) !== -1
    );

  useEffect(() => {
    getAllPages();
  }, []);

  const getAllPages = async () => {
    const response = await getPages();
    if (response) {
      setPages(response);
      setFilterData(response);
    }
  };

  const onSearch = (value) => setValueSearch(value);

  const onChangeOrder = (checked) => {
    if (checked) {
      const datasorted = [...pages].sort(SortArray);
      console.log("prueba reverse0", datasorted);
      setFilterData(datasorted);
    } else {
      setFilterData([...pages]);
    }
  };

  function SortArray(x, y) {
    return x.title.localeCompare(y.title);
  }
  return (
    <div className="containerPages">
      <header className="header-search">
        <img src={logoUNAMAD} width="50px" />
        <Search
          placeholder="Buscar Pregunta"
          allowClear
          onSearch={onSearch}
          onChange={(event) => onSearch(event.target.value)}
          style={{ width: "50%", paddingTop: "950px", paddingBottom: "950px" }}
        />
        <div>
          <Switch onChange={onChangeOrder} /> <SortAscendingOutlined />
        </div>
      </header>

      <div style={{ margin: "auto" }}>
        {filterData.length === 0 ? (
          <div className="error-container">
            <div className="error-search">
              <img src={image} width={"400px"} alt="ccama" />
              <p className="error-title">Error en busqueda</p>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="container-title">Preguntas frecuentes</h3>
            <section className="container">
              {filterData.map((question) => {
                return (
                  <SingleQuestion
                    key={question.id}
                    {...question}
                    valueSearch={valueSearch}
                    page={question}
                  ></SingleQuestion>
                );
              })}
            </section>
          </div>
        )}
      </div>

      <div className="bot">
        <div style={{ display: showChat ? "" : "none" }}>
          <Contenido></Contenido>
        </div>
        <div>
          {!showChat ? (
            <Affix className="ant-affix btn2" offsetBottom={10}>
              <Button
                onClick={() => startChat()}
                type="primary"
                shape="circle"
                icon={<WechatOutlined style={{ fontSize: "30px" }} />}
                size="large"
                className="btn2"
              />
            </Affix>
          ) : (
            //   <IconButton color="primary" onClick={() => startChat()}>
            //   <SmileIcon />
            // </IconButton>
            <Affix className="ant-affix btn2" offsetBottom={10}>
              <Button
                onClick={() => hideChat()}
                type="primary"
                shape="circle"
                icon={<CloseOutlined />}
                size="large"
                className="btn2"
              />
            </Affix>
          )}
        </div>
      </div>
      <div className="container-footer">
        <p>
          © 2022 Universidad Nacional Amazonica de Madre de Dios - Oficina de
          tecnologia de Información - portalweb@unamad.edu.pe
        </p>
      </div>
    </div>
  );
};

export default ListNotes;
