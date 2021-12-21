import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileFollowers from './ProfileFollowers';

const ProfileItem = ({
    profile: {
        _id,
        followers,
        user,
        status,
        company,
        location,
        skills
    },
    auth
}) => {
    return (
        <div className="profile bg-light">
            <img src={user.avatar} alt="" className="round-img" />
            <div>
                <h2>{user.name}</h2>
                <p>
                    { status } { company && <span> at {company} </span> }
                </p>
                <p className="my-1">{ location && <span>{ location }</span> }</p>
                <div className="profile-buttons">
                    <Link to={`/profile/${user._id}`} className="btn btn-primary">
                        View Profile
                    </Link>
                    <Link to={`/profile/followers/${_id}`} className="btn btn-primary">
                        View Followers
                    </Link>
                </div>
            </div>
            <ul>
                {
                    skills.slice(0, 4).map((skill, index) => (
                        <li key={index} className="text-primary">
                            <i className="fas fa-check"></i> { skill }
                        </li>
                    ))
                }
            </ul>
            <ProfileFollowers profile={{ _id, followers, user }} />
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;