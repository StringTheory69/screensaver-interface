type NFT = {
    name: string
    description?: string
    broken?: boolean
    creator: {
      id: string
    }
    creationDate?: Date
    metadataUri?: string
    mediaUri: string
    coverImageUrl?: string
    mimeType: string
    size?: string
    tags?: string[]
    tokenId: number
}

export type Bid = {
  bidder: {
    id: string
  }
  item: {
    creator: {
      id: string
    }
    name: string
    tokenId: string
  }
  timestamp: number
  amount: number
  accepted: boolean
}

export default NFT
