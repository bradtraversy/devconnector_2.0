import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getFollowers } from '../../actions/profile';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Follower from './Follower';

const ProfileFollowerList = ({ getFollowers, match, profile: { profiles, followers, loading } }) => {
    useEffect(() => {
        getFollowers(match.params.id);
    }, [getFollowers, match]);

    return (
        <Fragment>
            {
                loading ? <Spinner /> : <Fragment>
                    <h1 className="large text-primary">User</h1>
                    {
                        profiles.map(profile => profile._id === match.params.id ? (
                            <div className="profile bg-light">
                                <img src={profile.user.avatar} alt="" className="round-img" />
                                <div>
                                    <h2>{profile.user.name}</h2>
                                    <p>
                                        { profile.status } { profile.company && <span> at {profile.company} </span> }
                                    </p>
                                    <p className="my-1">{ profile.location && <span>{ profile.location }</span> }</p>
                                    <div className="profile-buttons">
                                        <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                                <ul>
                                    {
                                        profile.skills.slice(0, 4).map((skill, index) => (
                                            <li key={index} className="text-primary">
                                                <i className="fas fa-check"></i> { skill }
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ) : (''))
                    }
                    <h1 className="large text-primary">Followers</h1>
                    <div className="profiles">
                        {
                            followers.length > 0 ? (
                                followers.map(follower => (
                                    <Follower key={follower._id} follower={follower} />
                                ))
                            ) : <h4>No followers</h4>
                        }
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

ProfileFollowerList.propTypes = {
    getFollowers: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getFollowers })(ProfileFollowerList);