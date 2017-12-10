/**
 * Created by mehulcse on 01/12/17.
 */

const URL_ROOT = "http://localhost:3004";

export function loginError(error = {}) {
  return { error, type: 'LOGGED_FAILED' };
}

export function loginSuccess(response) {
  return dispatch => {
    dispatch({ payload: response, type: 'LOGGED_SUCCESSFULLY' });
  };
}

export function login(email, password, cb) {
  return dispatch => fetch(`${URL_ROOT}/users?email=${email}&password=${password}`, {method: "GET"}).then(response => response.json()).then(
    data => {
      if(data && Array.isArray(data) && data.length > 0) {
        dispatch(loginSuccess(data[0]));
        cb();
      } else {
        dispatch(loginError(data));
      }
    }
  )
      .catch(error => { console.log('request failed', error); });
}

export function setDetails(data) {
  return { payload: data, type: 'PATIENT_LIST' };
}

export function getList(filter) {
  return dispatch => fetch(`${URL_ROOT}/patientsTable?${filter}`, {method: "GET"}).then(response => response.json()).then(
    data => {
        dispatch(setDetails(data));
    }
  ).catch(error => { console.log('request failed', error); });
}

export function updateList(object, id, filter) {
  return dispatch => fetch(`${URL_ROOT}/patientsTable/${id}`,
    {
      method: 'PUT',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object)
    }
  ).then( response => response.json()).then(data => {
    dispatch(getList(filter));
  });

}