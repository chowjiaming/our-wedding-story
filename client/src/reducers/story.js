import {
  GET_STORIES,
  STORY_ERROR,
  UPDATE_LIKES,
  DELETE_STORY,
  ADD_STORY,
  GET_STORY,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "actions/types";

const initialState = {
  stories: [],
  story: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_STORIES:
      return {
        ...state,
        stories: payload,
        loading: false
      };
    case GET_STORY:
      return {
        ...state,
        story: payload,
        loading: false
      };
    case ADD_STORY:
      return {
        ...state,
        stories: [payload, ...state.stories],
        loading: false
      };
    case DELETE_STORY:
      return {
        ...state,
        stories: state.stories.filter(story => story._id !== payload),
        loading: false
      };
    case STORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        stories: state.stories.map(story =>
          story._id === payload.id ? { ...story, likes: payload.likes } : story
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        story: { ...state.story, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        story: {
          ...state.story,
          comments: state.story.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}
