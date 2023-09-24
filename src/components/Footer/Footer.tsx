import React from "react";
import styled from "styled-components";
import turtle from "../../assets/turtle.jpg";
const FooterMainContainer = styled.div`
	height: 30vh;
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
	height: 100%;
	@media (max-width: 850px) {
		width: 100%;
	}
`;

const FooterDevelopedByText = styled.p`
	font-size: 1.5rem;
	font-weight: 600;
	color: #000;
`;
const FooterDevelopedByLogo = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50%;
	object-fit: contain;
`;

const FooterAdditionalContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 49%;
	height: 100%;
	@media (max-width: 850px) {
		width: 100%;
	}
`;

const FooterAdditionalText = styled.p`
	font-size: 1.5rem;
	font-weight: 600;
	color: #000;
	@media (max-width: 850px) {
		font-size: 1.2rem;
	}
	text-decoration: none;
`;
const FooterAdditionalLogo = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50%;
	object-fit: contain;
`;

const MyLink = styled(FooterAdditionalText).attrs({ as: "a" })`
	text-decoration: none;
	color: #000;
	&:hover {
		color: #000;
	}
`;
const Footer = () => {
	return (
		<FooterMainContainer>
			<FooterDevelopedByContainer>
				<FooterDevelopedByText>Developed By</FooterDevelopedByText>
				<FooterDevelopedByLogo src={turtle} />
			</FooterDevelopedByContainer>
			<FooterAdditionalContainer>
				<MyLink href="https://tokenbound.org" target="_blank">
					<FooterAdditionalText>
						NFTS that listed here are developed with ERC6551 standard.
					</FooterAdditionalText>
				</MyLink>
			</FooterAdditionalContainer>
		</FooterMainContainer>
	);
};

export default Footer;
