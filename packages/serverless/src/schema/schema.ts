import { gql } from './node_modules/apollo-server'

export const typeDefs = gql`
    type Snapshot {
        id: ID!
        date: Int! 
        result: Result!
    }

    type Result {
        address: String!
        balances: [Balance]!
        usdBalances: [Balance]!
        usdTotal: Int!
    }

    type Balance {
        ticker: String!
        value: Int!
    }

    type Query {
        balances: [Balance]!
    }
`;