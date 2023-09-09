// code a navbar component here and export

// Path: src/components/Navbar.tsx
// get wallet connection logic in here.
import { useEthers6Signer } from "../../hooks";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { NavbarContainer, NavbarLogo } from "./NavbarStyled";
import catLogo from "../../assets/cat-logo.png";

export function Navbar() {
	const signer = useEthers6Signer({ chainId: 11155111 });
	const { isConnected, address } = useAccount();
	console.log(isConnected, address);

	return (
		<NavbarContainer>
			<NavbarLogo src={catLogo} alt="logo" />

			<ConnectKitButton />
		</NavbarContainer>
	);
}
