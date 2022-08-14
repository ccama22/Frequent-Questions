import React, { useEffect, useState } from "react";
import CardNote from "./components/CardNote";

import { getPages } from "../../services";
import FormPage from "./components/FormPage";
import { Affix, Button, Input, Switch } from 'antd';
import { PlusOutlined, SortAscendingOutlined } from '@ant-design/icons';
import './styles.css'
import DeleteModal from "./components/DeleteModal";

const { Search } = Input;

const ListNotes = () => {

    const newPage = {
        title: '',
        description: '',
        link: '',
        tags:[],
    }

    const [pages, setPages] = useState([])
    const [currentNote, setCurrentNote] = useState(newPage);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalDeleteIsVisible, setIsModalDeleteIsVisible] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [filterData, setFilterData] = useState([]);


    useEffect(() => {
        // debugger;
        if(valueSearch.includes('#')) {
            const searchValue = valueSearch.replace('#', '');
            const filterByTags = pages.filter(page => page.tags.find(tag => tag === searchValue));
            setFilterData([...filterByTags]);
        } else {
            searchPage(valueSearch)
        }
    }, [valueSearch]);

    const searchPage = (value) => {
        const filterByTitle = FilteredByPath(value, 'title');
        const filterByDescription = FilteredByPath(value, 'description');
        const filteresPages = [...filterByTitle, ...filterByDescription]
        setFilterData([...new Set(filteresPages)]);
    };    

    const FilteredByPath = (value, path) => pages.filter(
        page => page[path]
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
    
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleOkModalDeletePage = () => {
        setIsModalDeleteIsVisible(false);
    };

    const createOrEditNewPage = (newPage) => {
        let newPages = [...pages]
        if(!newPage.id){
            const lastId = [...pages.sort((a, b) => a.id - b.id )].pop()
            newPages = [...pages, {...newPage, id: (lastId.id + 1)}]
        } else {
            newPages = pages.map(page => {
                if (page.id === newPage.id) return {...newPage}
                return page
            })
        }
        setPages(newPages);
        setFilterData(newPages);
    }
    
    const handleCancel = () => {
        setCurrentNote(newPage);
        setIsModalVisible(false);
    };

    const handleCancelModalDelete = () => {
        setCurrentNote(newPage);
        setIsModalDeleteIsVisible(false);
    };

    useEffect(() => {
        getAllPages();
    }, []);

    const getAllPages = async() => {
        const response = await getPages();
        if (response) {
            setPages(response);
            setFilterData(response);
        }
    }

    const onSearch = value => setValueSearch(value);

    const onChangeOrder = (checked) => {
        if(checked){
            const datasorted = [...pages].sort((a, b) => a.title < b.title ? - 1 : Number(a.title > b.title))
            setFilterData(datasorted);
        }else{
            setFilterData([...pages]);
        }
    }

    const deletePage = (currentNote) => {
        const newPages = [...pages].filter(page => page.id !== currentNote.id);
        setFilterData(newPages);
        setPages(newPages);
    }

    return (
        <div className='containerPages'>
            <header>
                <Search
                    placeholder="input search text"
                    allowClear
                    onSearch={onSearch}
                    onChange={(event) => onSearch(event.target.value)}
                    style={{ width: '70%'}}
                />
                <div>
                    <Switch onChange={onChangeOrder}/> <SortAscendingOutlined />
                </div>
            </header>
            <div style={{margin:'auto'}}>
                <div className="containerCards">
                    {
                        filterData.map(page => 
                            <CardNote
                                key={page.id}
                                page={page}
                                setCurrentNote={setCurrentNote}
                                edit={setIsModalVisible}
                                remove={setIsModalDeleteIsVisible}
                                valueSearch={valueSearch}
                            ></CardNote>
                            )
                    }
                </div>
            </div>
            {   modalDeleteIsVisible &&
                <DeleteModal
                    isModalVisible={modalDeleteIsVisible}
                    page={currentNote}
                    handleOk={handleOkModalDeletePage}
                    handleCancel={handleCancelModalDelete}
                    deletePage={deletePage}
                ></DeleteModal>
            }
            {
                isModalVisible &&
                <FormPage 
                    isModalVisible={isModalVisible}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    currentNote={currentNote}
                    createOrEditNewPage={createOrEditNewPage}
                ></FormPage>
            }
            <Affix className='ant-affix' offsetBottom={10}>
                <Button 
                    onClick={() => setIsModalVisible(true)}
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                    size="large" />
            </Affix>
        </div>
    )
}

export default ListNotes;