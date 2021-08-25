import NFT from '../types'

const reformatContractMetadataToSubgraph = (metadata) => {
  var mediaUri
  var coverImageUrl

  if (!metadata.data.animation_url) {
    mediaUri = metadata.data.image
  } else {
    mediaUri = metadata.data.animation_url
    coverImageUrl = metadata.data.image
  }

  const formattedMetadata: NFT = {
    name: metadata.data.name,
    creator: { id: metadata.data.creator },
    tokenId: metadata.data.id,
    mediaUri,
    coverImageUrl,
    mimeType: metadata.data.media.mimeType
  }

  return formattedMetadata
}

export default reformatContractMetadataToSubgraph
