import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "components/layout/Spinner";
import StoryItem from "components/stories/StoryItem";
import { getStories } from "actions/story";

const Stories = ({ getStories, story: { stories, loading } }) => {
  useEffect(() => {
    getStories();
  }, [getStories]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Our Wedding Stories</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <div className="stories">
        {stories.map(story => (
          <StoryItem key={story._id} story={story} />
        ))}
      </div>
    </Fragment>
  );
};

Stories.propTypes = {
  getStories: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  story: state.story
});

export default connect(
  mapStateToProps,
  { getStories }
)(Stories);
