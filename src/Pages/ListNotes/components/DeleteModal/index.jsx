import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import React from "react";

const DeleteModal = ({isModalVisible, handleOk, handleCancel, page, deletePage}) => {

    const removePage = () => {
        deletePage(page);
        handleOk();
    }

    return (
        <Modal
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={() => handleCancel()}>
                    Cancelar
                </Button>,
                <Button htmlType="submit" key="submit" type="primary" onClick={removePage}>
                    Aceptar
                </Button>,
            ]}
        >
            <h3 className='titleform'>Eliminar página</h3>
            <span>
                ¿Está seguro  que quiere  remover la página "<strong>{page.title}</strong>"?
            </span>
            
        </Modal>
    )
}

DeleteModal.prototype = {
    isModalVisible: PropTypes.bool.isRequired,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    page: PropTypes.object,
    deletePage: PropTypes.func,
}

export default DeleteModal;