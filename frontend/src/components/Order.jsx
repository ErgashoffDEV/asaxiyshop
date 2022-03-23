import React from 'react';

export default function Order ({order}) {
    return (
        <div>
            <p>{order.title}</p>
            <p>{order.price}</p>
        </div>
    );
}

