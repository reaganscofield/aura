const initialState = {
  usersPending: false,
  usersError: null,
  user: {},
  
  companiesPending: false,
  companiesError: null,
  company: {},

  queryCompaniesPending: false,
  queryCompaniesError: null,
  companies_data: [],

  addVehiculePending: false,
  addVehiculeError: null,
  vehicule: {},

  searchCompanyPending: false,
  searchCompanyError: null,
  search_company: [],

  queryVehiculesPending: false,
  queryVehiculesError: null,

  agentProfilesPending: false,
  agentProfilesError: null,
  agent_data: {},

  searchProfilesPending: false,
  searchProfilesError: null,
  agent_query_result: [],

  updateAgentPending: false,
  updateAgentError: null,
  updated_data: {},

  queryAgentsPending: false,
  queryAgentsError: null,
  agents_data: [],

  queryPanicsPending: false,
  queryPanicsError: null,
  panics_data: [],

  requesPanicsPending: false,
  requesPanicsError: null,
  request_panic_data: {},

  findUserPending: false,
  findUserError: null,
  user_finds: {}
};

export default initialState;
