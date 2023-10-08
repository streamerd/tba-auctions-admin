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
`;

const FooterDevelopedByText = styled.p`
	font-size: 1.4rem;
	font-weight: 600;
	color: #000;
`;
const FooterDevelopedByLogo = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50%;
	object-fit: contain;
`;

const TokenboundLogo = styled.img`
	width: 80px;
	height: 80px;
	border-radius: 10%;
	object-fit: contain;
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
		padding: 0 25px 0 25px;
	}
`;

const FooterAdditionalText = styled.p`
	font-size: 1.2rem;
	font-weight: 600;
	color: #000;

	text-decoration: none;
	font-style: italic;
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
							Tokenbound wallets auctioned here,<br></br> developed with ERC6551 standard.
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
