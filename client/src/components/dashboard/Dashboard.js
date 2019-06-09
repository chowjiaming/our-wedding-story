import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "components/posts/PostItem";
import PostForm from "components/posts/PostForm";
import Spinner from "components/layout/Spinner";
import DashboardActions from "components/dashboard/DashboardActions";
import { getCurrentProfile, deleteAccount } from "actions/profile";
import { getCurrentUserPosts } from "actions/post";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  getCurrentUserPosts,
  post: { posts }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  useEffect(() => {
    getCurrentUserPosts();
  }, [getCurrentUserPosts]);

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
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
          <h1 className="large text-primary">Your Wedding Stories</h1>
          <p className="lead">
            <i className="fas fa-user" /> Add your Wedding Story Here:
          </p>
          <PostForm />
          <div className="posts">
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>Welcome to Our Wedding Story. Let's begin by entering a little about yourself!</p>
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
  getCurrentUserPosts: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getCurrentUserPosts, deleteAccount }
)(Dashboard);
