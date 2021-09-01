import React, { useEffect, useState } from "react";
import CardNote from "./components/CardNote";
import { getPages } from "../services";
import FormPage from "./components/FormPage";
import { Affix, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './styles.css'

const Pages = () => {

    const newPage = {
        title: '',
        description: '',
        link: '',
        tags:[],
    }

    const [pages, setPages] = useState([])
    const [currentPage, setCurrentPage] = useState(newPage);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
        setIsModalVisible(false);
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
    }
    
    const handleCancel = () => {
        setCurrentPage(newPage);
        setIsModalVisible(false);
    };

    useEffect(() => {
        getAllPages();
    }, []);

    const getAllPages = async() => {
        const response = await getPages();
        if (response) {
            setPages(response);
        }
    }

    return (
        <>
            <div style={{margin:'auto'}}>
                <div className="containerCards">
                    {
                        pages.map(page => 
                            <CardNote
                                key={page.id}
                                page={page}
                                setCurrentPage={setCurrentPage}
                                edit={setIsModalVisible}
                            ></CardNote>
                            )
                    }
                </div>
            </div>
            {
                isModalVisible &&
                <FormPage 
                    isModalVisible={isModalVisible}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    currentPage={currentPage}
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
        </>
    )
}

export default Pages;