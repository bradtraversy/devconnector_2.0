import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFollower, removeFollower } from '../../actions/profile';

const ProfileFollowers = ({ auth, addFollower, removeFollower, profile: { _id, followers, user } }) => {
    return (
        <div className="profile-follow bg-light p-2">
            {
                <Fragment>
                    <p>
                        Followers: <span>{followers.length}</span>
                    </p>
                    {
                        auth.user._id !== user._id && (
                            <div>
                                <button onClick={e => addFollower(_id)} type="button" className="btn btn-primary">
                                    Follow
                                </button>
                                <button onClick={e => removeFollower(_id)} type="button" className="btn btn-dark">
                                    Unfollow
                                </button>
                            </div>
                        )
                    }
                </Fragment>
            }
        </div>
    )
}

ProfileFollowers.propTypes = {
    addFollower: PropTypes.func.isRequired,
    removeFollower: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addFollower, removeFollower })(ProfileFollowers);