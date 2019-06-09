import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addStory } from "actions/story";

const StoryForm = ({ addStory }) => {
  const [text, setText] = useState("");

  return (
    <div className="story-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addStory({ text });
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a story"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

StoryForm.propTypes = {
  addStory: PropTypes.func.isRequired
};

export default connect(
  null,
  { addStory }
)(StoryForm);
