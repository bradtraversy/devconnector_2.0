import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect, useSelector } from 'react-redux';
import { addLike, removeLike, deletePost, editPost, updatePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  editPost,
  updatePost,
  postEdit,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
  showEditForm
}) => { 
  const [updateText, setUpdateText] = useState(text);
  //const postEdit = useSelector(state=>state.post.edit_post);
  const auth = useSelector(state=>state.auth);
  return (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      {showEditForm && postEdit && postEdit.is_edit && postEdit.edit_id == _id ? (
          <Fragment>
            <form className="form" style={{display: "flex"}} onSubmit={e => {
          e.preventDefault();
          updatePost(postEdit.edit_id,{ "text":updateText });
        }}>
            <textarea
          name='text'
          cols='30'
          rows='0'
          placeholder='Update a post'
          value={updateText}
          onChange={e => setUpdateText(e.target.value)}
          required
        />
        <button type='submit' className='btn btn-light'><i className="fas fa-upload" /></button>
            </form>
            <br/>
          </Fragment>
        ) : (<Fragment><p className="my-1">{text}</p></Fragment>)
        }
      <p className="post-date">Posted on {formatDate(date)}</p>

      {showActions && (
        <Fragment>
          <button
            onClick={() => addLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up" />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down" />
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion{' '}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <Fragment>
            <button
              onClick={() => deletePost(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
            <button
            onClick={() => editPost(_id)}
            type="button"
            className="btn btn-success"
          >
            <i className="fas fa-pen" />
          </button>
          </Fragment>
          )}
        </Fragment>
      )}
    </div>
  </div>
)};

PostItem.defaultProps = {
  showActions: true,
  showEditForm: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  postEdit: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
  showEditForm: PropTypes.bool
};

const mapStateToProps = (state) => ({
  postEdit: state.post.edit_post
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost, editPost, updatePost })(
  PostItem
);
