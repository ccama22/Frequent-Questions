import { Modal, Form, Input, Button, Tag } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';
import React from "react";
import { getPages } from '../../../../services';

const FormPage = ({isModalVisible, handleOk, handleCancel, currentNote, createOrEditNewPage}) => {
    const [form] = Form.useForm();
    const [inputValue, setInputValue] = useState('');
    const [inputVisible, setInputVisible] = useState(false);
    const [tags, setTags] = useState(currentNote.tags);
    const [isNewPage, setIsNewPage] = useState(true);
    const [pages, setPages] = useState([])

    let input = useRef(null);

    const savePage = () => form.validateFields().then(values => {
        createOrEditNewPage({...currentNote, ...values, tags})
        handleOk()
    })

    useEffect(() => {
        if(!!currentNote.id){
            setIsNewPage(false)
            getAllPages();
        }
    }, []);

    const getAllPages = async() => {
        const response = await getPages();
        if (response) {
            setPages(response);
        }
    }

    const forMap = tag => {
        const tagElem = (
            <Tag
                closable
                onClose={e => {
                    e.preventDefault();
                    handleCloseTag(tag);
                }}
            >
                #{tag}
            </Tag>
        );

        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };

    useEffect(() => {
        inputVisible && input.current.focus();
    }, [inputVisible]);

    const tagChild = tags.map((tag) => forMap(tag));

    const handleCloseTag = (removedTag) => {
        const newTags = tags.filter(tag => tag !== removedTag);
        setTags(newTags)
    };

    const handleInputChange = e => setInputValue(e.target.value);

    const showInput = () => setInputVisible(true)

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            const newTags = [...tags, inputValue];
            setTags(newTags)
        }
        setInputVisible(false);
        setInputValue('')
    };

    return (
    <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={() => handleCancel()}>
                Cancelar
            </Button>,
            <Button htmlType="submit" key="submit" type="primary" onClick={savePage}>
                Aceptar
            </Button>,
        ]}
    >
        <h3 className='titleform'>{
            isNewPage 
            ? 'Agregar nueva Página'
            : 'Editar página'
        }</h3>
        {
            !!currentNote.id &&
            <p>esta es la nota {currentNote.id} de {pages.length}</p>
        }
        <br />
        <Form
            form={form}
            layout="vertical"
            initialValues={{
                    title: currentNote.title,
                    description: currentNote.description,
                    link: currentNote.link
                }}
            >
            <Form.Item 
                label="Titulo" 
                required
                name="title"
            >
                <Input disabled={!!currentNote.title} placeholder="Escriba el titulo" />
            </Form.Item>
            <Form.Item
                label="Link"
                required 
                name="link"
            >
                <Input placeholder="Escriba el link" />
            </Form.Item>
            <Form.Item
                label="Descripción"
                required 
                name="description"
            >
                <Input.TextArea placeholder="Escriba la inscripción" />
            </Form.Item>
            <Form.Item
                label="Tags"
            >
                <>
                    <div style={{ marginBottom: 16 }}>
                    <TweenOneGroup
                        enter={{
                        scale: 0.8,
                        opacity: 0,
                        type: 'from',
                        duration: 100,
                        onComplete: e => {
                            e.target.style = '';
                        },
                        }}
                        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                        appear={false}
                    >
                        {tagChild}
                    </TweenOneGroup>
                    </div>
                    {inputVisible && (
                    <Input
                        ref={input}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={() => handleInputConfirm()}
                        onPressEnter={() => handleInputConfirm()}
                    />
                    )}
                    {!inputVisible && (
                    <Tag onClick={() => showInput()} className="site-tag-plus">
                        <PlusOutlined /> New Tag
                    </Tag>
                    )}
                </>
            </Form.Item>
        </Form>
    </Modal>
    )
}

FormPage.prototype = {
    isModalVisible: PropTypes.bool.isRequired,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    currentNote: PropTypes.object,
    createOrEditNewPage: PropTypes.func,
}


export default FormPage;