import { ConnectKitProvider } from "connectkit";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import { HashRouter } from "react-router-dom";

import { App } from "./App";
import { wagmiConfig } from "./wagmi";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<HashRouter>
		<WagmiConfig config={wagmiConfig}>
			<ConnectKitProvider>
				<App />
			</ConnectKitProvider>
		</WagmiConfig>
	</HashRouter>
);
