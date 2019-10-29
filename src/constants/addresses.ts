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
    address: '0x1fd169a4f5c59acf79d0fd5d91d1201ef1bce9f1',
    structure: Structure.TBD
  },
  metacartel: {
    name: 'MetaCartelDAO',
    address: '0x0372f3696fa7dc99801f435fd6737e57818239f2',
    structure: Structure.TBD
  },
  yang: {
    name: 'YangDAO',
    address: '0xb3c02f093e6140ed2ad91be66b302f938cd8434f',
    structure: Structure.TBD
  },
  orochidao: {
    name: 'OrochiDAO',
    address: '0x8487dcc6f4b28b911e22a8657ebb16427d4cf5c0',
    structure: Structure.TBD
  },
  daosaka: {
    name: 'DAOsaka',
    address: '0x7d1a4fc6df3b16eb894004a4586a29f39ba6d205',
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