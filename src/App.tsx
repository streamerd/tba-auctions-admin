import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { TokenboundClient } from '@tokenbound/sdk'

import { Account } from './components'

import { useCallback, useEffect, useState } from 'react'
import { useEthers6Signer } from './hooks'

export function App() {
  const { isConnected, address } = useAccount()
  //make sure tbAccounts is an array of strings
  const [tbAccounts, setTbAccounts] = useState<`0x${string}`[]>([])
  const [tbNFTs, setTbNFTs] = useState<string[]>([])

  const signer = useEthers6Signer({ chainId: 11155111 })
  // or useSigner() from legacy wagmi versions: const { data: signer } = useSigner()

  console.log('SIGNER', signer)
  const tokenboundClient = new TokenboundClient({ signer, chainId: 11155111 })
  // Created this: 0x991ECf27c7Bd254a383A9FDA12FB2205A6fB64D2
  useEffect(() => {
    async function testTokenboundClass() {
      const account = await tokenboundClient.getAccount({
        tokenContract: '0x55e786058b30687E2a3b0bFAbE56FFe2202F00D3',
        tokenId: '3',
      })

      const preparedExecuteCall = await tokenboundClient.prepareExecuteCall({
        account: account,
        to: account,
        value: 0n,
        data: '',
      })

      const preparedAccount = await tokenboundClient.prepareCreateAccount({
        tokenContract: '0x55e786058b30687E2a3b0bFAbE56FFe2202F00D3',
        tokenId: '3',
      })

      console.log('getAccount', account)
      console.log('prepareExecuteCall', preparedExecuteCall)
      console.log('preparedAccount', preparedAccount)

      // if (signer) {
      //   signer?.sendTransaction(preparedAccount)
      //   signer?.sendTransaction(preparedExecuteCall)
      // }
    }

    testTokenboundClass()
  }, [tokenboundClient])

  useEffect(() => {
    console.log('new tokenbound account created..', tbAccounts)
  }, [tbAccounts])

  const createAccount = useCallback(async () => {
    if (!tokenboundClient || !address) return
    const createdAccount = await tokenboundClient.createAccount({
      tokenContract: '0x55e786058b30687E2a3b0bFAbE56FFe2202F00D3',
      tokenId: '3',
    })
    tbAccounts.push(createdAccount)
    alert(`new account: ${createdAccount}`)
  }, [tokenboundClient])

  const executeCall = useCallback(async () => {
    if (!tokenboundClient || !address) return
    const executedCall = await tokenboundClient.executeCall({
      account: address,
      to: address,
      value: 0n,
      data: '0x',
    })
  }, [tokenboundClient])

  // get th NFT that owns a Tokenbound account
  const getNFT = async () => {
    console.log('gonna get NFT that owns a Tokenbound account', tbAccounts[0] || 'no account')
    if (!tokenboundClient || !address) return
    const nft = await tokenboundClient.getNFT({
      // accountAddress: tbAccounts[0],
      accountAddress: '0xCD4A65Fa90f15bd2Bf68b0F578E211f3FB5Dba64'
    })
    const { tokenContract, tokenId, chainId } = nft

    console.log(`NFT ${tokenContract}/${tokenId} owns this account`)
  }

  return (
    <>
      <h1>Ethers 6 Signer + ConnectKit + Vite</h1>
      <ConnectKitButton />
      {isConnected && <Account />}
      {address && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            margin: '32px 0 0',
            maxWidth: '320px',
          }}
        >
          <button onClick={() => executeCall()}>EXECUTE CALL</button>
          <button onClick={() => createAccount()}>CREATE ACCOUNT</button>
          <button onClick={() => getNFT()}>GET NFT</button>
        </div>
      )}
    </>
  )
}
