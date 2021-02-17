import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteComment, editComment, updateComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
  editComment,
  updateComment,
  commentEdit,
}) => {
  const [updateText, setUpdateText] = useState(text);
  return (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
    {commentEdit && commentEdit.is_edit && commentEdit.edit_id == _id ? (
          <Fragment>
            <form className="form" style={{display: "flex"}} onSubmit={e => {
          e.preventDefault();
          updateComment(postId,commentEdit.edit_id,{ "text":updateText });
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
      {!auth.loading && user === auth.user._id && (
        <Fragment>
        <button
          onClick={() => deleteComment(postId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
        <button
        onClick={() => editComment(_id)}
        type="button"
        className="btn btn-success"
      >
        <i className="fas fa-pen" />
      </button>
      </Fragment>
      )}
    </div>
  </div>
)};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  commentEdit: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  auth: state.auth,
  commentEdit: state.post.edit_comment
});

export default connect(mapStateToProps, { deleteComment, editComment, updateComment })(CommentItem);
