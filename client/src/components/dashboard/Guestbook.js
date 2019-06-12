import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { deleteGuestbook } from "actions/profile";

const Guestbook = ({ guestbook, deleteGuestbook }) => {
  const guestbooks = guestbook.map(exp => (
    <tr key={exp._id}>
      <td>{exp.name}</td>
      <td className="hide-sm">{exp.background}</td>
      <td>
        <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment>
      </td>
      <td>
        <button
          onClick={() => deleteGuestbook(exp._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Guestbooks</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Wedding Name</th>
            <th className="hide-sm">Background</th>
            <th className="hide-sm">Date</th>
            <th />
          </tr>
        </thead>
        <tbody>{guestbooks}</tbody>
      </table>
    </Fragment>
  );
};

Guestbook.propTypes = {
  guestbook: PropTypes.array.isRequired,
  deleteGuestbook: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteGuestbook }
)(Guestbook);
