/**
 * Created by mehulcse on 30/11/17.
 */
import React, { Component } from "react";

//components

class PatientTable extends Component {

  renderTableHeader = () => {
    return (
      <tr>
        <th>Document Name</th>
        <th>Type</th>
        <th>Request for Access</th>
        <th>Access Granted to</th>
      </tr>
    );
  };

  acceptRequest = (item, patient, type) => {
    let filter;
    if (type === 'accept') {
      patient.accepted_auth_requests.push(item);
    }
    for (let index = 0; index < patient.pending_auth_requests.length; index++) {
      if (patient.pending_auth_requests[index].id === item.id) {
        patient.pending_auth_requests.splice(index, 1);
      }
    }
    switch (this.props.user.type) {
    case 'patient':
      filter = `patient_id=${this.props.user.id}`;
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
      "patient_id": 1,
      "patient_name": patient.patient_name
    }, patient.id, filter);
  };

  renderTableBody = () => {
    if (this.props.patientList) {
      return this.props.patientList.map((patient, index) => {
        return (
          <tr key={patient.id}>
            <td>{patient.name}</td>
            <td>{patient.type === "prescription" ? "Prescription" : "Medical Record"}</td>
            <td>
              {patient.pending_auth_requests && patient.pending_auth_requests.map((item, index)=> {
                return (
                  <div key={index}>
                    <span>
                      {item.name}
                    </span>
                    <button onClick={()=> {
                      this.acceptRequest(item, patient, 'accept')
                    }}>Accept
                    </button>
                    <button onClick={()=> {
                      this.acceptRequest(item, patient, 'reject')
                    }}>Reject
                    </button>
                  </div>
                )
              })}
            </td>
            <td>
              {patient.accepted_auth_requests && patient.accepted_auth_requests.map((item, index)=> {
                return (
                  <div key={index}>
                    <span>
                      {item.name}
                    </span>
                  </div>
                )
              })}
            </td>
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

export default PatientTable;