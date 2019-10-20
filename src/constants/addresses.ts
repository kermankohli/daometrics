export enum Structure {
  Democracy = 'Democracy',
  Plutocracy = 'Plutocracy',
  Dictatorship = 'Dictatorship',
  TBD = 'TBD'
}

export type DAOInformation = {
  name: string,
  address: string, 
  structure: Structure;
}

export const daos: {[name: string]: DAOInformation} = {
  aragon: {
    name: 'Aragon',
    address: '0xcafe1a77e84698c83ca8931f54a755176ef75f2c',
    structure: Structure.TBD,
  },
  digix: {
    name: 'DigiX',
    address: '0x75ba02c5baf9cc3e9fe01c51df3cb1437e8690d4',
    structure: Structure.TBD
  },
  makerdao: {
    name: 'MakerDAO',
    address: '0x8ee7d9235e01e6b42345120b5d270bdb763624c7',
    structure: Structure.TBD
  },
  moloch: {
    name: 'MolochDAO',
    address: '0x1fd169A4f5c59ACf79d0Fd5d91D1201EF1Bce9f1',
    structure: Structure.TBD
  }
};

export const tokens: {[ticker: string]: string} = {
  DAI: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
  CDAI: '0xf5dce57282a584d2746faf1593d3121fcac444dc',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  DGX: '0x4f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf',
  WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  ANT: '0x960b236A07cf122663c4303350609A66A7B288C0',
}