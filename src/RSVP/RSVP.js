import React, { PureComponent } from "react";
import DataFrame from "dataframe-js";
import styles from "./RSVP.module.scss";
import request from "request";

const GET_ATTENDEES_URL =
  "https://script.google.com/macros/s/AKfycbyky0PZkAOw2WUT5mzhwabPyWk5j_AUUj3cWuIM/exec";
const POST_ATTENDEES_URL =
  "https://script.google.com/macros/s/AKfycbx7RkLwAfmzKZPsQpbmUfCooykkDg5MOZVsXk1oNQ/exec";

class RSVP extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.fetchAttendees_();
  }

  fetchAttendees_ = () => {
    request.get(GET_ATTENDEES_URL, (error, response) => {
      const responseData = JSON.parse(response.body);
      const data = new DataFrame(responseData.rows, responseData.headers);
      this.setState({
        initialData: data,
        data,
      });
    });
  };

  postAttendees_ = () => {
    const { data } = this.state;
    this.getDiff_()
      .toCollection()
      .forEach(row => {
        const { id, rsvpd, rsvpdPlusOne, needsHotel } = row;
        request.get({
          url: POST_ATTENDEES_URL,
          qs: {
            id,
            rsvpd,
            rsvpdPlusOne,
            needsHotel,
          },
          useQuerystring: true,
        });
      });
    this.setState({ initialData: data });
  };

  getDiff_ = () => {
    const { data, initialData } = this.state;
    return data.filter((row, index) => {
      const {
        id,
        rsvpd: newRsvpd,
        rsvpdPlusOne: newRsvpdPlusOne,
        needsHotel: newNeedsHotel,
      } = row.toDict();
      const { rsvpd, rsvpdPlusOne, needsHotel } = initialData
        .find(row => row.get("id") === id)
        .toDict();
      return (
        newRsvpd !== rsvpd ||
        newRsvpdPlusOne !== rsvpdPlusOne ||
        newNeedsHotel !== needsHotel
      );
    });
  };

  hasChanges_ = () => {
    if (!this.state.data) return false;
    return this.getDiff_().count() > 0;
  }

  handleInputChange_ = e => {
    const { checked, name, type, value } = e.target;
    this.setState({ [name]: type === "checkbox" ? checked : value });
  };

  handleFamilyMemberChanged_ = familyMember => {
    const { data } = this.state;
    const headers = data.listColumns();
    const rows = data
      .toCollection()
      .map(row => (row.id === familyMember.id ? familyMember : row));
    const newData = new DataFrame(rows, headers);
    this.setState({ data: newData });
  };

  handleSubmit_ = () => {
    this.postAttendees_();
  };

  rowHasName_ = familyMember => {
    const firstName = familyMember.get("firstName");
    const lastName = familyMember.get("lastName");
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    return fullName.includes(this.state.name.toLowerCase());
  };

  renderFamilies_ = () => {
    if (!this.state.data) return;
    if (this.state.name === "") return;

    const matchingFamilyIds = this.state.data
      .where(this.rowHasName_)
      .distinct("familyId")
      .toCollection()
      .map(row => row.familyId);

    return this.state.data
      .filter(row => matchingFamilyIds.includes(row.get("familyId")))
      .groupBy("familyId", "familyName")
      .aggregate(family => family)
      .toCollection()
      .map(family => (
        <Family
          key={family.familyId}
          family={family.aggregation.toCollection()}
          familyName={family.familyName}
          onFamilyMemberChanged={this.handleFamilyMemberChanged_}
        />
      ));
  };

  render() {
    return (
      <div className={styles.rsvp + " card"}>
        <div className={styles.formHeader}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Gallagher"
              value={this.state.name}
              onChange={this.handleInputChange_}
            />
          </div>
          <button onClick={this.handleSubmit_} disabled={!this.hasChanges_()}>
            Submit
          </button>
        </div>
        <div className={styles.families}>{this.renderFamilies_()}</div>
      </div>
    );
  }
}

class Family extends PureComponent {
  renderFamilyMembers_ = () => {
    const { family, onFamilyMemberChanged } = this.props;
    return family.map(familyMember => (
      <FamilyMember
        key={familyMember.id}
        familyMember={familyMember}
        onFamilyMemberChanged={onFamilyMemberChanged}
      />
    ));
  };

  render() {
    return (
      <div className={styles.family}>
        <div className={styles.familyName}>{this.props.familyName}</div>
        <div className={styles.familyMembers}>
          {this.renderFamilyMembers_()}
        </div>
      </div>
    );
  }
}

class FamilyMember extends PureComponent {
  constructor(props) {
    super(props);
    const { familyMember } = props;
    this.state = {
      rsvpd: familyMember.rsvpd,
      rsvpdPlusOne: familyMember.rsvpdPlusOne,
      needsHotel: familyMember.needsHotel,
    };
  }

  handleInputChange_ = e => {
    const { checked, name, type, value } = e.target;
    const { familyMember, onFamilyMemberChanged } = this.props;
    this.setState({ [name]: type === "checkbox" ? checked : value }, newState =>
      onFamilyMemberChanged({
        ...familyMember,
        rsvpd: this.state.rsvpd,
        rsvpdPlusOne: this.state.rsvpdPlusOne,
        needsHotel: this.state.needsHotel,
      }),
    );
  };

  render() {
    const { familyMember } = this.props;
    return (
      <div className={styles.familyMember}>
        <div className={styles.familyMemberName}>
          {familyMember.firstName} {familyMember.lastName}
        </div>
        <label>
          RSVP
          <input
            type="checkbox"
            name="rsvpd"
            checked={this.state.rsvpd}
            onChange={this.handleInputChange_}
          />
        </label>
        <label>
          RSVP +1
          <input
            type="checkbox"
            name="rsvpdPlusOne"
            checked={this.state.rsvpdPlusOne}
            onChange={this.handleInputChange_}
          />
        </label>
        <label>
          Need Hotel Room
          <input
            type="checkbox"
            name="needsHotel"
            checked={this.state.needsHotel}
            onChange={this.handleInputChange_}
          />
        </label>
      </div>
    );
  }
}

export default RSVP;
