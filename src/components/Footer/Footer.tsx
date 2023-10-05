import React from "react";
import styled from "styled-components";
import turtle from "../../assets/turtle.png";
import tokenbound from "../../assets/tokenbound-logo.svg";

// import { SlidingText } from "../../pages/NFTDetails/MainPage/MainPageStyled";
const FooterMainContainer = styled.div`
  height: 32vh;
  background-color: #fff;
  display: flex;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const FooterDevelopedByContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49%;
  gap: 1.6rem;
  height: 100%;
  @media (max-width: 850px) {
    width: 100%;
  }
  @media (max-width: 850px) {
    width: 100%;
    margin-top: 3rem;
    margin-left: 30%
  }

  
`;

const FooterDevelopedByText = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: #000;
  @media (max-width: 576px) {
    margin-top: 1rem;
    margin-left: 4rem;
		width: 100%;
	}
`;
const FooterDevelopedByLogo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: contain;
  @media (max-width: 576px) {
    margin-top: 1rem;
    margin-left: 0;
		width: 100%;
	}
`;

const TokenboundLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10%;
  object-fit: contain;
  @media (max-width: 576px) {
    
    margin-top: 1rem;
    margin-left: 0;
		width: 100%;
	}
  @media (max-width: 850px) {
    width: 100%;
    margin-left: 2rem;
  }
`;

const FooterAdditionalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49%;
  gap: 1.4rem;
  height: 100%;
  @media (max-width: 850px) {
    width: 100%;
    margin-top: 3rem;
  }
    @media (max-width: 1200px) {
    width: 100%;
    // margin-top: 3rem;
    // margin-left: 30%
  }
`;

const FooterAdditionalText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #000;
  @media (max-width: 850px) {
    font-size: 1.2rem;
  }
  text-decoration: none;
  font-style: italic;
  @media (max-width: 576px) {
    // margin-top: 1rem;
    margin-left: 2rem;
		width: 100%;
	}
  @media (max-width: 992px) {
    // margin-top: 2rem;
    margin-left: 2.4rem;
		width: 100%;
	}
  @media (max-width: 1200px) {
    // margin-top: 2rem;
    margin-left: 2.2rem;
		width: 100%;
	}
`;
const FooterAdditionalLogo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: contain;
`;

export const MyLink = styled(FooterAdditionalText).attrs({ as: "a" })`
  text-decoration: none;
  color: #000;
  &:hover {
    color: #000;
  }
`;

const OpenseaContainer = styled(FooterAdditionalContainer)`
 text-align: right;
`;

const Footer = () => {
  return (
    <>
      {/* <SlidingText>The auction kicks off on September 26th. </SlidingText> */}
      <FooterMainContainer>
		{/* <OpenseaContainer>
		<MyLink href="https://opensea.io/collection/dossiers" target="_blank">
            <FooterDevelopedByLogo src={opensea} />
          </MyLink>
		</OpenseaContainer> */}
        <FooterAdditionalContainer>
          <MyLink href="https://tokenbound.org" target="_blank">
            <FooterAdditionalText>
              Tokenbound wallets auctioned here,<br></br> developed with ERC6551
              standard.
            </FooterAdditionalText>
          </MyLink>
		{/* <MyLink href="https://opensea.io/collection/dossiers" target="_blank">
            <FooterDevelopedByLogo src={opensea} />
          </MyLink> */}
		  <MyLink href="https://tokenbound.org" target="_blank">
            <TokenboundLogo src={tokenbound} />
          </MyLink>
        </FooterAdditionalContainer>
        <FooterDevelopedByContainer>
          <FooterDevelopedByText>Built by</FooterDevelopedByText>
          <MyLink href="http://futuremodern.hns.to" target="_blank">
            <FooterDevelopedByLogo src={turtle} />
          </MyLink>
        </FooterDevelopedByContainer>
      </FooterMainContainer>
    </>
  );
};

export default Footer;
