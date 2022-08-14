import { Card, Tag } from 'antd';
import PropTypes from 'prop-types';
import './styles.css'
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import React, { useContext } from "react";
import { ThemeContext } from '../../../../context/ThemeContext';

const CardNote  = ({page, edit, setCurrentNote, remove, valueSearch }) => {

    const {currentTheme} = useContext(ThemeContext);

    const selectAPage = () => {
        edit(true);
        setCurrentNote(page)
    }

    const removePage = () => {
        remove(true);
        setCurrentNote(page)
    }

    return (
        <>
            <Card style={{ width: 280, minHeight: 265, margin:'0.8em' }}>
                <h4 className='titlePage'>{page.title}</h4>
                <p className='description'>{page.description}</p>
                <div className='container-tags'>
                {page.tags.map((tag, index) => 
                    <Tag key={index} color="rgb(234 236 243)">
                        <span className={`tag ${valueSearch.replace('#', '') === tag ? 'tag-search' : ''}`}>#{tag}</span>
                    </Tag>
                )}
                </div>
                <div className="icons-list container-icons">
                    <EditOutlined
                        onClick={() => selectAPage()}
                        style={{marginRight:'0.5em'}}
                    />
                    <DeleteTwoTone
                        onClick={() => removePage()}
                        twoToneColor="#eb2f96"
                    />
                </div>
            </Card>
        </>
    )
}

CardNote.prototype = {
    page: PropTypes.object.isRequired,
    edit: PropTypes.func,
    remove: PropTypes.func,
    setCurrentNote: PropTypes.func,
    valueSearch: PropTypes.string,
}

export default CardNote;