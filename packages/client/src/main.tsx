import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { App } from "./app";
import { setup, SetupResult } from "@/libs/dojo/setup";
import { DojoProvider } from "@/libs/dojo/DojoContext";
import { dojoConfig } from "../dojoConfig";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { StarknetConfig, voyager } from "@starknet-react/core";
import cartridgeConnector from "@/libs/cartridgeController";
import { sepolia } from "@starknet-react/chains";
import { RpcProvider } from "starknet";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("React root not found");
const root = ReactDOM.createRoot(rootElement as HTMLElement);

const Main = () => {
  const [setupResult, setSetupResult] = useState<SetupResult | null>(null);

  useEffect(() => {
    const init = async () => {
      const setupResult = await setup(dojoConfig);
      setSetupResult(setupResult);
    };
    init();
  }, []);

  if (!setupResult) {
    return (
      <div className="bg-[#262C38] flex flex-col h-screen items-center justify-center">
        <video src="/assets/loading.mp4" autoPlay loop muted playsInline className="w-1/4" />
        <p className="text-xl text-white">Setup World...</p>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <StarknetConfig
          chains={[sepolia]}
          provider={() => new RpcProvider({ nodeUrl: import.meta.env.VITE_PUBLIC_RPC_URL })}
          connectors={[cartridgeConnector]}
          explorer={voyager}
          autoConnect={true}
        >
          <DojoProvider value={setupResult}>
            <App />

            <Toaster richColors position="bottom-right" closeButton />
          </DojoProvider>
        </StarknetConfig>
      </ThemeProvider>
    </React.StrictMode>
  );
};

root.render(<Main />);
