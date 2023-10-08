import { ConnectKitButton } from "connectkit";
import { LogoText, LogoTextContainer, NavbarContainer, NavbarLogo } from "./NavbarStyled";
import catLogo from "../../assets/cat-logo.png";
import { Link } from "react-router-dom";
import { SlidingText } from "../../pages/NFTDetails/MainPage/MainPageStyled";

export function Navbar() {
  return (
    <NavbarContainer>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <NavbarLogo src={catLogo} alt="logo" />
        <LogoTextContainer>
          <LogoText>DOSSIERS</LogoText>
        </LogoTextContainer>
      </Link>
      <SlidingText>the auction kicks off on October 10 </SlidingText>

      <ConnectKitButton />
    </NavbarContainer>
  );
}
