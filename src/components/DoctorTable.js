/**
 * Created by mehulcse on 11/12/17.
 */

import React, { Component } from "react";

//components

class DoctorTable extends Component {

  renderTableHeader = () => {
    return (
      <tr>
        <th>Patient Name</th>
        <th>Document Name</th>
        <th>Request for Access</th>
      </tr>
    );
  };

  requestDocument = (patient) => {
    let filter;
    const { user } = this.props;
    patient.pending_auth_requests.push({
      "id": user.id,
      "name": user.name
    });
    switch (user.type) {
    case 'patient':
      filter = `patient_id=${user.id}`;
      break;
    case 'doctor':
      filter = `type=medical_record`;
      break;
    case 'pharmacist':
      filter = `type=prescription`;
      break;
    }
    this.props.updateList({
      "pending_auth_requests": patient.pending_auth_requests,
      "accepted_auth_requests": patient.accepted_auth_requests,
      "type": patient.type,
      "name": patient.name,
      "patient_id": patient.patient_id,
      "patient_name": patient.patient_name
    }, patient.id, filter);
  };

  renderAccessControl = (patient) => {
    let accessStatus;
    for (let index = 0; index < patient.pending_auth_requests.length; index++) {
      if (patient.pending_auth_requests[index].id === this.props.user.id) {
        accessStatus = 'pending';
      }
    }
    for (let index = 0; index < patient.accepted_auth_requests.length; index++) {
      if (patient.accepted_auth_requests[index].id === this.props.user.id) {
        accessStatus = 'granted';
      }
    }
    if (accessStatus === 'pending') {
      return (<td>Access request is pending for confirmation.</td>);
    } else if (accessStatus === 'granted') {
      return (<td>You have access to this document.</td>);
    } else {
      return (
        <td>
          <button onClick={()=> {
            this.requestDocument(patient)
          }}>
            Request
          </button>
        </td>
      )
    }
  };

  renderTableBody = () => {
    if (this.props.patientList) {
      return this.props.patientList.map((patient, index) => {
        return (
          <tr key={patient.id}>
            <td>{patient.patient_name}</td>
            <td>{patient.name}</td>
            {this.renderAccessControl(patient)}
          </tr>
        );
      });
    }
  };

  render() {
    return (
      <div className="table-responsive claim-list">
        <table className="table table-striped">
          <thead>
          {this.renderTableHeader()}
          </thead>
          <tbody>
          {this.renderTableBody()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DoctorTable;
