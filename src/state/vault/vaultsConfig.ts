import { ChainId } from '@my/sdk';
import { IFarmProject, IABIType, IVaultConfigItem } from 'state/vault/types';
const vaultsConfig: IVaultConfigItem[] = [
  // aAAA
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x9a45b203Af044ADACceD4D95ca3cDa020E082c8A',
      [ChainId.ASTR_TESTNET]: '0x9a45b203Af044ADACceD4D95ca3cDa020E082c8A',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink:
      'https://app.arthswap.org/#/add/0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678/0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'ARSW-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0x50497E7181eB9e8CcD70a9c44FB997742149482a',
        [ChainId.ASTR_TESTNET]: '0x50497E7181eB9e8CcD70a9c44FB997742149482a',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aArswAstr',
      name: 'avault Arthswap ARSW-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x50497E7181eB9e8CcD70a9c44FB997742149482a',
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
      lpAddressDecimals: 18,
    },
  },
  // aDotUsdc
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x898BF9C743a436C9C3F332aF445aAd69c15b10b8',
      [ChainId.ASTR_TESTNET]: '0x898BF9C743a436C9C3F332aF445aAd69c15b10b8',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'DOT-USDC LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0xF4119c3d9e65602bb34f2455644e45c98d29bB4b',
        [ChainId.ASTR_TESTNET]: '0xF4119c3d9e65602bb34f2455644e45c98d29bB4b',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aDotUsdc',
      name: 'avault Arthswap DOT-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0xF4119c3d9e65602bb34f2455644e45c98d29bB4b',
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
      lpAddressDecimals: 18,
    },
  },
  // aDotAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xE66560C1B5FAaE4e4f77ba40F61F21F4ADbb6924',
      [ChainId.ASTR_TESTNET]: '0xE66560C1B5FAaE4e4f77ba40F61F21F4ADbb6924',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'DOT-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0x40E938688a121370092A06745704c112C5ee5791',
        [ChainId.ASTR_TESTNET]: '0x40E938688a121370092A06745704c112C5ee5791',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aDotAstr',
      name: 'avault Arthswap DOT-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x40E938688a121370092A06745704c112C5ee5791',
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
      lpAddressDecimals: 18,
    },
  },
  // aMuuuAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x57D942953d416835F7B60bE2A8b49870cc7bcfe1',
      [ChainId.ASTR_TESTNET]: '0x57D942953d416835F7B60bE2A8b49870cc7bcfe1',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'MUUU-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0xb60a1827Db219729f837f2D0982B4CDb5a9bA4b1',
        [ChainId.ASTR_TESTNET]: '0xb60a1827Db219729f837f2D0982B4CDb5a9bA4b1',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aMuuuAstr',
      name: 'avault Arthswap MUUU-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xc5BcAC31cf55806646017395AD119aF2441Aee37',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xb60a1827Db219729f837f2D0982B4CDb5a9bA4b1',
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
      lpAddressDecimals: 18,
    },
  },

  // aKglAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xe7465336BaA2EfBe52e3e67a8B06a97630d76882',
      [ChainId.ASTR_TESTNET]: '0xe7465336BaA2EfBe52e3e67a8B06a97630d76882',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'KGL-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0xaa1fa6A811D82Fa4383b522b4aF4De3a5041063E',
        [ChainId.ASTR_TESTNET]: '0xaa1fa6A811D82Fa4383b522b4aF4De3a5041063E',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aKglAstr',
      name: 'avault Arthswap KGL-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x257f1a047948f73158DaDd03eB84b34498bCDc60',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xaa1fa6A811D82Fa4383b522b4aF4De3a5041063E',
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
      lpAddressDecimals: 18,
    },
  },
  // aLayAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xc59B9d3ECC93967e697accDbfe9EAB74bB3Fba22',
      [ChainId.ASTR_TESTNET]: '0xc59B9d3ECC93967e697accDbfe9EAB74bB3Fba22',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'LAY-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0x78D5C2Adeb11BE00033Cc4EDB2C2889CF945415E',
        [ChainId.ASTR_TESTNET]: '0x78D5C2Adeb11BE00033Cc4EDB2C2889CF945415E',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aLayAstr',
      name: 'avault Arthswap LAY-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xc4335B1b76fA6d52877b3046ECA68F6E708a27dd',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x78D5C2Adeb11BE00033Cc4EDB2C2889CF945415E',
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
      lpAddressDecimals: 18,
    },
  },
  // aOusdUsdc
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x40B18bc7AEE5A03515fCf241ad89d548899FB74f',
      [ChainId.ASTR_TESTNET]: '0x40B18bc7AEE5A03515fCf241ad89d548899FB74f',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'OUSD-USDC LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0xCf83a3d83c1265780d9374e8a7c838fE22BD3DC6',
        [ChainId.ASTR_TESTNET]: '0xCf83a3d83c1265780d9374e8a7c838fE22BD3DC6',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aOusdUsdc',
      name: 'avault Arthswap OUSD-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x29F6e49c6E3397C3A84F715885F9F233A441165C',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0xCf83a3d83c1265780d9374e8a7c838fE22BD3DC6',
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
      lpAddressDecimals: 18,
    },
  },
  // aBaiUsdc
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x5417F117E4A2283623B3b9A07Ec2B2f269d19A75',
      [ChainId.ASTR_TESTNET]: '0x5417F117E4A2283623B3b9A07Ec2B2f269d19A75',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'BAI-USDC LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0x7644Bf8086d40eD430D5096305830aA97Be77268',
        [ChainId.ASTR_TESTNET]: '0x7644Bf8086d40eD430D5096305830aA97Be77268',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aBaiUsdc',
      name: 'avault Arthswap BAI-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x733ebcC6DF85f8266349DEFD0980f8Ced9B45f35',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0x7644Bf8086d40eD430D5096305830aA97Be77268',
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
      lpAddressDecimals: 18,
    },
  },
  // aBaiAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xC730151a27A4cE6a09d51cFaB115233C2E73D471',
      [ChainId.ASTR_TESTNET]: '0xC730151a27A4cE6a09d51cFaB115233C2E73D471',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'BAI-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0x3d78a6CCA5c717C0e8702896892f3522D0b07010',
        [ChainId.ASTR_TESTNET]: '0x3d78a6CCA5c717C0e8702896892f3522D0b07010',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aBaiAstr',
      name: 'avault Arthswap BAI-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x733ebcC6DF85f8266349DEFD0980f8Ced9B45f35',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x3d78a6CCA5c717C0e8702896892f3522D0b07010',
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
      lpAddressDecimals: 18,
    },
  },
  // aNikaAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x13E01d7Da7b3F211C6972c331DA88c142dF571D8',
      [ChainId.ASTR_TESTNET]: '0x13E01d7Da7b3F211C6972c331DA88c142dF571D8',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'NIKA-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0xeF8B14e08c292cc552494ec428A75c8A3cd417B6',
        [ChainId.ASTR_TESTNET]: '0xeF8B14e08c292cc552494ec428A75c8A3cd417B6',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aNikaAstr',
      name: 'avault Arthswap NIKA-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x6Df98E5fBfF3041105cB986B9D44c572a43Fcd22',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xeF8B14e08c292cc552494ec428A75c8A3cd417B6',
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
      lpAddressDecimals: 18,
    },
  },
  // aOruAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x8f0fD0A3b767a67E992F33063817A2d472EFf74f',
      [ChainId.ASTR_TESTNET]: '0x8f0fD0A3b767a67E992F33063817A2d472EFf74f',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'ORU-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0xaC4b7043DA7152726D54B0fB1628a2FFF73f874e',
        [ChainId.ASTR_TESTNET]: '0xaC4b7043DA7152726D54B0fB1628a2FFF73f874e',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aOruAstr',
      name: 'avault Arthswap ORU-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xCdB32eEd99AA19D39e5d6EC45ba74dC4afeC549F',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xaC4b7043DA7152726D54B0fB1628a2FFF73f874e',
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
      lpAddressDecimals: 18,
    },
  },
  // aJpycAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x8d90E9C50Af206a2757e09B56160991Dd7548db9',
      [ChainId.ASTR_TESTNET]: '0x8d90E9C50Af206a2757e09B56160991Dd7548db9',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'JPYC-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0xF041a8e6e27341F5f865a22f01Fa37e065c32156',
        [ChainId.ASTR_TESTNET]: '0xF041a8e6e27341F5f865a22f01Fa37e065c32156',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aJpycAstr',
      name: 'avault Arthswap JPYC-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xF041a8e6e27341F5f865a22f01Fa37e065c32156',
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
      lpAddressDecimals: 18,
    },
  },
  // aSdnAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x5F612d4155b1CEdE2a2cda61146834280f706B78',
      [ChainId.ASTR_TESTNET]: '0x5F612d4155b1CEdE2a2cda61146834280f706B78',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'WSDN-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0xCcEFDDfF4808F3e1e0340e19e43f1E9Fd088b3F2',
        [ChainId.ASTR_TESTNET]: '0xCcEFDDfF4808F3e1e0340e19e43f1E9Fd088b3F2',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aSdnAstr',
      name: 'avault Arthswap wSDN-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x75364D4F779d0Bd0facD9a218c67f87dD9Aff3b4',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xCcEFDDfF4808F3e1e0340e19e43f1E9Fd088b3F2',
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
      lpAddressDecimals: 18,
    },
  },
  // aMaticAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x7D7b744CB50Eb228fe23Bbb29bc5918c507180B7',
      [ChainId.ASTR_TESTNET]: '0x7D7b744CB50Eb228fe23Bbb29bc5918c507180B7',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'MATIC-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0xCA59df939290421047876C917789afdB68D5D6f1',
        [ChainId.ASTR_TESTNET]: '0xCA59df939290421047876C917789afdB68D5D6f1',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aMaticAstr',
      name: 'avault Arthswap MATIC-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xdd90E5E87A2081Dcf0391920868eBc2FFB81a1aF',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xCA59df939290421047876C917789afdB68D5D6f1',
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
      lpAddressDecimals: 18,
    },
  },
  // aBnbAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x6B13DDF4d1E1F2E036619920746318fB79f9EA84',
      [ChainId.ASTR_TESTNET]: '0x6B13DDF4d1E1F2E036619920746318fB79f9EA84',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'BNB-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0x92127ec0EbEF8B30378D757bbE8dCE18210B848B',
        [ChainId.ASTR_TESTNET]: '0x92127ec0EbEF8B30378D757bbE8dCE18210B848B',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aBnbAstr',
      name: 'avault Arthswap BNB-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x92127ec0EbEF8B30378D757bbE8dCE18210B848B',
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
      lpAddressDecimals: 18,
    },
  },
  // aBtcAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x945bC42819F4F612d07DaBd1d57F10Aac494405f',
      [ChainId.ASTR_TESTNET]: '0x945bC42819F4F612d07DaBd1d57F10Aac494405f',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'WBTC-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0x61a49Ba86E168cD25cA795b07B0A93236BB25127',
        [ChainId.ASTR_TESTNET]: '0x61a49Ba86E168cD25cA795b07B0A93236BB25127',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aBtcAstr',
      name: 'avault Arthswap wBTC-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0xad543f18cFf85c77E140E3E5E3c3392f6Ba9d5CA',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x61a49Ba86E168cD25cA795b07B0A93236BB25127',
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
      lpAddressDecimals: 18,
    },
  },
  // aUsdtAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x8964FAE92bb4b79D408e9Bd3d48e7C9EcaA5f163',
      [ChainId.ASTR_TESTNET]: '0x8964FAE92bb4b79D408e9Bd3d48e7C9EcaA5f163',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'USDT-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0x806f746a7c4293092ac7aa604347BE123322dF1e',
        [ChainId.ASTR_TESTNET]: '0x806f746a7c4293092ac7aa604347BE123322dF1e',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aUsdtAstr',
      name: 'avault Arthswap USDT-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x806f746a7c4293092ac7aa604347BE123322dF1e',
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
      lpAddressDecimals: 18,
    },
  },
  // aUsdcAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xDaD1D300E9a6f4f36AeD40213EF473Fd019704E9',
      [ChainId.ASTR_TESTNET]: '0xDaD1D300E9a6f4f36AeD40213EF473Fd019704E9',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'USDC-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0xBB1290c1829007F440C771b37718FAbf309cd527',
        [ChainId.ASTR_TESTNET]: '0xBB1290c1829007F440C771b37718FAbf309cd527',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aUsdcAstr',
      name: 'avault Arthswap USDC-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0xBB1290c1829007F440C771b37718FAbf309cd527',
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
      lpAddressDecimals: 18,
    },
  },
  // aEthAstr
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xDaac872a9098aC5620C9D8eaF2DD50FBABc50Bb1',
      [ChainId.ASTR_TESTNET]: '0xDaac872a9098aC5620C9D8eaF2DD50FBABc50Bb1',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'WETH-WASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0x87988EbDE7E661F44eB3a586C5E0cEAB533a2d9C',
        [ChainId.ASTR_TESTNET]: '0x87988EbDE7E661F44eB3a586C5E0cEAB533a2d9C',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aEthAstr',
      name: 'avault Arthswap wETH-wASTR LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c',
      token1Address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      wantAddress: '0x87988EbDE7E661F44eB3a586C5E0cEAB533a2d9C',
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
      lpAddressDecimals: 18,
    },
  },
  // aDaiUsdc
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x81FbF3A32D600C65B9Df30404C2D372b6c9eE845',
      [ChainId.ASTR_TESTNET]: '0x81FbF3A32D600C65B9Df30404C2D372b6c9eE845',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'DAI-USDC LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0x996D73aC8F97cf15BD476b77CB92ce47cA0E71Fe',
        [ChainId.ASTR_TESTNET]: '0x996D73aC8F97cf15BD476b77CB92ce47cA0E71Fe',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aDaiUsdc',
      name: 'avault Arthswap DAI-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0x996D73aC8F97cf15BD476b77CB92ce47cA0E71Fe',
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
      lpAddressDecimals: 18,
    },
  },
  // aBusdUsdc
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x8552030E314cD15300f75AA93fA8133BB3340E6f',
      [ChainId.ASTR_TESTNET]: '0x8552030E314cD15300f75AA93fA8133BB3340E6f',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'BUSD-USDC LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0xeee106Aa8a0DE519E8Eb21C66A5c2275b46b3F4d',
        [ChainId.ASTR_TESTNET]: '0xeee106Aa8a0DE519E8Eb21C66A5c2275b46b3F4d',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aBusdUsdc',
      name: 'avault Arthswap BUSD-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0xeee106Aa8a0DE519E8Eb21C66A5c2275b46b3F4d',
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
      lpAddressDecimals: 18,
    },
  },
  // aUsdtUsdc
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x41F97524B5E73575F3848E1983181c0622d10e41',
      [ChainId.ASTR_TESTNET]: '0x41F97524B5E73575F3848E1983181c0622d10e41',
    },
    fromSource: IFarmProject.arthswap,
    abiType: IABIType.AVaultPCS,
    swapLink: 'https://app.arthswap.org/#/add/',
    online_at: 1656525599,
    lpDetail: {
      symbol: 'USDT-USDC LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0xD72A602C714ae36D990dc835eA5F96Ef87657D5e',
        [ChainId.ASTR_TESTNET]: '0xD72A602C714ae36D990dc835eA5F96Ef87657D5e',
      },
      decimals: 18,
    },
    vault: {
      fromSource: IFarmProject.arthswap,
      symbol: 'aUsdtUsdc',
      name: 'avault Arthswap USDT-USDC LP',
      masterChef: '0xc5b016c5597D298Fe9eD22922CE290A048aA5B75',
      token0Address: '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283',
      token1Address: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      wantAddress: '0xD72A602C714ae36D990dc835eA5F96Ef87657D5e',
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
      lpAddressDecimals: 18,
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
export default vaultsConfig;
