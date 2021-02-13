import React from 'react'

const Content = ({tips}) => {
    return (
        <div className="content">
            <h1>Tips</h1>
            {tips.map(tip => (
                <div className="tip-item" key={tip.id}>{tip.title.rendered}</div>
            ))}
        </div>
    )
}

export default Content
