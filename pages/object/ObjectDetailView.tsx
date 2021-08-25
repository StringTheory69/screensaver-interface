import React, { useState, useEffect } from 'react'
import MediaViewer from '../../components/MediaViewer'
import AccountId from '../../components/AccountId'
import moment from 'moment'
import { useRouter } from 'next/router'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import handleMimeType from '../../utils/handleMimeType'
import NFT from '../../types'

interface IProps {
  nft: NFT
  hash?: string
}

const ObjectDetailView: React.VFC<IProps> = ({ nft }) => {
  const router = useRouter()
  const { tokenId, preview } = router.query
  const [copied, setCopied] = useState(false)

  console.log('TYPE', handleMimeType(nft.mimeType))

  return (
    <div className={'flex flex-col space-y-12'}>
      <div className={'flex flex-col space-y-8'}>
        <div className={'py-10'}>
          <MediaViewer
            fileUrl={nft.mediaUri}
            coverImageUrl={nft.name}
            type={handleMimeType(nft.mimeType)}
          />
        </div>

        <div className={'px-3'}>
          <div
            className={'absolute right-0 w-full border-t border-gray-800 '}
          />

          <div className={'text-4xl font-bold mt-3 mb-1 md:mt-12'}>
            {nft.name}
          </div>

          <div className={'text-md mt-4 mb-6'}>{nft.description}</div>

          <CopyToClipboard
            text={`https://sswo.link/${tokenId}`}
            onCopy={() => setCopied(true)}
          >
            <button className="my-4 w-20 mr-4 justify-center inline-flex items-center px-6 py-3 border border-red-300 shadow-sm text-red-300 font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Share
            </button>
          </CopyToClipboard>

          {copied && 'copied'}

          <div className={'w-full border-t border-gray-800'} />

          <div className={'text-lg py-1 mt-3 w-full flex space-x-2'}>
            <strong>Creator: </strong>{' '} <AccountId link={'created'} address={nft.creator.id} />
          </div>

          <div className={'text-sm py-1'}>
            <strong>Minted: </strong> {moment(nft.creationDate).format('MMMM Do YYYY, h:mm:ss a')}
          </div>

          <div className={'text-sm py-1 flex flex-col'}>
              <strong>MimeType: </strong> {nft.mimeType}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ObjectDetailView
