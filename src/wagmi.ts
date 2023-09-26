import { getDefaultConfig } from "connectkit";
import { createConfig } from "wagmi";
import { sepolia } from 'wagmi/chains'

const chains = [sepolia]

export const wagmiConfig = createConfig(
  getDefaultConfig({
    walletConnectProjectId: "",
    // alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    chains,
    appName: 'Vite Tokenbound SDK Example',
    appDescription: 'Tokenbound SDK Example',
    appUrl: 'https://tokenbound.org',
  })
)