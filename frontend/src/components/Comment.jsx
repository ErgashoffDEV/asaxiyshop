import React from 'react';

export default function Comment({user, body}) {
    return (
        <div>
            <article className='message my-4 is-info'>
                <div className="message-header">
                    <p>Written by {user}</p>
                </div>
                <div className="message-body">
                    <div className="content">{body}</div>
                </div>
            </article>
        </div>
    );
}

