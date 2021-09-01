import { Card, Tag } from 'antd';
import PropTypes from 'prop-types';
import './styles.css'
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';

const CardNote  = ({page, edit, setCurrentPage, remove, valueSearch }) => {

    const selectAPage = () => {
        edit(true);
        setCurrentPage(page)
    }

    const removePage = () => {
        remove(true);
        setCurrentPage(page)
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
    setCurrentPage: PropTypes.func,
    valueSearch: PropTypes.string,
}

export default CardNote;