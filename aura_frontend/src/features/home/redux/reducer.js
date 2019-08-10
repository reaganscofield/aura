import initialState from './initialState';
import { reducer as usersReducer } from './users';
import { reducer as companiesReducer } from './companies';
import { reducer as queryCompaniesReducer } from './queryCompanies';
import { reducer as addVehiculeReducer } from './addVehicule';
import { reducer as searchCompanyReducer } from './searchCompany';
import { reducer as queryVehiculesReducer } from './queryVehicules';
import { reducer as agentProfilesReducer } from './agentProfiles';
import { reducer as searchProfilesReducer } from './searchProfiles';
import { reducer as updateAgentReducer } from './updateAgent';
import { reducer as queryAgentsReducer } from './queryAgents';
import { reducer as queryPanicsReducer } from './queryPanics';
import { reducer as requesPanicsReducer } from './requesPanics';
import { reducer as findUserReducer } from './findUser';


const reducers = [
  usersReducer,
  companiesReducer,
  queryCompaniesReducer,
  addVehiculeReducer,
  searchCompanyReducer,
  queryVehiculesReducer,
  agentProfilesReducer,
  searchProfilesReducer,
  updateAgentReducer,
  queryAgentsReducer,
  queryPanicsReducer,
  requesPanicsReducer,
  findUserReducer,

];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
