import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "components/layout/Spinner";
import StoryItem from "components/stories/StoryItem";
import CommentForm from "components/story/CommentForm";
import CommentItem from "components/story/CommentItem";
import { getStory } from "actions/story";

const Story = ({
  getStory,
  story: { story, loading },
  match: {
    params: { id }
  }
}) => {
  useEffect(() => {
    getStory(id);
    // eslint-disable-next-line
  }, [getStory]);

  return loading || story === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/stories" className="btn">
        Back To Stories
      </Link>
      <StoryItem story={story} showActions={false} />
      <div className="comments">
        {story.comments.map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            storyId={story._id}
          />
        ))}
      </div>
      <CommentForm storyId={story._id} />
    </Fragment>
  );
};

Story.propTypes = {
  getStory: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  story: state.story
});

export default connect(
  mapStateToProps,
  { getStory }
)(Story);
