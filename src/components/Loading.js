import React from 'react';

const Loading = ({message}) => {
    return (
        <div className="align-middle">
            <h1 className="text-white text-6xl text-center p-7">{message}</h1>
        </div>
    )
};

export default Loading;
