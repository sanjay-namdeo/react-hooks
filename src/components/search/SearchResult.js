import * as React from 'react';
import {useState} from "react";

export default ({title, description, pageid}) => {
    const baseClass = 'list-group-item list-group-item-action';
    const [uiClass, setUiClass] = useState(baseClass)

    const handleMouseOver = () => {
        setUiClass(`${baseClass} active`);
    }

    const handleMouseOut = () => {
        setUiClass(baseClass);
    };

    const handleClick = () => {

    };

    return (
        <a href={`https://en.wikipedia.org/?curid=${pageid}`} target='_blank' rel='noopener noreferrer' className={uiClass} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick}>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{title}</h5>
            </div>
            <p className="mb-1" dangerouslySetInnerHTML={{__html: description}}></p>
        </a>
    );
};