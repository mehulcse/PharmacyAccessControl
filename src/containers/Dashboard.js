/**
 * Created by mehulcse on 11/12/17.
 */

import React, { Component } from "react";
import { getList, updateList } from "./../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PatientTable from "../components/PatientTable";
import DoctorTable from "../components/DoctorTable";

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.user && this.props.user.type) {
      switch (this.props.user.type) {
      case 'patient':
        this.props.getList(`patient_id=${this.props.user.id}`);
        break;
      case 'doctor':
        this.props.getList(`type=medical_record`);
        break;
      case 'pharmacist':
        this.props.getList(`type=prescription`);
        break;
      }
    }
  }

  renderTable = (user) => {
    if (user && user.type) {
      switch (user.type) {
      case 'patient':
        return <PatientTable patientList={this.props.patientList}
                             updateList={this.props.updateList}
                             user={this.props.user}/>;
      case 'doctor':
      case 'pharmacist':
        return <DoctorTable patientList={this.props.patientList}
                            updateList={this.props.updateList}
                            user={this.props.user}/>;
      default:
        return null;
      }
    }
  };

  render() {
    return (
      <div className="dashboard_content">
        <div>
          <button onClick={()=> {
            this.props.history.push("/");
          }}>
            Logout
          </button>
        </div>
        {this.renderTable(this.props.user)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.users.user, patientList: state.users.patientList };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getList, updateList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
