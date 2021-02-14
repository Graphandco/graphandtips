import React from 'react'

const Content = ({tips, showTips}) => {
    return (
        <div className="content">
            <h1>Tips</h1>
            {showTips ? tips.map(tip => (
                <div className="tip-item" key={tip.id}>{tip.title.rendered}</div>
            )) : <div>Hello</div>}
        </div>
    )
}

export default Content
