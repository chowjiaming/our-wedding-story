import axios from "axios";
import { setAlert } from "./alert";
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

// Get stories
export const getStories = () => async dispatch => {
  try {
    const res = await axios.get("/api/stories");
    dispatch({
      type: GET_STORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get current user's stories
export const getCurrentUserStories = () => async dispatch => {
  try {
    const res = await axios.get("/api/stories/current");
    dispatch({
      type: GET_STORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/stories/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/stories/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete story
export const deleteStory = id => async dispatch => {
  try {
    await axios.delete(`/api/stories/${id}`);
    dispatch({
      type: DELETE_STORY,
      payload: id
    });

    dispatch(setAlert("Story Removed", "success"));
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add story
export const addStory = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/api/stories", formData, config);

    dispatch({
      type: ADD_STORY,
      payload: res.data
    });

    dispatch(setAlert("Story Created", "success"));
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get story
export const getStory = id => async dispatch => {
  try {
    const res = await axios.get(`/api/stories/${id}`);
    dispatch({
      type: GET_STORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (storyId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(
      `/api/stories/comment/${storyId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (storyId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/stories/comment/${storyId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });
    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
