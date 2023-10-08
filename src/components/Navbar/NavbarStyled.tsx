import styled from "styled-components";

export const NavbarContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100px;
	background-color: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 60px;
	z-index: 100;
	overflow: hidden;
`;

export const LogoTextContainer = styled.div`
	font-size: 1rem;
`;

export const LogoText = styled.span`
	font-family: "montserrat";
	font-weight: 600;
	color: #000000;
	

`;

export const NavbarLogo = styled.img`
	height: 62px;
	aspect-ratio: 1;
	object-fit: contain;
`;
