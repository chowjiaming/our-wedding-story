import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addGuestbook } from "actions/profile";

const AddExperience = ({ addGuestbook, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    background: "",
    location: "",
    from: "",
    openInvite: false,
    notes: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { name, background, location, from, openInvite, notes } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-primary">Add a Wedding Date</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Introduce the couple and inspire
        your friends to add to their story!
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addGuestbook(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Wedding Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* How do you know them?"
            name="background"
            value={background}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="openInvite"
              checked={openInvite}
              value={openInvite}
              onChange={() => {
                setFormData({ ...formData, openInvite: !openInvite });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Open Invite
          </p>
        </div>
        <div className="form-group">
          <textarea
            name="notes"
            cols="30"
            rows="5"
            placeholder="Notes"
            value={notes}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addGuestbook: PropTypes.func.isRequired
};

export default connect(
  null,
  { addGuestbook }
)(withRouter(AddExperience));
