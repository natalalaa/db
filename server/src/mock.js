const { RESTDataSource } = require('apollo-datasource-rest');


const MOCK_API_URL = "http://localhost:5000";
const MOCK_API_PERSON = MOCK_API_URL + "/person/";
const MOCK_API_FACILITY = MOCK_API_URL + "/facility/";
const MOCK_API_EXPOSURE = MOCK_API_URL + "/exposure/";

class MockIPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = MOCK_API_URL;
  }

  async getPersonById({ personId }) {
    let response = {}
    const resPerson = await this.get('person', { id: personId });
    if (resPerson[0].id) {
        const resFacility = await this.get('facility', { id: resPerson[0].val1 });
        if(resFacility[0].id){
            response = { ...resPerson[0], facility: resFacility[0] }
            const resExposure = await this.get('exposure', { id: resPerson[0].val2 });
            if (resExposure[0].id){
                response = { ...response, exposure: resExposure[0] }
            }
        }
    }  
    console.log(response);
    return response;
    
  }

}

module.exports = MockIPI;
