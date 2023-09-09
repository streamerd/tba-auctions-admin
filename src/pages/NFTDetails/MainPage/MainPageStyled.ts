import styled from "styled-components";

const MainPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;

`

const MainPageNFTsContainer = styled.div`

  width: 90%;
  min-height: 70vh;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  background-color: #fff;
  margin-top: 160px;
`

export const NFTDetailsContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  gap:40px;
  margin-top: 150px;
  overflow: hidden;
`

export const MainNFTImage = styled.img`
  width: 40%;
  height: 80vh;
  border-radius: 20px;
  object-fit: cover;
`

export const NFTSContainer = styled.div`
  width: 40%;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  background-color: #fff;
  min-height: 80vh;
`

export const EachNFTContainer = styled.div`
  width: 15%;
  aspect-ratio: 1/1.3;
  border: 1px solid gray; 
  margin-top: 20px;
  border-radius: 20px;
`

export const EachNFTImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`

export const EachNFTText = styled.p`
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;

`

export {MainPageContainer, MainPageNFTsContainer, 
}


