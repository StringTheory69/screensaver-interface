import React, { useEffect, useState } from 'react'
import { Layout } from '../../components'
import { useRouter } from 'next/router'
import ObjectDetailView from './ObjectDetailView'
import axios from 'axios'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../../constants/gallery'
import { getNetworkLibrary } from '../../connectors'
import BiddingDetailView from './BiddingDetailView'
import BidHistory from './BidHistory'
import Head from 'next/head'
import Error from '../../components/Error'
import NFT from '../../types'
import reformatContractMetadataToSubgraph from '../../utils/reformatContractMetadataToSubgraph'

const ObjectPage: React.VFC = () => {
  const router = useRouter()
  const { tokenId, preview } = router.query
  const [uri, setUri] = useState<undefined | string>()
  const [uriError, setUriError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<NFT | undefined>()

  async function getMetadata() {
    var meta = await axios.get(uri)
    const formattedMetadata = reformatContractMetadataToSubgraph(meta)
    setMetadata(formattedMetadata)
  }

  async function getUri() {
    try {
      setUriError(null)
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ID,
        GALLERY_ABI,
        getNetworkLibrary(),
      )
      var tokenUri = await contract.tokenURI(tokenId)
      setUri(tokenUri)
    } catch (error) {
      console.log('error', error)
      setUriError(error)
    }
  }

  useEffect(() => {
    if (!uri) return
    console.log('URI', uri)
    getMetadata()
  }, [uri])

  useEffect(() => {
    if (!tokenId) return
    if (!!preview) {
      // add footer
      setUri('https://screensaver.mypinata.cloud/ipfs/' + preview.toString())
    } else {
      getUri()
    }
  }, [tokenId, preview])

  if (uriError) {
    return (
      <Layout>
        <Error message="There was an error loading this object." />
      </Layout>
    )
  }

  if (!metadata)
    return (
      <Layout>
        <div className={'md:mt-12 pb-8 max-w-xl mx-auto'}>Loading...</div>
      </Layout>
    )

  return (
      <Layout>

        {/* Head with Twitter card support */}
        <Head>
          <title>Screensaver.world | Object #{tokenId}</title>
          <meta name="title" content={metadata.name} />
          <meta name="description" content={metadata.description} />
          <meta property="og:title" content={metadata.name} />
          <meta property="og:image" content={!!metadata.mediaUri && metadata.mediaUri.replace('https://ipfs.io', 'https://screensaver.mypinata.cloud')}/>
          <meta property="og:description" content={metadata.description} />
          <meta
            property="og:url"
            content={`https://www.screensaver.world/object/${tokenId}`}
          />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <div className={'mt-12 pb-8 w-11/12 mx-auto'}>
          <div className={'md:p-3 max-w-xl mx-auto min-h-screen'}>

            {/* Item media and metadata */}
            <ObjectDetailView nft={metadata} hash={preview?.toString()} />

            {/* TODO: Find better way to handle previewing minting */}

            {/* Only show when not in preview mode and when tokenId exists */}
            {(!preview && !!tokenId) && 
              <>
              
                {/* Bidding Logic and Views */}
                <BiddingDetailView tokenId={tokenId} />
                
                {/* Bidding History */}
                <BidHistory tokenId={tokenId} />

              </>
            }

          </div>
        </div>
      </Layout>
  )
}

export default ObjectPage
