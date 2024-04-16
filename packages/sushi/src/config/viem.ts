import {
  http,
  type Address,
  Chain,
  type PublicClientConfig,
  Transport,
} from 'viem'
import {
  arbitrum,
  // arbitrumGoerli,
  arbitrumNova,
  arbitrumSepolia,
  // aurora,
  // auroraGoerli,
  avalanche,
  avalancheFuji,
  //  avalancheFuji,
  base,
  boba,
  // bronos,
  // bronosTestnet,
  bsc,
  bscTestnet,
  // bscTestnet,
  // canto,
  celo,
  // ronin,
  cronos,
  // celoAlfajores,
  // crossbell,
  // evmos,
  //  evmosTestnet,
  fantom,
  fantomTestnet,
  flare as _flare,
  // fantomTestnet,
  // filecoinTestnet,
  foundry,
  fuse as _fuse, // missing multicall
  gnosis,
  goerli,
  haqqMainnet as _haqq,
  // gnosisChiado,
  hardhat,
  harmonyOne,
  // iotex,
  // iotexTestnet,
  linea,
  localhost,
  mainnet,
  metis,
  // metisGoerli,
  moonbeam,
  moonriver,
  okc,
  optimism,
  //  optimismGoerli,
  polygon,
  polygonMumbai,
  polygonZkEvm,
  scroll,
  sepolia,
  // polygonMumbai,
  // sepolia,
  //  taraxa,
  // taraxaTestnet,
  telos,
  zkSync,
  // zkSyncTestnet,
} from 'viem/chains'
import { ChainId } from '../chain/index.js'

export {
  arbitrum,
  // arbitrumGoerli,
  arbitrumNova,
  // aurora,
  // auroraGoerli,
  avalanche,
  //  avalancheFuji,
  base,
  boba,
  // bronos,
  // bronosTestnet,
  bsc,
  // bscTestnet,
  // canto,
  celo,
  // celoAlfajores,
  // crossbell,
  // evmos,
  //  evmosTestnet,
  fantom,
  flare,
  // fantomTestnet,
  // filecoinTestnet,
  foundry,
  gnosis,
  goerli,
  // gnosisChiado,
  hardhat,
  // iotex,
  // iotexTestnet,
  linea,
  localhost,
  mainnet,
  metis,
  // metisGoerli,
  moonbeam,
  moonriver,
  okc,
  optimism,
  //  optimismGoerli,
  polygon,
  polygonZkEvm,
  // polygonMumbai,
  // sepolia,
  //  taraxa,
  // taraxaTestnet,
  zkSync,
  // zkSyncTestnet,
}

// Chains missing multicall
export const fuse = {
  ..._fuse,
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11' as Address,
      blockCreated: 16146628,
    },
  },
} as const

const haqq = {
  ..._haqq,
  contracts: {
    multicall3: {
      address: '0xfe2D04A5018AC1B366F599A13BF4e0C760b2aE6b',
      blockCreated: 6589598,
    },
  },
} as const

const flare = {
  ..._flare,
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3002461,
    },
  },
} as const

// Chains missing from viem entirely
export const kava = {
  id: ChainId.KAVA,
  name: 'Kava',
  network: 'kava',
  nativeCurrency: { name: 'Kava', symbol: 'KAVA', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://evm.kava.io', 'https://evm2.kava.io'],
    },
    public: {
      http: ['https://evm.kava.io', 'https://evm2.kava.io'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'Kavascan',
      url: 'https://explorer.kava.io/',
    },
    default: {
      name: 'Kavascan',
      url: 'https://explorer.kava.io/',
    },
  },
  contracts: {
    multicall3: {
      address: '0x1578f6d2D3168acF41b506AA666A521994F6BAB6' as Address,
      blockCreated: 1176602,
    },
  },
} as const

export const heco = {
  id: ChainId.HECO,
  name: 'Huobi ECO Chain',
  network: 'huobieco',
  nativeCurrency: { name: 'Huobi Token', symbol: 'HT', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://http-mainnet.hecochain.com'],
    },
    public: {
      http: ['https://http-mainnet.hecochain.com'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'HecoInfo',
      url: 'https://www.hecoinfo.com/',
    },
    default: {
      name: 'Heco Explorer',
      url: 'https://www.hecoinfo.com/',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11' as Address,
      blockCreated: 14413501,
    },
  },
} as const

export const palm = {
  id: ChainId.PALM,
  name: 'Palm',
  network: 'palm',
  nativeCurrency: { name: 'Palm', symbol: 'PALM', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://palm-mainnet.infura.io/v3/3a961d6501e54add9a41aa53f15de99b',
      ],
    },
    public: {
      http: [
        'https://palm-mainnet.infura.io/v3/3a961d6501e54add9a41aa53f15de99b',
      ],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'Palm Explorer',
      url: 'https://explorer.palm.io/',
    },
    default: {
      name: 'Palm Explorer',
      url: 'https://explorer.palm.io/',
    },
  },
  contracts: {
    multicall3: {
      address: '0x80C7DD17B01855a6D2347444a0FCC36136a314de' as Address,
      blockCreated: 8005532,
    },
  },
} as const

export const bobaAvax = {
  id: ChainId.BOBA_AVAX,
  name: 'Boba Avax',
  network: 'boba-avax',
  nativeCurrency: { name: 'Boba', symbol: 'BOBA', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://avax.boba.network'],
    },
    public: {
      http: ['https://avax.boba.network'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'Boba Avalanche Mainnet Explorer',
      url: 'https://blockexplorer.avax.boba.network/',
    },
    default: {
      name: 'Boba Avalanche Mainnet Explorer',
      url: 'https://blockexplorer.avax.boba.network/',
    },
  },
  contracts: {
    multicall3: {
      address: '0x2c46217Fae90D302d1Fb5467ADA504bC2A84f448' as Address,
      blockCreated: 3652,
    },
  },
} as const

export const bobaBnb = {
  id: ChainId.BOBA_BNB,
  name: 'Boba BNB',
  network: 'boba-bnb',
  nativeCurrency: { name: 'Boba', symbol: 'BOBA', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://bnb.boba.network'],
    },
    public: {
      http: ['https://bnb.boba.network'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'Boba BNB Mainnet Explorer',
      url: 'https://blockexplorer.bnb.boba.network/',
    },
    default: {
      name: 'Boba BNB Mainnet Explorer',
      url: 'https://blockexplorer.bnb.boba.network/',
    },
  },
  contracts: {
    multicall3: {
      address: '0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287' as Address,
      blockCreated: 18871,
    },
  },
} as const

export const bttc = {
  id: ChainId.BTTC,
  name: 'BitTorrent Chain',
  network: 'btt',
  nativeCurrency: { name: 'BitTorrent', symbol: 'BTT', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.bittorrentchain.io'],
    },
    public: {
      http: ['https://rpc.bittorrentchain.io'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'BitTorrent Chain Explorer',
      url: 'https://bttcscan.com/',
    },
    default: {
      name: 'BitTorrent Chain Explorer',
      url: 'https://bttcscan.com/',
    },
  },
  contracts: {
    multicall3: {
      address: '0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287' as Address,
      blockCreated: 13014184,
    },
  },
} as const

const thundercore = {
  id: ChainId.THUNDERCORE,
  name: 'ThunderCore',
  network: 'thundercore',
  nativeCurrency: { name: 'Thunder Token', symbol: 'TT', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://mainnet-rpc.thundercore.com',
        // 'https://mainnet-rpc.thundercore.io',
        // 'https://mainnet-rpc.thundertoken.net',
      ],
    },
    public: {
      http: [
        'https://mainnet-rpc.thundercore.com',
        'https://mainnet-rpc.thundercore.io',
        'https://mainnet-rpc.thundertoken.net',
      ],
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 100671921,
    },
  },
} as const

export const core = {
  id: ChainId.CORE,
  name: 'Core',
  network: 'core',
  nativeCurrency: { name: 'Core', symbol: 'CORE', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.coredao.org', 'https://rpc-core.icecreamswap.com'],
    },
    public: {
      http: ['https://rpc.coredao.org', 'https://rpc-core.icecreamswap.com'],
    },
  },
  contracts: {
    multicall3: {
      address: '0xC4b2e1718E850535A0f3e79F7fC522d966821688',
      blockCreated: 5087121,
    },
  },
} as const

export const filecoin = {
  id: ChainId.FILECOIN,
  name: 'Filecoin Mainnet',
  network: 'filecoin-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'filecoin',
    symbol: 'FIL',
  },
  rpcUrls: {
    default: { http: ['https://rpc.ankr.com/filecoin'] },
    public: { http: ['https://rpc.ankr.com/filecoin'] },
  },
  blockExplorers: {
    default: { name: 'Filfox', url: 'https://filfox.info/en' },
    filscan: { name: 'Filscan', url: 'https://filscan.io' },
    filscout: { name: 'Filscout', url: 'https://filscout.io/en' },
    glif: { name: 'Glif', url: 'https://explorer.glif.io' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 3328594,
    },
  },
} as const

export const zetachain = {
  id: ChainId.ZETACHAIN,
  name: 'ZetaChain',
  network: 'zetachain',
  nativeCurrency: {
    decimals: 18,
    name: 'Zeta',
    symbol: 'ZETA',
  },
  rpcUrls: {
    default: {
      http: [
        'https://zetachain-evm.blockpi.network/v1/rpc/public',
        'https://zetachain-mainnet-archive.allthatnode.com:8545',
        'https://zetachain.rpc.thirdweb.com',
        'https://jsonrpc.zetachain.nodestake.org',
      ],
    },
    public: {
      http: [
        'https://zetachain-evm.blockpi.network/v1/rpc/public',
        'https://zetachain-mainnet-archive.allthatnode.com:8545',
        'https://zetachain.rpc.thirdweb.com',
        'https://jsonrpc.zetachain.nodestake.org',
      ],
    },
  },
  blockExplorers: {
    default: { name: 'ZetaScan', url: 'https://explorer.zetachain.com/' },
    blockscout: {
      name: 'Blockscout',
      url: 'https://zetachain.blockscout.com/',
    },
  },
  contracts: {
    multicall3: {
      address: '0x039e87AB90205F9d87c5b40d4B28e2Be45dA4a20',
      blockCreated: 1565755,
    },
  },
} as const

export const blast = {
  id: ChainId.BLAST,
  name: 'Blast',
  network: 'blast',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [
        'https://rpc.blast.io',
        'https://rpc.ankr.com/blast',
        'https://blast.din.dev/rpc',
        'https://blastl2-mainnet.public.blastapi.io',
        'https://blast.blockpi.network/v1/rpc/public',
      ],
    },
    public: {
      http: [
        'https://rpc.blast.io',
        'https://rpc.ankr.com/blast',
        'https://blast.din.dev/rpc',
        'https://blastl2-mainnet.public.blastapi.io',
        'https://blast.blockpi.network/v1/rpc/public',
      ],
    },
  },
  blockExplorers: {
    default: { name: 'BlastScan', url: 'https://blastscan.io/' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 88189,
    },
  },
} as const

export const publicTransports = {
  [ChainId.ARBITRUM_NOVA]: http(arbitrumNova.rpcUrls.default.http[0]),
  [ChainId.ARBITRUM]: http(arbitrum.rpcUrls.default.http[0]),
  [ChainId.AVALANCHE]: http(avalanche.rpcUrls.default.http[0]),
  [ChainId.BOBA]: http(boba.rpcUrls.default.http[0]),
  [ChainId.BOBA_AVAX]: http(bobaAvax.rpcUrls.default.http[0]),
  [ChainId.BOBA_BNB]: http(bobaBnb.rpcUrls.default.http[0]),
  [ChainId.BSC]: http(bsc.rpcUrls.default.http[0]),
  [ChainId.BTTC]: http(bttc.rpcUrls.default.http[0]),
  [ChainId.CELO]: http(celo.rpcUrls.default.http[0]),
  [ChainId.ETHEREUM]: http(mainnet.rpcUrls.default.http[0]),
  [ChainId.FANTOM]: http(fantom.rpcUrls.default.http[0]),
  [ChainId.FUSE]: http(fuse.rpcUrls.default.http[0]),
  [ChainId.GNOSIS]: http(gnosis.rpcUrls.default.http[0]),
  [ChainId.HARMONY]: http(harmonyOne.rpcUrls.default.http[0]),
  [ChainId.KAVA]: http(kava.rpcUrls.default.http[0]),
  [ChainId.METIS]: http(metis.rpcUrls.default.http[0]),
  [ChainId.MOONBEAM]: http(moonbeam.rpcUrls.default.http[0]),
  [ChainId.MOONRIVER]: http(moonriver.rpcUrls.default.http[0]),
  [ChainId.OPTIMISM]: http(optimism.rpcUrls.default.http[0]),
  [ChainId.POLYGON]: http(polygon.rpcUrls.default.http[0]),
  [ChainId.POLYGON_ZKEVM]: http(polygonZkEvm.rpcUrls.default.http[0]),
  [ChainId.THUNDERCORE]: http(thundercore.rpcUrls.default.http[0]),
  [ChainId.HAQQ]: http(haqq.rpcUrls.default.http[0]),
  [ChainId.CORE]: http(core.rpcUrls.default.http[0]),
  [ChainId.TELOS]: http(telos.rpcUrls.default.http[0]),
  [ChainId.PALM]: http(palm.rpcUrls.default.http[0]),
  [ChainId.OKEX]: http(okc.rpcUrls.default.http[0]),
  [ChainId.HECO]: http(heco.rpcUrls.default.http[0]),
  [ChainId.ZKSYNC_ERA]: http(zkSync.rpcUrls.default.http[0]),
  [ChainId.LINEA]: http(linea.rpcUrls.default.http[0]),
  [ChainId.BASE]: http(base.rpcUrls.default.http[0]),
  [ChainId.SCROLL]: http(scroll.rpcUrls.default.http[0]),
  [ChainId.FILECOIN]: http(filecoin.rpcUrls.default.http[0]),
  [ChainId.ZETACHAIN]: http(zetachain.rpcUrls.default.http[0]),
  [ChainId.CRONOS]: http(cronos.rpcUrls.default.http[0]),
  [ChainId.BLAST]: http(blast.rpcUrls.default.http[0]),
  [ChainId.FLARE]: http(flare.rpcUrls.default.http[0]),
  /* Testnets */ // TODO: add testnet transports
  [ChainId.ARBITRUM_TESTNET]: http(arbitrumSepolia.rpcUrls.default.http[0]),
  [ChainId.AVALANCHE_TESTNET]: http(avalancheFuji.rpcUrls.default.http[0]),
  [ChainId.BSC_TESTNET]: http(bscTestnet.rpcUrls.default.http[0]),
  [ChainId.FANTOM_TESTNET]: http(fantomTestnet.rpcUrls.default.http[0]),
  [ChainId.POLYGON_TESTNET]: http(polygonMumbai.rpcUrls.default.http[0]),
  [ChainId.SEPOLIA]: http(sepolia.rpcUrls.default.http[0]),
} as const satisfies Record<ChainId, Transport>

export const publicChains = [
  arbitrumNova,
  arbitrum,
  avalanche,
  boba,
  bobaAvax,
  bobaBnb,
  bsc,
  bttc,
  blast,
  celo as unknown as Omit<typeof mainnet, 'id'> & { id: 42220 },
  cronos,
  mainnet,
  fantom,
  fuse,
  gnosis,
  harmonyOne,
  kava,
  metis,
  optimism as Chain,
  moonbeam,
  moonriver,
  polygon,
  polygonZkEvm,
  thundercore,
  haqq,
  core,
  telos,
  palm,
  okc,
  heco,
  zkSync as Chain,
  linea,
  base as Chain,
  scroll,
  filecoin,
  zetachain,
  flare,

  /* Testnets */
  arbitrumSepolia,
  avalancheFuji,
  bscTestnet,
  fantomTestnet,
  polygonMumbai,
  sepolia,
] as const satisfies Readonly<Chain[]>

export const publicClientConfig = {
  [ChainId.ARBITRUM_NOVA]: {
    chain: arbitrumNova,
    transport: publicTransports[ChainId.ARBITRUM_NOVA],
  },
  [ChainId.ARBITRUM]: {
    chain: arbitrum,
    transport: publicTransports[ChainId.ARBITRUM],
  },
  [ChainId.AVALANCHE]: {
    chain: avalanche,
    transport: publicTransports[ChainId.AVALANCHE],
  },
  [ChainId.BOBA]: {
    chain: boba,
    transport: publicTransports[ChainId.BOBA],
  },
  [ChainId.BOBA_AVAX]: {
    chain: bobaAvax,
    transport: publicTransports[ChainId.BOBA_AVAX],
  },
  [ChainId.BOBA_BNB]: {
    chain: bobaBnb,
    transport: publicTransports[ChainId.BOBA_BNB],
  },
  [ChainId.BSC]: {
    chain: bsc,
    transport: publicTransports[ChainId.BSC],
  },
  [ChainId.BTTC]: {
    chain: bttc,
    transport: publicTransports[ChainId.BTTC],
  },
  [ChainId.CELO]: {
    chain: celo as unknown as typeof mainnet & { id: 42220 },
    transport: publicTransports[ChainId.CELO],
  },
  [ChainId.ETHEREUM]: {
    chain: mainnet,
    transport: publicTransports[ChainId.ETHEREUM],
  },
  [ChainId.FANTOM]: {
    chain: fantom,
    transport: publicTransports[ChainId.FANTOM],
  },
  [ChainId.FUSE]: {
    chain: fuse,
    transport: publicTransports[ChainId.FUSE],
  },
  [ChainId.GNOSIS]: {
    chain: gnosis,
    transport: publicTransports[ChainId.GNOSIS],
  },
  [ChainId.HARMONY]: {
    chain: harmonyOne,
    transport: publicTransports[ChainId.HARMONY],
  },
  [ChainId.KAVA]: {
    chain: kava,
    transport: publicTransports[ChainId.KAVA],
  },
  [ChainId.METIS]: {
    chain: metis,
    transport: publicTransports[ChainId.METIS],
  },
  [ChainId.MOONBEAM]: {
    chain: moonbeam,
    transport: publicTransports[ChainId.MOONBEAM],
  },
  [ChainId.MOONRIVER]: {
    chain: moonriver,
    transport: publicTransports[ChainId.MOONRIVER],
  },
  [ChainId.OPTIMISM]: {
    chain: optimism as Chain,
    transport: publicTransports[ChainId.OPTIMISM],
  },
  [ChainId.POLYGON]: {
    chain: polygon,
    transport: publicTransports[ChainId.POLYGON],
  },
  [ChainId.POLYGON_ZKEVM]: {
    chain: polygonZkEvm,
    transport: publicTransports[ChainId.POLYGON_ZKEVM],
  },
  [ChainId.THUNDERCORE]: {
    chain: thundercore,
    transport: publicTransports[ChainId.THUNDERCORE],
  },
  [ChainId.HAQQ]: {
    chain: haqq,
    transport: publicTransports[ChainId.HAQQ],
  },
  [ChainId.CORE]: {
    chain: core,
    transport: publicTransports[ChainId.CORE],
  },
  [ChainId.TELOS]: {
    chain: telos,
    transport: publicTransports[ChainId.TELOS],
  },
  [ChainId.PALM]: {
    chain: palm,
    transport: publicTransports[ChainId.PALM],
  },
  [ChainId.OKEX]: {
    chain: okc,
    transport: publicTransports[ChainId.OKEX],
  },
  [ChainId.HECO]: {
    chain: heco,
    transport: publicTransports[ChainId.HECO],
  },
  [ChainId.ZKSYNC_ERA]: {
    chain: zkSync as Chain,
    transport: publicTransports[ChainId.ZKSYNC_ERA],
  },
  [ChainId.LINEA]: {
    chain: linea,
    transport: publicTransports[ChainId.LINEA],
  },
  [ChainId.BASE]: {
    chain: base as Chain,
    transport: publicTransports[ChainId.BASE],
  },
  [ChainId.SCROLL]: {
    chain: scroll,
    transport: publicTransports[ChainId.SCROLL],
  },
  [ChainId.FILECOIN]: {
    chain: filecoin,
    transport: publicTransports[ChainId.FILECOIN],
  },
  [ChainId.ZETACHAIN]: {
    chain: zetachain,
    transport: publicTransports[ChainId.ZETACHAIN],
  },
  [ChainId.CRONOS]: {
    chain: cronos,
    transport: publicTransports[ChainId.CRONOS],
  },
  [ChainId.BLAST]: {
    chain: blast,
    transport: publicTransports[ChainId.BLAST],
  },
  [ChainId.FLARE]: {
    chain: flare,
    transport: publicTransports[ChainId.FLARE],
  },
  /* Testnets */
  [ChainId.ARBITRUM_TESTNET]: {
    chain: arbitrumSepolia,
    transport: publicTransports[ChainId.ARBITRUM_TESTNET],
  },
  [ChainId.AVALANCHE_TESTNET]: {
    chain: avalancheFuji,
    transport: publicTransports[ChainId.AVALANCHE_TESTNET],
  },
  [ChainId.BSC_TESTNET]: {
    chain: bscTestnet,
    transport: publicTransports[ChainId.BSC_TESTNET],
  },
  [ChainId.FANTOM_TESTNET]: {
    chain: fantomTestnet,
    transport: publicTransports[ChainId.FANTOM_TESTNET],
  },
  [ChainId.POLYGON_TESTNET]: {
    chain: polygonMumbai,
    transport: publicTransports[ChainId.POLYGON_TESTNET],
  },
  [ChainId.SEPOLIA]: {
    chain: sepolia,
    transport: publicTransports[ChainId.SEPOLIA],
  },
} as const satisfies Record<
  ChainId,
  PublicClientConfig & { chain: (typeof publicChains)[number] }
>
