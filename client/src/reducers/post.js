import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  EDIT_POST,
  UPDATE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  UPDATE_COMMENT
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false
      };
      case EDIT_POST:
      return {
        ...state,
        edit_post: {is_edit:true,edit_id:payload},
        loading: false
      };
      case UPDATE_POST:
      return {
        ...state,
        edit_post: {is_edit:false,edit_id:''},
        posts: state.posts.map(post=>post._id !== payload._id ? post : payload),
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          )
        },
        loading: false
      };
      case EDIT_COMMENT:
      return {
        ...state,
        edit_comment: {is_edit:true,edit_id:payload},
        loading: false
      };
      case UPDATE_COMMENT:
      return {
        ...state,
        edit_comment: {is_edit:false,edit_id:''},
        post: {
        ...state.post,
        comments: state.post.comments.map(
          comment=>comment._id !== payload._id ? comment : payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}

export default postReducer;
