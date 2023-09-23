import { ConnectKitButton } from "connectkit";
import {
  NavbarContainer,
  NavbarLogo,
} from "./NavbarStyled";
import catLogo from "../../assets/cat-logo.png";
import { Link } from "react-router-dom";

export function Navbar() {

  return (
    <NavbarContainer>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <NavbarLogo src={catLogo} alt="logo" />
      </Link>

      <ConnectKitButton />
    </NavbarContainer>
  );
}
