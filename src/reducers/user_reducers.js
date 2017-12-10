/**
 * Created by mehulcse on 01/12/17.
 */

export default function(state={}, action) {
  switch (action.type) {
  case 'LOGGED_SUCCESSFULLY':
    return {...state, user: action.payload};
  case 'LOGGED_FAILED':
    return {...state, user: action.payload};
  case 'PATIENT_LIST':
    return {...state, patientList: action.payload};
  default:
    return state;
  }
}