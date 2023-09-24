import styled from "styled-components";

const MainPageContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	background-color: #f5f5f5;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const MainPageNFTsContainer = styled.div`
	width: 90%;
	// min-height: 70vh;
	border-radius: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
	background-color: #fff;
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
	width: 25%;
	aspect-ratio: 1/1.3;
	min-height: 300px;
	// border: 4px solid gray;
	margin-top: 20px;
	border-radius: 20px;
	// &:hover {
	// 	color: #373737;
	// 	box-shadow: rgb(38, 57, 77) 0px 10px 4px 0px;
	// }
	color: #373737;
		box-shadow: rgb(38, 57, 77) 0px 16px 2px 0px;
	@media (max-width: 992px) {
		width: 40%;
	}
	@media (max-width: 576px) {
		width: 80%;
	}
`;

export const EachNFTImage = styled.img`
	width: 100%;
	aspect-ratio: 1/1;
	object-fit: cover;
	border-top-right-radius: 20px;
	border-top-left-radius: 20px;
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
	padding: 20px;
`;

export { MainPageContainer, MainPageNFTsContainer };
