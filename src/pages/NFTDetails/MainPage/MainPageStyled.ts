import styled from "styled-components";

const MainPageContainer = styled.div`
	min-height: 100vh;
	background-color: #f5f5f5;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const IntroContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: #232323;

	@media (max-width: 856px) {
		flex-direction: column;
	}
`;
const IntroTextContainer = styled.div`
	width: 60%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	@media (max-width: 850px) {
		width: 90%;

		margin: 50px 5% 0 5%;
	}
`;

const IntroText = styled.p`
	font-family: "Montserrat", sans-serif;
	font-weight: 500;
	line-height: 2.4rem;
	font-size: 1.2rem;
	margin-top: 100px;
	margin: 0 15% 0 15%;
	color: white;
	@media (max-width: 1000px) {
		margin-top: 120px;
		padding-left: 20px;
		font-size: 1.2rem;
		margin: 120px 5% 0 5%;
	}
`;

const MainPageNFTsContainer = styled.div`
	width: 90%;
	border-radius: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
	background-color: black;
	margin-top: 160px;
`;

export const NFTDetailsContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	gap: 40px;
	margin-top: 150px;
	overflow: hidden;
`;

export const MainNFTImage = styled.img`
	width: 40%;
	height: 80vh;
	border-radius: 20px;
	object-fit: cover;
`;

export const NFTSContainer = styled.div`
	width: 40%;
	border-radius: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
	background-color: #fff;
	min-height: 80vh;
`;

export const EachNFTContainer = styled.div`
	// background-color: #fff;
	width: 25%;
	aspect-ratio: 1/1.25;
	min-height: 300px;
	// border: 4px solid gray;
	margin-top: 20px;
	margin-bottom: 20px;
	border-radius: 20px;
	&:hover {
		color: #373737;
		box-shadow: rgb(38, 57, 77) 0px 10px 4px 0px;
	}
	@media (max-width: 992px) {
		width: 40%;
	}
	@media (max-width: 576px) {
		width: 95%;
	}
`;

export const EachNFTImage = styled.img`
	width: 100%;
	aspect-ratio: 1/1;
	object-fit: cover;
	border-top-right-radius: 20px;
	border-top-left-radius: 20px;
	@media (max-width: 576px) {
		margin-top: 20px;
	}
`;

export const EachNFTText = styled.p`
	font-size: 15px;
	font-weight: 600;
	text-decoration: none;
	font-family: "Roboto", sans-serif;
	color: white;
	text-align: center;
	background-color: black;
	margin-top: 8px;
	padding: 6px;
	@media (max-width: 576px) {
	}
`;

export const SlidingText = styled.div`
	margin-left: 10%;
	margin-right: 10%;
	max-width: 80%;
	// padding-top: 20px;
	white-space: nowrap;
	overflow: hidden;
	position: relative;
	font-size: 1.8rem;
	font-familt: "montserrat", sans-serif;
	animation: slide 10s linear infinite;

	@keyframes slide {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(-100%);
		}
	}

	@media (max-width: 576px) {
		display: none;
	}
`;

export { MainPageContainer, MainPageNFTsContainer, IntroTextContainer, IntroText, IntroContainer };
