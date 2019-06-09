import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Guestbook from "components/dashboard/Guestbook";
import StoryItem from "components/stories/StoryItem";
import StoryForm from "components/stories/StoryForm";
import Spinner from "components/layout/Spinner";
import DashboardActions from "components/dashboard/DashboardActions";
import { getCurrentProfile, deleteAccount } from "actions/profile";
import { getCurrentUserStories } from "actions/story";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  getCurrentUserStories,
  story: { stories }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  useEffect(() => {
    getCurrentUserStories();
  }, [getCurrentUserStories]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Guestbook guestbook={profile.guestbook} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
          <h1 className="large text-primary">Your Wedding Stories</h1>
          <p className="lead">
            <i className="fas fa-user" /> Add your Wedding Story Here:
          </p>
          <StoryForm />
          <div className="stories">
            {stories.map(story => (
              <StoryItem key={story._id} story={story} />
            ))}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            Welcome to Our Wedding Story. Let's begin by entering a little about
            yourself!
          </p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Say Hello
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getCurrentUserStories: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  story: state.story
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getCurrentUserStories, deleteAccount }
)(Dashboard);
