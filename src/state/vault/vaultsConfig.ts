import { ChainId } from '@my/sdk';
import { IFromSource, IABIType, IVaultConfigItem } from 'state/vault/types';
const vaultsConfig: IVaultConfigItem[] = [
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xde22Efc05eC3fCd6c8F4C4f8Fc63759A343783bF',
      [ChainId.ASTR_TESTNET]: '0xde22Efc05eC3fCd6c8F4C4f8Fc63759A343783bF',
    },
    fromSource: IFromSource.starlay,
    abiType: IABIType.AVaultForStarlay,
    swapLink: 'https://starlay.finance/app',
    vault: {
      fromSource: IFromSource.starlay,
      vaultSymbol: 'asUSDC',
      symbol: 'USDC',
      name: 'avault Starlay USDC',
      wantAddress: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98'.toLowerCase(),
      wantAddressDecimals: 6,
      earnedAddress: '0xc4335B1b76fA6d52877b3046ECA68F6E708a27dd',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 6,
    },
  },
  // active
  //aBaiUsdc
  {
    type: 1,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xDBd71969aC2583A9A20Af3FB81FE9C20547f30F3',
      [ChainId.ASTR_TESTNET]: '0xDBd71969aC2583A9A20Af3FB81FE9C20547f30F3',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'BAI-USDC LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x7644Bf8086d40eD430D5096305830aA97Be77268',
    // [ChainId.ASTR_TESTNET]: '0x7644Bf8086d40eD430D5096305830aA97Be77268',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'BAI-USDC LP',
      vaultSymbol: 'aBaiUsdc',
      name: 'avault Arthswap BAI-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x733ebcC6DF85f8266349DEFD0980f8Ced9B45f35',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0x7644Bf8086d40eD430D5096305830aA97Be77268'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 14,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x7644Bf8086d40eD430D5096305830aA97Be77268',
      tokenDecimals: 18,
      token: '0x733ebcC6DF85f8266349DEFD0980f8Ced9B45f35',
      quoteTokenDecimals: 6,
      quoteToken: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
    },
  },
  // aDaiUsdc
  {
    type: 1,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x9914Bff0437f914549c673B34808aF6020e2B453',
      [ChainId.ASTR_TESTNET]: '0x9914Bff0437f914549c673B34808aF6020e2B453',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'DAI-USDC LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x996D73aC8F97cf15BD476b77CB92ce47cA0E71Fe',
    // [ChainId.ASTR_TESTNET]: '0x996D73aC8F97cf15BD476b77CB92ce47cA0E71Fe',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'DAI-USDC LP',
      vaultSymbol: 'aDaiUsdc',
      name: 'avault Arthswap DAI-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0x996D73aC8F97cf15BD476b77CB92ce47cA0E71Fe'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 2,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x996D73aC8F97cf15BD476b77CB92ce47cA0E71Fe',
      tokenDecimals: 18,
      token: '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb',
      quoteTokenDecimals: 6,
      quoteToken: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
    },
  },
  // aBusdUsdc
  {
    type: 1,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x347e53263F8fb843EC605A1577eC7C8c0cAC7a58',
      [ChainId.ASTR_TESTNET]: '0x347e53263F8fb843EC605A1577eC7C8c0cAC7a58',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'BUSD-USDC LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0xeee106Aa8a0DE519E8Eb21C66A5c2275b46b3F4d',
    // [ChainId.ASTR_TESTNET]: '0xeee106Aa8a0DE519E8Eb21C66A5c2275b46b3F4d',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'BUSD-USDC LP',
      vaultSymbol: 'aBusdUsdc',
      name: 'avault Arthswap BUSD-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0xeee106Aa8a0DE519E8Eb21C66A5c2275b46b3F4d'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 1,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0xeee106Aa8a0DE519E8Eb21C66A5c2275b46b3F4d',
      tokenDecimals: 18,
      token: '0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E',
      quoteTokenDecimals: 6,
      quoteToken: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
    },
  },
  // aUsdtUsdc
  {
    type: 1,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x02Dac4898B2c2cA9D50fF8D6a7726166CF7bCFD0',
      [ChainId.ASTR_TESTNET]: '0x02Dac4898B2c2cA9D50fF8D6a7726166CF7bCFD0',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'USDT-USDC LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0xD72A602C714ae36D990dc835eA5F96Ef87657D5e',
    // [ChainId.ASTR_TESTNET]: '0xD72A602C714ae36D990dc835eA5F96Ef87657D5e',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'USDT-USDC LP',
      vaultSymbol: 'aUsdtUsdc',
      name: 'avault Arthswap USDT-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0xD72A602C714ae36D990dc835eA5F96Ef87657D5e'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 0,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0xD72A602C714ae36D990dc835eA5F96Ef87657D5e',
      tokenDecimals: 6,
      token: '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283',
      quoteTokenDecimals: 6,
      quoteToken: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
    },
  },
  // add
  // aArswUsdc
  {
    type: 2,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x58AD25Aa6B14c3Fd5921EA5BB731C3b2ADE0a099',
      [ChainId.ASTR_TESTNET]: '0x58AD25Aa6B14c3Fd5921EA5BB731C3b2ADE0a099',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'ARSW-USDC LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0xBD13Fd873d36f7D2A349b35E6854E3183ede18ab',
    // [ChainId.ASTR_TESTNET]: '0xBD13Fd873d36f7D2A349b35E6854E3183ede18ab',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'ARSW-USDC LP',
      vaultSymbol: 'aArswUsdc',
      name: 'avault Arthswap ARSW-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0xBD13Fd873d36f7D2A349b35E6854E3183ede18ab'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 22,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0xBD13Fd873d36f7D2A349b35E6854E3183ede18ab',
      tokenDecimals: 18,
      token: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      quoteTokenDecimals: 6,
      quoteToken: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
    },
  },
  // aArswUsdt
  {
    type: 2,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x46C3773Bd40bA20Bd77c3B246783CE941f3dB574',
      [ChainId.ASTR_TESTNET]: '0x46C3773Bd40bA20Bd77c3B246783CE941f3dB574',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'ARSW-USDT LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x7843ecd6F3234D72D0b7034DD9894b77c416c6EF',
    // [ChainId.ASTR_TESTNET]: '0x7843ecd6F3234D72D0b7034DD9894b77c416c6EF',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'ARSW-USDT LP',
      vaultSymbol: 'aArswUsdt',
      name: 'avault Arthswap ARSW-USDT LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      token1Address: '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283',
      wantAddress: '0x7843ecd6F3234D72D0b7034DD9894b77c416c6EF'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 23,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x7843ecd6F3234D72D0b7034DD9894b77c416c6EF',
      tokenDecimals: 18,
      token: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      quoteTokenDecimals: 6,
      quoteToken: '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283',
    },
  },
  // aArswBai
  {
    type: 2,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x383C69E3baE31eF1d7DC154CD351B0D734537626',
      [ChainId.ASTR_TESTNET]: '0x383C69E3baE31eF1d7DC154CD351B0D734537626',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'ARSW-BAI LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x8897D79334c2D517b83E7846da4B922E68fdA61B',
    // [ChainId.ASTR_TESTNET]: '0x8897D79334c2D517b83E7846da4B922E68fdA61B',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'ARSW-BAI LP',
      vaultSymbol: 'aArswBai',
      name: 'avault Arthswap ARSW-BAI LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      token1Address: '0x733ebcC6DF85f8266349DEFD0980f8Ced9B45f35',
      wantAddress: '0x8897D79334c2D517b83E7846da4B922E68fdA61B'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 24,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x8897D79334c2D517b83E7846da4B922E68fdA61B',
      tokenDecimals: 18,
      token: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      quoteTokenDecimals: 18,
      quoteToken: '0x733ebcC6DF85f8266349DEFD0980f8Ced9B45f35',
    },
  },
  // aAcaAstr
  {
    type: 2,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x360d125366C60Ba20Dc11ebb7120BdEaA0Cc007C',
      [ChainId.ASTR_TESTNET]: '0x360d125366C60Ba20Dc11ebb7120BdEaA0Cc007C',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'ACA-ASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x49d1DB92A8a1511A6eeb867221d801bC974A3073',
    // [ChainId.ASTR_TESTNET]: '0x49d1DB92A8a1511A6eeb867221d801bC974A3073',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'ACA-ASTR LP',
      vaultSymbol: 'aAcaAstr',
      name: 'avault Arthswap ACA-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xfFFfFFfF00000000000000010000000000000000',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x49d1DB92A8a1511A6eeb867221d801bC974A3073'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 25,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x49d1DB92A8a1511A6eeb867221d801bC974A3073',
      tokenDecimals: 12,
      token: '0xfFFfFFfF00000000000000010000000000000000',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },

  // normal
  // aUsdtAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x8964FAE92bb4b79D408e9Bd3d48e7C9EcaA5f163',
      [ChainId.ASTR_TESTNET]: '0x8964FAE92bb4b79D408e9Bd3d48e7C9EcaA5f163',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'USDT-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x806f746a7c4293092ac7aa604347BE123322dF1e',
    // [ChainId.ASTR_TESTNET]: '0x806f746a7c4293092ac7aa604347BE123322dF1e',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'USDT-WASTR LP',
      vaultSymbol: 'aUsdtAstr',
      name: 'avault Arthswap USDT-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x806f746a7c4293092ac7aa604347BE123322dF1e'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 5,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x806f746a7c4293092ac7aa604347BE123322dF1e',
      tokenDecimals: 6,
      token: '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
  // aUsdcAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xDaD1D300E9a6f4f36AeD40213EF473Fd019704E9',
      [ChainId.ASTR_TESTNET]: '0xDaD1D300E9a6f4f36AeD40213EF473Fd019704E9',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'USDC-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0xBB1290c1829007F440C771b37718FAbf309cd527',
    // [ChainId.ASTR_TESTNET]: '0xBB1290c1829007F440C771b37718FAbf309cd527',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'USDC-WASTR LP',
      vaultSymbol: 'aUsdcAstr',
      name: 'avault Arthswap USDC-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xBB1290c1829007F440C771b37718FAbf309cd527'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 4,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0xBB1290c1829007F440C771b37718FAbf309cd527',
      tokenDecimals: 6,
      token: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
  // aEthAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xDaac872a9098aC5620C9D8eaF2DD50FBABc50Bb1',
      [ChainId.ASTR_TESTNET]: '0xDaac872a9098aC5620C9D8eaF2DD50FBABc50Bb1',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'WETH-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x87988EbDE7E661F44eB3a586C5E0cEAB533a2d9C',
    // [ChainId.ASTR_TESTNET]: '0x87988EbDE7E661F44eB3a586C5E0cEAB533a2d9C',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'WETH-WASTR LP',
      vaultSymbol: 'aEthAstr',
      name: 'avault Arthswap wETH-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x87988EbDE7E661F44eB3a586C5E0cEAB533a2d9C'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 3,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x87988EbDE7E661F44eB3a586C5E0cEAB533a2d9C',
      tokenDecimals: 18,
      token: '0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
  // aDaiUsdc
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x81FbF3A32D600C65B9Df30404C2D372b6c9eE845',
      [ChainId.ASTR_TESTNET]: '0x81FbF3A32D600C65B9Df30404C2D372b6c9eE845',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'DAI-USDC LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x996D73aC8F97cf15BD476b77CB92ce47cA0E71Fe',
    // [ChainId.ASTR_TESTNET]: '0x996D73aC8F97cf15BD476b77CB92ce47cA0E71Fe',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'DAI-USDC LP',
      vaultSymbol: 'aDaiUsdc',
      name: 'avault Arthswap DAI-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0x996D73aC8F97cf15BD476b77CB92ce47cA0E71Fe'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 2,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x996D73aC8F97cf15BD476b77CB92ce47cA0E71Fe',
      tokenDecimals: 18,
      token: '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb',
      quoteTokenDecimals: 6,
      quoteToken: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
    },
  },
  // aBusdUsdc
  // {
  //   type: 0,
  //   contractAddress: {
  //     [ChainId.ASTR_MAINNET]: '0x8552030E314cD15300f75AA93fA8133BB3340E6f',
  //     [ChainId.ASTR_TESTNET]: '0x8552030E314cD15300f75AA93fA8133BB3340E6f',
  //   },
  //   fromSource: IFromSource.arthswap,
  //   abiType: IABIType.AVaultForArthswapFarm,
  //   swapLink: 'https://app.arthswap.org/#/add/',
  // lpDetail: {
  //   symbol: 'BUSD-USDC LP',
  //   address: {
  //     [ChainId.ASTR_MAINNET]: '0xeee106Aa8a0DE519E8Eb21C66A5c2275b46b3F4d',
  //     [ChainId.ASTR_TESTNET]: '0xeee106Aa8a0DE519E8Eb21C66A5c2275b46b3F4d',
  //   },
  //   decimals: 18,
  // },
  //   vault: {
  //     fromSource: IFromSource.arthswap,
  //     symbol: 'aBusdUsdc',
  //     name: 'avault Arthswap BUSD-USDC LP',
  //     masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
  //     token0Address: '0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E',
  //     token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
  //     wantAddress: '0xeee106Aa8a0DE519E8Eb21C66A5c2275b46b3F4d'.toLowerCase(),
  //     wantAddressDecimals: 18,
  //     earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
  //     AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
  //     decimals: 18,
  //   },
  //   farm: {
  //     pid: 1,
  //     lpSymbol: 'ARSW-LP',
  //     lpAddresses: '0xeee106Aa8a0DE519E8Eb21C66A5c2275b46b3F4d',
  //     tokenDecimals: 18,
  //     token: '0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E',
  //     quoteTokenDecimals: 6,
  //     quoteToken: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
  //   },
  // },
  // aUsdtUsdc
  // {
  //   type: 0,
  //   contractAddress: {
  //     [ChainId.ASTR_MAINNET]: '0x41F97524B5E73575F3848E1983181c0622d10e41',
  //     [ChainId.ASTR_TESTNET]: '0x41F97524B5E73575F3848E1983181c0622d10e41',
  //   },
  //   fromSource: IFromSource.arthswap,
  //   abiType: IABIType.AVaultForArthswapFarm,
  //   swapLink: 'https://app.arthswap.org/#/add/',
  // lpDetail: {
  //   symbol: 'USDT-USDC LP',
  //   address: {
  //     [ChainId.ASTR_MAINNET]: '0xD72A602C714ae36D990dc835eA5F96Ef87657D5e',
  //     [ChainId.ASTR_TESTNET]: '0xD72A602C714ae36D990dc835eA5F96Ef87657D5e',
  //   },
  //   decimals: 18,
  // },
  //   vault: {
  //     fromSource: IFromSource.arthswap,
  //     symbol: 'aUsdtUsdc',
  //     name: 'avault Arthswap USDT-USDC LP',
  //     masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
  //     token0Address: '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283',
  //     token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
  //     wantAddress: '0xD72A602C714ae36D990dc835eA5F96Ef87657D5e'.toLowerCase(),
  //     wantAddressDecimals: 18,
  //     earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
  //     AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
  //     decimals: 18,
  //   },
  //   farm: {
  //     pid: 0,
  //     lpSymbol: 'ARSW-LP',
  //     lpAddresses: '0xD72A602C714ae36D990dc835eA5F96Ef87657D5e',
  //     tokenDecimals: 6,
  //     token: '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283',
  //     quoteTokenDecimals: 6,
  //     quoteToken: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
  //   },
  // },
  // aAAA
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x9a45b203Af044ADACceD4D95ca3cDa020E082c8A',
      [ChainId.ASTR_TESTNET]: '0x9a45b203Af044ADACceD4D95ca3cDa020E082c8A',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink:
      'https://app.arthswap.org/#/add/0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678/0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    // lpDetail: {
    // symbol: 'ARSW-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x50497E7181eB9e8CcD70a9c44FB997742149482a',
    // [ChainId.ASTR_TESTNET]: '0x50497E7181eB9e8CcD70a9c44FB997742149482a',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'ARSW-WASTR LP',
      vaultSymbol: 'aArswAstr',
      name: 'avault Arthswap ARSW-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x50497E7181eB9e8CcD70a9c44FB997742149482a'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 21,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x50497E7181eB9e8CcD70a9c44FB997742149482a',
      tokenDecimals: 18,
      token: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
  // aDotUsdc
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x898BF9C743a436C9C3F332aF445aAd69c15b10b8',
      [ChainId.ASTR_TESTNET]: '0x898BF9C743a436C9C3F332aF445aAd69c15b10b8',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'DOT-USDC LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0xF4119c3d9e65602bb34f2455644e45c98d29bB4b',
    // [ChainId.ASTR_TESTNET]: '0xF4119c3d9e65602bb34f2455644e45c98d29bB4b',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'DOT-USDC LP',
      vaultSymbol: 'aDotUsdc',
      name: 'avault Arthswap DOT-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0xF4119c3d9e65602bb34f2455644e45c98d29bB4b'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 20,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0xF4119c3d9e65602bb34f2455644e45c98d29bB4b',
      tokenDecimals: 10,
      token: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
      quoteTokenDecimals: 6,
      quoteToken: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
    },
  },
  // aDotAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xE66560C1B5FAaE4e4f77ba40F61F21F4ADbb6924',
      [ChainId.ASTR_TESTNET]: '0xE66560C1B5FAaE4e4f77ba40F61F21F4ADbb6924',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'DOT-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x40E938688a121370092A06745704c112C5ee5791',
    // [ChainId.ASTR_TESTNET]: '0x40E938688a121370092A06745704c112C5ee5791',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'DOT-WASTR LP',
      vaultSymbol: 'aDotAstr',
      name: 'avault Arthswap DOT-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x40E938688a121370092A06745704c112C5ee5791'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 19,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x40E938688a121370092A06745704c112C5ee5791',
      tokenDecimals: 10,
      token: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
  // aMuuuAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x57D942953d416835F7B60bE2A8b49870cc7bcfe1',
      [ChainId.ASTR_TESTNET]: '0x57D942953d416835F7B60bE2A8b49870cc7bcfe1',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'MUUU-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0xb60a1827Db219729f837f2D0982B4CDb5a9bA4b1',
    // [ChainId.ASTR_TESTNET]: '0xb60a1827Db219729f837f2D0982B4CDb5a9bA4b1',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'MUUU-WASTR LP',
      vaultSymbol: 'aMuuuAstr',
      name: 'avault Arthswap MUUU-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xc5BcAC31cf55806646017395AD119aF2441Aee37',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xb60a1827Db219729f837f2D0982B4CDb5a9bA4b1'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 18,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0xb60a1827Db219729f837f2D0982B4CDb5a9bA4b1',
      tokenDecimals: 18,
      token: '0xc5BcAC31cf55806646017395AD119aF2441Aee37',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },

  // aKglAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xe7465336BaA2EfBe52e3e67a8B06a97630d76882',
      [ChainId.ASTR_TESTNET]: '0xe7465336BaA2EfBe52e3e67a8B06a97630d76882',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'KGL-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0xaa1fa6A811D82Fa4383b522b4aF4De3a5041063E',
    // [ChainId.ASTR_TESTNET]: '0xaa1fa6A811D82Fa4383b522b4aF4De3a5041063E',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'KGL-WASTR LP',
      vaultSymbol: 'aKglAstr',
      name: 'avault Arthswap KGL-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x257f1a047948f73158DaDd03eB84b34498bCDc60',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xaa1fa6A811D82Fa4383b522b4aF4De3a5041063E'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 17,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0xaa1fa6A811D82Fa4383b522b4aF4De3a5041063E',
      tokenDecimals: 18,
      token: '0x257f1a047948f73158DaDd03eB84b34498bCDc60',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
  // aLayAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xc59B9d3ECC93967e697accDbfe9EAB74bB3Fba22',
      [ChainId.ASTR_TESTNET]: '0xc59B9d3ECC93967e697accDbfe9EAB74bB3Fba22',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'LAY-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x78D5C2Adeb11BE00033Cc4EDB2C2889CF945415E',
    // [ChainId.ASTR_TESTNET]: '0x78D5C2Adeb11BE00033Cc4EDB2C2889CF945415E',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'LAY-WASTR LP',
      vaultSymbol: 'aLayAstr',
      name: 'avault Arthswap LAY-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xc4335B1b76fA6d52877b3046ECA68F6E708a27dd',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x78D5C2Adeb11BE00033Cc4EDB2C2889CF945415E'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 16,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x78D5C2Adeb11BE00033Cc4EDB2C2889CF945415E',
      tokenDecimals: 18,
      token: '0xc4335B1b76fA6d52877b3046ECA68F6E708a27dd',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
  // aOusdUsdc
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x40B18bc7AEE5A03515fCf241ad89d548899FB74f',
      [ChainId.ASTR_TESTNET]: '0x40B18bc7AEE5A03515fCf241ad89d548899FB74f',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'OUSD-USDC LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0xCf83a3d83c1265780d9374e8a7c838fE22BD3DC6',
    // [ChainId.ASTR_TESTNET]: '0xCf83a3d83c1265780d9374e8a7c838fE22BD3DC6',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'OUSD-USDC LP',
      vaultSymbol: 'aOusdUsdc',
      name: 'avault Arthswap OUSD-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x29F6e49c6E3397C3A84F715885F9F233A441165C',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0xCf83a3d83c1265780d9374e8a7c838fE22BD3DC6'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 15,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0xCf83a3d83c1265780d9374e8a7c838fE22BD3DC6',
      tokenDecimals: 18,
      token: '0x29F6e49c6E3397C3A84F715885F9F233A441165C',
      quoteTokenDecimals: 6,
      quoteToken: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
    },
  },
  // aBaiUsdc
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x5417F117E4A2283623B3b9A07Ec2B2f269d19A75',
      [ChainId.ASTR_TESTNET]: '0x5417F117E4A2283623B3b9A07Ec2B2f269d19A75',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'BAI-USDC LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x7644Bf8086d40eD430D5096305830aA97Be77268',
    // [ChainId.ASTR_TESTNET]: '0x7644Bf8086d40eD430D5096305830aA97Be77268',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'BAI-USDC LP',
      vaultSymbol: 'aBaiUsdc',
      name: 'avault Arthswap BAI-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x733ebcC6DF85f8266349DEFD0980f8Ced9B45f35',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0x7644Bf8086d40eD430D5096305830aA97Be77268'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 14,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x7644Bf8086d40eD430D5096305830aA97Be77268',
      tokenDecimals: 18,
      token: '0x733ebcC6DF85f8266349DEFD0980f8Ced9B45f35',
      quoteTokenDecimals: 6,
      quoteToken: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
    },
  },
  // aBaiAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xC730151a27A4cE6a09d51cFaB115233C2E73D471',
      [ChainId.ASTR_TESTNET]: '0xC730151a27A4cE6a09d51cFaB115233C2E73D471',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'BAI-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x3d78a6CCA5c717C0e8702896892f3522D0b07010',
    // [ChainId.ASTR_TESTNET]: '0x3d78a6CCA5c717C0e8702896892f3522D0b07010',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'BAI-WASTR LP',
      vaultSymbol: 'aBaiAstr',
      name: 'avault Arthswap BAI-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x733ebcC6DF85f8266349DEFD0980f8Ced9B45f35',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x3d78a6CCA5c717C0e8702896892f3522D0b07010'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 13,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x3d78a6CCA5c717C0e8702896892f3522D0b07010',
      tokenDecimals: 18,
      token: '0x733ebcC6DF85f8266349DEFD0980f8Ced9B45f35',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
  // aNikaAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x13E01d7Da7b3F211C6972c331DA88c142dF571D8',
      [ChainId.ASTR_TESTNET]: '0x13E01d7Da7b3F211C6972c331DA88c142dF571D8',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'NIKA-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0xeF8B14e08c292cc552494ec428A75c8A3cd417B6',
    // [ChainId.ASTR_TESTNET]: '0xeF8B14e08c292cc552494ec428A75c8A3cd417B6',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'NIKA-WASTR LP',
      vaultSymbol: 'aNikaAstr',
      name: 'avault Arthswap NIKA-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x6Df98E5fBfF3041105cB986B9D44c572a43Fcd22',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xeF8B14e08c292cc552494ec428A75c8A3cd417B6'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 12,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0xeF8B14e08c292cc552494ec428A75c8A3cd417B6',
      tokenDecimals: 18,
      token: '0x6Df98E5fBfF3041105cB986B9D44c572a43Fcd22',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
  // aOruAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x8f0fD0A3b767a67E992F33063817A2d472EFf74f',
      [ChainId.ASTR_TESTNET]: '0x8f0fD0A3b767a67E992F33063817A2d472EFf74f',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'ORU-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0xaC4b7043DA7152726D54B0fB1628a2FFF73f874e',
    // [ChainId.ASTR_TESTNET]: '0xaC4b7043DA7152726D54B0fB1628a2FFF73f874e',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'ORU-WASTR LP',
      vaultSymbol: 'aOruAstr',
      name: 'avault Arthswap ORU-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xCdB32eEd99AA19D39e5d6EC45ba74dC4afeC549F',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xaC4b7043DA7152726D54B0fB1628a2FFF73f874e'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 11,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0xaC4b7043DA7152726D54B0fB1628a2FFF73f874e',
      tokenDecimals: 18,
      token: '0xCdB32eEd99AA19D39e5d6EC45ba74dC4afeC549F',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
  // aJpycAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x8d90E9C50Af206a2757e09B56160991Dd7548db9',
      [ChainId.ASTR_TESTNET]: '0x8d90E9C50Af206a2757e09B56160991Dd7548db9',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'JPYC-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0xF041a8e6e27341F5f865a22f01Fa37e065c32156',
    // [ChainId.ASTR_TESTNET]: '0xF041a8e6e27341F5f865a22f01Fa37e065c32156',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'JPYC-WASTR LP',
      vaultSymbol: 'aJpycAstr',
      name: 'avault Arthswap JPYC-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xF041a8e6e27341F5f865a22f01Fa37e065c32156'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 10,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0xF041a8e6e27341F5f865a22f01Fa37e065c32156',
      tokenDecimals: 18,
      token: '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
  // aSdnAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x5F612d4155b1CEdE2a2cda61146834280f706B78',
      [ChainId.ASTR_TESTNET]: '0x5F612d4155b1CEdE2a2cda61146834280f706B78',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'WSDN-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0xCcEFDDfF4808F3e1e0340e19e43f1E9Fd088b3F2',
    // [ChainId.ASTR_TESTNET]: '0xCcEFDDfF4808F3e1e0340e19e43f1E9Fd088b3F2',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'WSDN-WASTR LP',
      vaultSymbol: 'aSdnAstr',
      name: 'avault Arthswap wSDN-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x75364D4F779d0Bd0facD9a218c67f87dD9Aff3b4',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xCcEFDDfF4808F3e1e0340e19e43f1E9Fd088b3F2'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 9,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0xCcEFDDfF4808F3e1e0340e19e43f1E9Fd088b3F2',
      tokenDecimals: 18,
      token: '0x75364D4F779d0Bd0facD9a218c67f87dD9Aff3b4',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
  // aMaticAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x7D7b744CB50Eb228fe23Bbb29bc5918c507180B7',
      [ChainId.ASTR_TESTNET]: '0x7D7b744CB50Eb228fe23Bbb29bc5918c507180B7',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'MATIC-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0xCA59df939290421047876C917789afdB68D5D6f1',
    // [ChainId.ASTR_TESTNET]: '0xCA59df939290421047876C917789afdB68D5D6f1',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'MATIC-WASTR LP',
      vaultSymbol: 'aMaticAstr',
      name: 'avault Arthswap MATIC-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xdd90E5E87A2081Dcf0391920868eBc2FFB81a1aF',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xCA59df939290421047876C917789afdB68D5D6f1'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 8,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0xCA59df939290421047876C917789afdB68D5D6f1',
      tokenDecimals: 18,
      token: '0xdd90E5E87A2081Dcf0391920868eBc2FFB81a1aF',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
  // aBnbAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x6B13DDF4d1E1F2E036619920746318fB79f9EA84',
      [ChainId.ASTR_TESTNET]: '0x6B13DDF4d1E1F2E036619920746318fB79f9EA84',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'BNB-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x92127ec0EbEF8B30378D757bbE8dCE18210B848B',
    // [ChainId.ASTR_TESTNET]: '0x92127ec0EbEF8B30378D757bbE8dCE18210B848B',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'BNB-WASTR LP',
      vaultSymbol: 'aBnbAstr',
      name: 'avault Arthswap BNB-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x92127ec0EbEF8B30378D757bbE8dCE18210B848B'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 7,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x92127ec0EbEF8B30378D757bbE8dCE18210B848B',
      tokenDecimals: 18,
      token: '0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
  // aBtcAstr
  {
    type: 0,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x945bC42819F4F612d07DaBd1d57F10Aac494405f',
      [ChainId.ASTR_TESTNET]: '0x945bC42819F4F612d07DaBd1d57F10Aac494405f',
    },
    fromSource: IFromSource.arthswap,
    abiType: IABIType.AVaultForArthswapFarm,
    swapLink: 'https://app.arthswap.org/#/add/',
    // lpDetail: {
    // symbol: 'WBTC-WASTR LP',
    // address: {
    // [ChainId.ASTR_MAINNET]: '0x61a49Ba86E168cD25cA795b07B0A93236BB25127',
    // [ChainId.ASTR_TESTNET]: '0x61a49Ba86E168cD25cA795b07B0A93236BB25127',
    // },
    // decimals: 18,
    // },
    vault: {
      fromSource: IFromSource.arthswap,
      symbol: 'WBTC-WASTR LP',
      vaultSymbol: 'aBtcAstr',
      name: 'avault Arthswap wBTC-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xad543f18cFf85c77E140E3E5E3c3392f6Ba9d5CA',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x61a49Ba86E168cD25cA795b07B0A93236BB25127'.toLowerCase(),
      wantAddressDecimals: 18,
      earnedAddress: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      AVAAddress: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
      decimals: 18,
    },
    farm: {
      pid: 6,
      lpSymbol: 'ARSW-LP',
      lpAddresses: '0x61a49Ba86E168cD25cA795b07B0A93236BB25127',
      tokenDecimals: 8,
      token: '0xad543f18cFf85c77E140E3E5E3c3392f6Ba9d5CA',
      quoteTokenDecimals: 18,
      quoteToken: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
  },
];
// aAAA deployed to: 0x9a45b203Af044ADACceD4D95ca3cDa020E082c8A
// aDotUsdc deployed to: 0x898BF9C743a436C9C3F332aF445aAd69c15b10b8
// aDotAstr deployed to: 0xE66560C1B5FAaE4e4f77ba40F61F21F4ADbb6924
// aMuuuAstr deployed to: 0x57D942953d416835F7B60bE2A8b49870cc7bcfe1
// aKglAstr deployed to: 0xe7465336BaA2EfBe52e3e67a8B06a97630d76882
// aLayAstr deployed to: 0xc59B9d3ECC93967e697accDbfe9EAB74bB3Fba22
// aOusdUsdc deployed to: 0x40B18bc7AEE5A03515fCf241ad89d548899FB74f
// aBaiUsdc deployed to: 0x5417F117E4A2283623B3b9A07Ec2B2f269d19A75
// aBaiAstr deployed to: 0xC730151a27A4cE6a09d51cFaB115233C2E73D471
// aNikaAstr deployed to: 0x13E01d7Da7b3F211C6972c331DA88c142dF571D8
// aOruAstr deployed to: 0x8f0fD0A3b767a67E992F33063817A2d472EFf74f
// aJpycAstr deployed to: 0x8d90E9C50Af206a2757e09B56160991Dd7548db9
// aSdnAstr deployed to: 0x5F612d4155b1CEdE2a2cda61146834280f706B78
// aMaticAstr deployed to: 0x7D7b744CB50Eb228fe23Bbb29bc5918c507180B7
// aBnbAstr deployed to: 0x6B13DDF4d1E1F2E036619920746318fB79f9EA84
// aBtcAstr deployed to: 0x945bC42819F4F612d07DaBd1d57F10Aac494405f
// aUsdtAstr deployed to: 0x8964FAE92bb4b79D408e9Bd3d48e7C9EcaA5f163
// aUsdcAstr deployed to: 0xDaD1D300E9a6f4f36AeD40213EF473Fd019704E9
// aEthAstr deployed to: 0xDaac872a9098aC5620C9D8eaF2DD50FBABc50Bb1
// aDaiUsdc deployed to: 0x81FbF3A32D600C65B9Df30404C2D372b6c9eE845
// aBusdUsdc deployed to: 0x8552030E314cD15300f75AA93fA8133BB3340E6f
// aUsdtUsdc deployed to: 0x41F97524B5E73575F3848E1983181c0622d10e41

// const ARSW-WASTR="0x50497E7181eB9e8CcD70a9c44FB997742149482a"
// const DOT-WASTR="0x40E938688a121370092A06745704c112C5ee5791"
// const DOT-USDC="0xF4119c3d9e65602bb34f2455644e45c98d29bB4b"
// const USDT-USDC="0xD72A602C714ae36D990dc835eA5F96Ef87657D5e"
// const BUSD-USDC="0xeee106Aa8a0DE519E8Eb21C66A5c2275b46b3F4d"
// const DAI-USDC="0x996D73aC8F97cf15BD476b77CB92ce47cA0E71Fe"
// const WETH-WASTR="0x87988EbDE7E661F44eB3a586C5E0cEAB533a2d9C"
// const BAI-USDC="0x7644Bf8086d40eD430D5096305830aA97Be77268"
// const LAY-WASTR="0x78D5C2Adeb11BE00033Cc4EDB2C2889CF945415E"
// const USDC-WASTR="0xBB1290c1829007F440C771b37718FAbf309cd527"
// const USDT-WASTR="0x806f746a7c4293092ac7aa604347BE123322dF1e"
// const WSDN-WASTR="0xCcEFDDfF4808F3e1e0340e19e43f1E9Fd088b3F2"
// const KGL-WASTR="0xaa1fa6A811D82Fa4383b522b4aF4De3a5041063E"
// const MUUU-WASTR="0xb60a1827Db219729f837f2D0982B4CDb5a9bA4b1"
// const BAI-WASTR="0x3d78a6CCA5c717C0e8702896892f3522D0b07010"
// const OUSD-USDC="0xCf83a3d83c1265780d9374e8a7c838fE22BD3DC6"
// const WBTC-WASTR="0x61a49Ba86E168cD25cA795b07B0A93236BB25127"
// const BNB-WASTR="0x92127ec0EbEF8B30378D757bbE8dCE18210B848B"
// const MATIC-WASTR="0xCA59df939290421047876C917789afdB68D5D6f1"
// const JPYC-WASTR="0xF041a8e6e27341F5f865a22f01Fa37e065c32156"
// const ORU-WASTR="0xaC4b7043DA7152726D54B0fB1628a2FFF73f874e"
// const NIKA-WASTR="0xeF8B14e08c292cc552494ec428A75c8A3cd417B6"

// ACTIVE
// aBaiUsdc deployed to: 0xDBd71969aC2583A9A20Af3FB81FE9C20547f30F3
// aDaiUsdc deployed to: 0x9914Bff0437f914549c673B34808aF6020e2B453
// aBusdUsdc deployed to: 0x347e53263F8fb843EC605A1577eC7C8c0cAC7a58
// aUsdtUsdc deployed to: 0x02Dac4898B2c2cA9D50fF8D6a7726166CF7bCFD0

// Add
// aArswUsdc deployed to: 0x58AD25Aa6B14c3Fd5921EA5BB731C3b2ADE0a099
// aArswUsdt deployed to: 0x46C3773Bd40bA20Bd77c3B246783CE941f3dB574
// aArswUsdt deployed to: 0x383C69E3baE31eF1d7DC154CD351B0D734537626
// aAcaAstr deployed to: 0x360d125366C60Ba20Dc11ebb7120BdEaA0Cc007C
export default vaultsConfig;
