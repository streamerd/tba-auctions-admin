import styled from "styled-components";

const MainPageContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	background-color: #f5f5f5;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const IntroContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: #fff;
	@media (max-width: 576px) {
		flex-direction: column;
	}
	@media (max-width: 992px) {
		flex-direction: column;
	}
`;
const IntroTextContainer = styled.div`
	width: 100%;
	// height: vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 100px;
	font-weight: 600;
	line-height: 2.4rem;
	@media (max-width: 576px) {
		width: 100%;
		font-size: 1.2rem;
		padding-top: 20px;
		padding-left: 40px;
		margin-top: 100px;
	}
	@media (max-width: 992px) {
		width: 90%;
		padding-left: 20px;
		padding-right: 20px;
		font-size: 1.2rem;
	}
`;

const IntroText = styled.p`
	font-family: "Montserrat", sans-serif;
	font-weight: 600;
	line-height: 2.4rem;
	font-size: 1.2rem;
	margin-top: 100px;
	@media (max-width: 300px) {
		width: 100%;
		font-size: 1rem;
		margin-top: 20vh;
		padding-left: 20px;
	}
	@media (max-width: 400px) {
		width: 100%;
		font-size: 1rem;
		margin-top: 20vh;
		padding-left: 20px;
	}
	@media (max-width: 576px) {
		width: 100%;
		font-size: 1rem;
		margin-top: 26vh;
		padding-left: 20px;
	}
	@media (max-width: 992px) {
		width: 100%;
		margin-top: 26vh;
		padding-left: 20px;
		padding-right: 20px;
		font-size: 1.2rem;
	}
	@media (max-width: 1200px) {
		width: 100%;
		margin-top: 36vh;
		padding-left: 20px;
		padding-right: 20px;
		font-size: 1.2rem;
	}
	// @media (max-width: 1400px) {
	// 	width: 100%;
	// 	// margin-top: 2vh;
	// 	padding-left: 20px;
	// 	padding-right: 20px;
	// 	font-size: 1.8rem;
	// }
	// @media (max-width: 1600px) {
	// 	width: 100%;
	// 	// margin-top: 2vh;
	// 	padding-left: 20px;
	// 	padding-right: 20px;
	// 	font-size: 1.8rem;
	// }
`;

const MainPageNFTsContainer = styled.div`
	width: 90%;
	// min-height: 70vh;
	border-radius: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
	background-color: black;
	margin-top: 160px;
	align-items: center;
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
	// color: #373737;
	// 	box-shadow: rgb(38, 57, 77) 0px 16px 2px 0px;
	@media (max-width: 992px) {
		width: 40%;
	}
	@media (max-width: 576px) {
		min-height: 200px;
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
