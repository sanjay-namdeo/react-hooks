import * as React from 'react';

export default ({title, description}) => {
    return (
        <div>
            <h4>{title}</h4>
            <p dangerouslySetInnerHTML={{__html: description}}></p>
        </div>
    );
};