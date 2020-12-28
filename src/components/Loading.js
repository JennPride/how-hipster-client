import React from 'react';

const Loading = ({message}) => {
    return (
        <div className="flex h-screen">
            <div className="m-auto text-center">
                <h1 className="text-white text-6xl text-center p-7">{message}</h1>
            </div>
        </div>
    )
};

export default Loading;
