/// <reference types="react-scripts" />
import { MetaMaskInpageProvider } from "@metamask/providers";

// eslint-disable-next-line
declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}