import React from 'react'
import PropTypes from 'prop-types'

const Follower = ({ follower: { _id, name, avatar } }) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img" />
            <div>
                <h2>{name}</h2>
            </div>
        </div>
    )
}

Follower.propTypes = {
    follower: PropTypes.array.isRequired
}

export default Follower;
