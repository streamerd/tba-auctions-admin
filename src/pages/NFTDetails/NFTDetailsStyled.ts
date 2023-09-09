import styled from 'styled-components'

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
  width: 40%;
  height: 300px;
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

`