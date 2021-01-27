const { ApolloServer } = require('apollo-server');

const MockAPI = require('./mock.js');


const typeDefs = `
    type Person {
        id: Int!
        val1: String!
        val2: String!
        facility: Facility
        exposure: Exposure
      }

    type Facility {
        id: Int!
        val3: String!
        val4: String!
      }
    
    type Exposure {
        id: Int!
        val5: String!
      }

    type Query {
        person (id: Int!): Person,
        facility (id: Int!): Facility,
        exposure (id: Int!): Exposure,
    }
    `;

const resolvers = {
    Query: {
        person: (_, { id }, { dataSources }) =>
            dataSources.mockAPI.getPersonById({ personId: id }),
        facility: (_, { id }, { dataSources }) =>
            dataSources.mockAPI.getFacilityById({ val1: id }),
        exposure: (_, { id }, { dataSources }) =>
            dataSources.mockAPI.getExposureById({ val2: id }),
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        mockAPI: new MockAPI()
    })
});

server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
  });




/*

const axios = require('axios');

const MOCK_API_URL = "http://localhost:5000";
const MOCK_API_PERSON = MOCK_API_URL + "/person/";
const MOCK_API_FACILITY = MOCK_API_URL + "/facility/";
const MOCK_API_EXPOSURE = MOCK_API_URL + "/exposure/";

let val3 = null;
let val5 = null;

let input = (Math.floor(Math.random() * Math.floor(1000))); //temp

async function run(input) {
    try {
        const response = await axios.get(MOCK_API_PERSON + input);
        console.log(response.data);
        const val3 = await getFacility(response.data.val1);
        const val5 = await getExposure(response.data.val2);

        runServer(val3, val5);
 

    } catch (error) {
        console.error(error);
    }
};

async function getFacility(input) {
    try {
        const response = await axios.get(MOCK_API_FACILITY + input);
        console.log(response.data);
        return response.data.val3;
    } catch (error) {
        console.error(error);
    }
};

async function getExposure(input) {
    try {
        const response = await axios.get(MOCK_API_EXPOSURE + input);
        console.log(response.data);
        return response.data.val5;
    } catch (error) {
        console.error(error);
    }
};

function runServer(val3, val5) {

    console.log("val3",val3);
    console.log("val5",val5);

    const typeDefs = `
    type Person {
        id: Int!
        val3: String!
        val5: String!
      }

    type Query {
        person (id: Int!): Person,
        val3: String!,
        val5: String!,
    }
    `;

    const resolvers = {
        Query: {
            val3: () => { 
                //console.log(context.myProperty); // Will be `true`!
                return val3;
            } ,
            val5: () => val5
        }
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            console.log("req", req);
            return {
              myProperty: true
            };
          },
    })

    server
        .listen()
        .then(({ url }) => {
            console.log(`Server is running on ${url}`);

        }

        );
}


run(input);


*/

