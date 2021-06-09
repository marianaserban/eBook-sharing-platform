import React from "react";
import './AutoCompleteItem.css';

const AutoCompleteItem = ({
    title,
    picture,
    author,
    // capital,
    // region,
    // flag,
    onSelectItem,
    isHighlighted
}) => {
    return (
        <li
            className={`list-group-item ${
                isHighlighted ? "active highlighted" : ""
            }`}
            onClick={onSelectItem}
        >
            <div className="row">
                <div className="col text-left">
                    <p className="mb-0 font-weight-bold line-height-1">
                    <img src={picture} alt="" style={{ width: "30px",marginRight:'5px' }} />
                        {title}{" "}
                       
                    </p>
                    <p className="mb-0 badge badge-primary" style={{backgroundColor:'#39d39f'}}>{author}</p>
                    {/* <p className="mb-0 ml-2 badge badge-secondary">{availability}</p> */}
                </div>
            </div>
        </li>
    );
};

export default AutoCompleteItem;
