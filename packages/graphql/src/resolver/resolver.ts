const balances = [
    {
      ticker: 'ETH',
      value: '1000',
    },
    {
      ticker: 'DAI',
      value: '1000',
    },
  ];

export const resolvers = {
    Query: {
      balances: () => balances,
    },
};