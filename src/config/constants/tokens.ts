import { ChainId, CHAINKEY, Token } from '@my/sdk';
import { BASE_BSC_SCAN_URL, chainKey } from 'config';

export const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);
export const tokens = {
  [CHAINKEY.ASTR]: {
    dot: {
      symbol: 'dot'.toUpperCase(),
      address: {
        [ChainId.ASTR_MAINNET]: '0xffffffffffffffffffffffffffffffffffffffff',
        [ChainId.ASTR_TESTNET]: '0xffffffffffffffffffffffffffffffffffffffff',
      },
      decimals: 10,
      projectLink: '',
    },
    aca: {
      symbol: 'ACA',
      address: {
        [ChainId.ASTR_MAINNET]: '0xffffffff00000000000000010000000000000000',
        [ChainId.ASTR_TESTNET]: '0xffffffff00000000000000010000000000000000',
      },
      decimals: 12,
      projectLink: '',
    },
    muuu: {
      symbol: 'muuu'.toUpperCase(),
      address: {
        [ChainId.ASTR_MAINNET]: '0xc5bcac31cf55806646017395ad119af2441aee37',
        [ChainId.ASTR_TESTNET]: '0xc5bcac31cf55806646017395ad119af2441aee37',
      },
      decimals: 18,
      projectLink: '',
    },
    kgl: {
      symbol: 'kgl'.toUpperCase(),
      address: {
        [ChainId.ASTR_MAINNET]: '0x257f1a047948f73158dadd03eb84b34498bcdc60',
        [ChainId.ASTR_TESTNET]: '0x257f1a047948f73158dadd03eb84b34498bcdc60',
      },
      decimals: 18,
      projectLink: '',
    },
    lay: {
      symbol: 'lay'.toUpperCase(),
      address: {
        [ChainId.ASTR_MAINNET]: '0xc4335b1b76fa6d52877b3046eca68f6e708a27dd',
        [ChainId.ASTR_TESTNET]: '0xc4335b1b76fa6d52877b3046eca68f6e708a27dd',
      },
      decimals: 18,
      projectLink: '',
    },
    ousd: {
      symbol: 'ousd'.toUpperCase(),
      address: {
        [ChainId.ASTR_MAINNET]: '0x29f6e49c6e3397c3a84f715885f9f233a441165c',
        [ChainId.ASTR_TESTNET]: '0x29f6e49c6e3397c3a84f715885f9f233a441165c',
      },
      decimals: 18,
      projectLink: '',
    },
    bai: {
      symbol: 'bai'.toUpperCase(),
      address: {
        [ChainId.ASTR_MAINNET]: '0x733ebcc6df85f8266349defd0980f8ced9b45f35',
        [ChainId.ASTR_TESTNET]: '0x733ebcc6df85f8266349defd0980f8ced9b45f35',
      },
      decimals: 18,
      projectLink: '',
    },
    nika: {
      symbol: 'nika'.toUpperCase(),
      address: {
        [ChainId.ASTR_MAINNET]: '0x6df98e5fbff3041105cb986b9d44c572a43fcd22',
        [ChainId.ASTR_TESTNET]: '0x6df98e5fbff3041105cb986b9d44c572a43fcd22',
      },
      decimals: 18,
      projectLink: '',
    },
    oru: {
      symbol: 'oru'.toUpperCase(),
      address: {
        [ChainId.ASTR_MAINNET]: '0xcdb32eed99aa19d39e5d6ec45ba74dc4afec549f',
        [ChainId.ASTR_TESTNET]: '0xcdb32eed99aa19d39e5d6ec45ba74dc4afec549f',
      },
      decimals: 18,
      projectLink: '',
    },
    jpyc: {
      symbol: 'jpyc'.toUpperCase(),
      address: {
        [ChainId.ASTR_MAINNET]: '0x431d5dff03120afa4bdf332c61a6e1766ef37bdb',
        [ChainId.ASTR_TESTNET]: '0x431d5dff03120afa4bdf332c61a6e1766ef37bdb',
      },
      decimals: 18,
      projectLink: '',
    },
    ibASTR: {
      symbol: 'ibASTR',
      address: {
        [ChainId.ASTR_MAINNET]: '0x3BFcAE71e7d5ebC1e18313CeCEbCaD8239aA386c',
        [ChainId.ASTR_TESTNET]: '0x50CE77Ed745374980aE8366424e79D08bD1BB37B',
      },
      decimals: 18,
      projectLink: '',
    },
    arsw: {
      symbol: 'ARSW',
      address: {
        [ChainId.ASTR_MAINNET]: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
        [ChainId.ASTR_TESTNET]: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      },
      decimals: 18,
      projectLink: '',
    },
    astr: {
      symbol: 'WASTR',
      address: {
        [ChainId.ASTR_MAINNET]: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
        [ChainId.ASTR_TESTNET]: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      },
      decimals: 18,
      projectLink: 'https://blockscout.com/astar/',
    },
    kaco: {
      symbol: 'KAC',
      address: {
        [ChainId.ASTR_MAINNET]: '0x2bF9b864cdc97b08B6D79ad4663e71B8aB65c45c',
        [ChainId.ASTR_TESTNET]: '0x2bF9b864cdc97b08B6D79ad4663e71B8aB65c45c',
      },
      decimals: 18,
      projectLink: 'https://kaco.finance/',
    },

    usdt: {
      symbol: 'USDT',
      address: {
        [ChainId.ASTR_MAINNET]: '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283',
        [ChainId.ASTR_TESTNET]: '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283',
      },
      decimals: 6,
      projectLink: 'https://tether.to/',
    },

    usdc: {
      symbol: 'USDC',
      address: {
        [ChainId.ASTR_MAINNET]: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
        [ChainId.ASTR_TESTNET]: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      },
      decimals: 6,
      projectLink: 'https://www.centre.io/usdc',
    },

    dai: {
      symbol: 'DAI',
      address: {
        [ChainId.ASTR_MAINNET]: '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb',
        [ChainId.ASTR_TESTNET]: '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb',
      },
      decimals: 18,
      projectLink: 'https://www.centre.io/usdc',
    },

    eth: {
      symbol: 'WETH',
      address: {
        [ChainId.ASTR_MAINNET]: '0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c',
        [ChainId.ASTR_TESTNET]: '0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c',
      },
      decimals: 18,
      projectLink: 'https://ethereum.org/en/',
    },

    bnb: {
      symbol: 'BNB',
      address: {
        [ChainId.ASTR_MAINNET]: '0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52',
        [ChainId.ASTR_TESTNET]: '0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52',
      },
      decimals: 18,
      projectLink: 'https://bitcoin.org/',
    },
    busd: {
      symbol: 'BUSD',
      address: {
        [ChainId.ASTR_MAINNET]: '0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E',
        [ChainId.ASTR_TESTNET]: '0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E',
      },
      decimals: 18,
      projectLink: 'https://bitcoin.org/',
    },

    btc: {
      symbol: 'WBTC',
      address: {
        [ChainId.ASTR_MAINNET]: '0xad543f18cFf85c77E140E3E5E3c3392f6Ba9d5CA',
        [ChainId.ASTR_TESTNET]: '0xad543f18cFf85c77E140E3E5E3c3392f6Ba9d5CA',
      },
      decimals: 8,
      projectLink: 'https://bitcoin.org/',
    },

    pkex: {
      symbol: 'PKEX',
      address: {
        [ChainId.ASTR_MAINNET]: '0x1fE622E91e54D6AD00B01917351Ea6081426764A',
        [ChainId.ASTR_TESTNET]: '0x1fE622E91e54D6AD00B01917351Ea6081426764A',
      },
      decimals: 18,
      projectLink: 'https://www.paxos.com/busd/',
    },

    sdn: {
      symbol: 'SDN',
      address: {
        [ChainId.ASTR_MAINNET]: '0x75364D4F779d0Bd0facD9a218c67f87dD9Aff3b4',
        [ChainId.ASTR_TESTNET]: '0x75364D4F779d0Bd0facD9a218c67f87dD9Aff3b4',
      },
      decimals: 18,
      projectLink: 'https://www.paxos.com/busd/',
    },

    matic: {
      symbol: 'MATIC',
      address: {
        [ChainId.ASTR_MAINNET]: '0xdd90E5E87A2081Dcf0391920868eBc2FFB81a1aF',
        [ChainId.ASTR_TESTNET]: '0xdd90E5E87A2081Dcf0391920868eBc2FFB81a1aF',
      },
      decimals: 18,
      projectLink: 'https://www.paxos.com/busd/',
    },

    aave: {
      symbol: 'AAVE',
      address: {
        [ChainId.ASTR_MAINNET]: '0xfcDe4A87b8b6FA58326BB462882f1778158B02F1',
        [ChainId.ASTR_TESTNET]: '0xfcDe4A87b8b6FA58326BB462882f1778158B02F1',
      },
      decimals: 18,
      projectLink: 'https://www.paxos.com/busd/',
    },

    crv: {
      symbol: 'CRV',
      address: {
        [ChainId.ASTR_MAINNET]: '0x7756a83563f0f56937A6FdF668E7D9F387c0D199',
        [ChainId.ASTR_TESTNET]: '0x7756a83563f0f56937A6FdF668E7D9F387c0D199',
      },
      decimals: 18,
      projectLink: 'https://www.paxos.com/busd/',
    },
  },
};
export const main_tokens = {
  astr: {
    symbol: 'ASTR',
    name: 'ASTR',
    decimals: 18,
    address: {
      [ChainId.ASTR_MAINNET]: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      [ChainId.ASTR_TESTNET]: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
    projectLink: 'https://blockscout.com/astar/',
  },
  sdn: {
    symbol: 'WSDN',
    name: 'Wrapped SDN',
    decimals: 18,
    address: {
      [ChainId.SDN_MAINNET]: '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
      [ChainId.SDN_TESTNET]: '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
    },
    projectLink: 'https://shiden.subscan.io/',
  },
  bnb: {
    symbol: 'BNB',
    name: 'BNB Token',
    address: {
      [ChainId.BSC_MAINNET]: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      [ChainId.BSC_TESTNET]: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
    },
    decimals: 18,
    projectLink: 'https://www.binance.com/',
  },
  kaco: {
    name: 'Kaco Token',
    symbol: 'KAC',
    address: {
      [ChainId.ASTR_MAINNET]: '0x2bF9b864cdc97b08B6D79ad4663e71B8aB65c45c',
      [ChainId.ASTR_TESTNET]: '0x2bF9b864cdc97b08B6D79ad4663e71B8aB65c45c',
      [ChainId.SDN_MAINNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
      [ChainId.SDN_TESTNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
      [ChainId.BSC_MAINNET]: '0xf96429A7aE52dA7d07E60BE95A3ece8B042016fB',
      [ChainId.BSC_TESTNET]: '0x0bA819e30016Cf682C7795b44859148C65e62292',
    },
    decimals: 18,
    projectLink: BASE_BSC_SCAN_URL,
  },
};

export const DEFAULT_Token = {
  [ChainId.BSC_MAINNET]: {
    address: main_tokens.bnb.address[ChainId.BSC_MAINNET],
    decimals: main_tokens.bnb.decimals,
    symbol: main_tokens.bnb.symbol,
    name: main_tokens.bnb.name,
  },
  [ChainId.BSC_TESTNET]: {
    address: main_tokens.bnb.address[ChainId.BSC_TESTNET],
    decimals: main_tokens.bnb.decimals,
    symbol: main_tokens.bnb.symbol,
    name: main_tokens.bnb.name,
  },
  [ChainId.ASTR_MAINNET]: {
    address: main_tokens.astr.address[ChainId.ASTR_MAINNET],
    decimals: main_tokens.astr.decimals,
    symbol: main_tokens.astr.symbol,
    name: main_tokens.astr.name,
  },
  [ChainId.SDN_MAINNET]: {
    address: main_tokens.sdn.address[ChainId.SDN_MAINNET],
    decimals: main_tokens.sdn.decimals,
    symbol: main_tokens.sdn.symbol,
    name: main_tokens.sdn.name,
  },
};
export const Base_Token: Token = new Token(
  chainId,
  DEFAULT_Token[chainId].address,
  DEFAULT_Token[chainId].decimals,
  DEFAULT_Token[chainId].symbol,
  DEFAULT_Token[chainId].name,
);

export const BTC: Token = CHAINKEY.ASTR
  ? new Token(
      chainId,
      tokens[chainKey].btc.address[chainId],
      tokens[chainKey].btc.decimals,
      tokens[chainKey].btc.symbol,
      'BTC Coin',
    )
  : null;
export const Kaco: Token = CHAINKEY.SDN
  ? new Token(chainId, main_tokens.kaco.address[chainId], 18, main_tokens.kaco.symbol, main_tokens.kaco.name)
  : null;

export const BUSD: { [chainId: number]: Token } = {
  [ChainId.SDN_MAINNET]: new Token(
    ChainId.SDN_MAINNET as any,
    '0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a',
    18,
    'BUSD',
    'Binance USD',
  ),
  [ChainId.SDN_TESTNET]: new Token(
    ChainId.SDN_TESTNET as any,
    '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
    18,
    'BUSD',
    'Binance USD',
  ),

  [ChainId.ASTR_MAINNET]: new Token(
    chainId,
    tokens[chainKey].usdc.address[chainId],
    tokens[chainKey].usdc.decimals,
    tokens[chainKey].usdc.symbol,
    'USD Coin',
  ),
  [ChainId.ASTR_TESTNET]: new Token(
    chainId,
    tokens[chainKey].usdc.address[chainId],
    tokens[chainKey].usdc.decimals,
    tokens[chainKey].usdc.symbol,
    'USD Coin',
  ),
};

export const DOT: { [chainId: number]: Token } = {
  [ChainId.ASTR_MAINNET]: new Token(
    chainId,
    tokens[chainKey].dot.address[chainId],
    tokens[chainKey].dot.decimals,
    tokens[chainKey].dot.symbol,
    'DOT Coin',
  ),
  [ChainId.ASTR_TESTNET]: new Token(
    ChainId.ASTR_TESTNET as any,
    '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
    tokens[chainKey].dot.decimals,
    'DOT',
    'DOT Token',
  ),
  [ChainId.SDN_MAINNET]: new Token(
    ChainId.SDN_MAINNET as any,
    '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
    18,
    'DOT',
    'DOT Token',
  ),
  [ChainId.SDN_TESTNET]: new Token(
    ChainId.SDN_TESTNET as any,
    '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
    18,
    'DOT',
    'DOT Token',
  ),
  [ChainId.BSC_MAINNET]: new Token(
    ChainId.BSC_MAINNET as any,
    '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
    18,
    'DOT',
    'DOT Token',
  ),
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET as any,
    '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    18,
    'DOT',
    'FAKE DOT',
  ),
};

export const KSM: { [chainId: number]: Token } = {
  [ChainId.SDN_MAINNET]: new Token(
    ChainId.SDN_MAINNET as any,
    '0x2aa69e8d25c045b659787bc1f03ce47a388db6e8',
    18,
    'KSM',
    'KSM Token',
  ),
  [ChainId.SDN_TESTNET]: new Token(
    ChainId.SDN_TESTNET as any,
    '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    18,
    'KSM',
    'FAKE KSM',
  ),
  [ChainId.BSC_MAINNET]: new Token(
    ChainId.BSC_MAINNET as any,
    '0x2aa69e8d25c045b659787bc1f03ce47a388db6e8',
    18,
    'KSM',
    'KSM Token',
  ),
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET as any,
    '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    18,
    'KSM',
    'FAKE KSM',
  ),
};

export const DAI = new Token(
  ChainId.BSC_MAINNET as any,
  '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
  18,
  'DAI',
  'Dai Stablecoin',
);
export const USDT = new Token(
  chainId,
  tokens[chainKey].usdt.address[chainId],
  tokens[chainKey].usdt.decimals,
  tokens[chainKey].usdt.symbol,
  'Tether USD',
);

export const BTCB: { [chainId: number]: Token } = {
  [ChainId.SDN_MAINNET]: new Token(
    ChainId.SDN_MAINNET as any,
    '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    18,
    'BTCB',
    'Binance BTC',
  ),
  [ChainId.SDN_TESTNET]: new Token(
    ChainId.SDN_TESTNET as any,
    '0x6ce8da28e2f864420840cf74474eff5fd80e65b8',
    18,
    'BTCB',
    'Binance BTC',
  ),
};

export const ETH = {
  [ChainId.SDN_MAINNET]: new Token(
    ChainId.SDN_MAINNET as any,
    '0x765277eebeca2e31912c9946eae1021199b39c61',
    18,
    'ETH',
    'Binance-Peg Ethereum Token',
  ),
  [ChainId.ASTR_MAINNET]: new Token(
    chainId,
    tokens[chainKey].eth.address[chainId],
    tokens[chainKey].eth.decimals,
    tokens[chainKey].eth.symbol,
    'Binance-Peg Ethereum Token',
  ),
};
export const USDC = new Token(
  chainId,
  tokens[chainKey].usdc.address[chainId],
  tokens[chainKey].usdc.decimals,
  tokens[chainKey].usdc.symbol,
  'usdc Token',
);

export const JPYC = new Token(
  chainId,
  tokens[chainKey].jpyc.address[chainId],
  tokens[chainKey].jpyc.decimals,
  tokens[chainKey].jpyc.symbol,
  'JPYC Coin',
);
export const ALPACA: { [chainId: number]: Token } = {
  [ChainId.BSC_MAINNET]: new Token(
    ChainId.BSC_MAINNET as any,
    '0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F',
    18,
    'ALPACA',
    'Alpaca',
  ),
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET as any,
    '0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F',
    18,
    'ALPACA',
    'Alpaca',
  ),
};

export const CAKE: { [chainId: number]: Token } = {
  [ChainId.BSC_MAINNET]: new Token(
    ChainId.BSC_MAINNET as any,
    '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    18,
    'CAKE',
    'PancakeSwap Token',
  ),
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET as any,
    '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
    18,
    'CAKE',
    'PancakeSwap Token',
  ),
};
export const UST: { [chainId: number]: Token } = {
  [ChainId.SDN_MAINNET]: new Token(
    ChainId.SDN_MAINNET as any,
    '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
    18,
    'UST',
    'Wrapped UST Token',
  ),
};
export default tokens;
