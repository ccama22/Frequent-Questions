import { Modal, Form, Input, Button, Tag } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';

const FormPage = ({isModalVisible, handleOk, handleCancel, currentPage, createOrEditNewPage}) => {
    const [form] = Form.useForm();
    const [inputValue, setInputValue] = useState('');
    const [inputVisible, setInputVisible] = useState(false);
    const [tags, setTags] = useState(currentPage.tags);
    const [isNewPage, setIsNewPage] = useState(true);;
    let input = useRef(null);

    const savePage = () => form.validateFields().then(values => {
        createOrEditNewPage({...currentPage, ...values, tags})
        handleOk()
    })

    useEffect(() => {
        if(!!currentPage.id){
            setIsNewPage(false)
        }
    }, []);

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
        <br />
        <Form
            form={form}
            layout="vertical"
            initialValues={{
                    title: currentPage.title,
                    description: currentPage.description,
                    link: currentPage.link
                }}
            >
            <Form.Item 
                label="Titulo" 
                required
                name="title"
            >
                <Input disabled={!!currentPage.title} placeholder="Escriba el titulo" />
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
    currentPage: PropTypes.object,
    createOrEditNewPage: PropTypes.func,
}


export default FormPage;