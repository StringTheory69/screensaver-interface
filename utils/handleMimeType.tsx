const handleMimeType = (mimeType: string) : string => {

    if (mimeType.includes('image')) {
      return 'image'
    }

    if (mimeType.includes('audio')) {
      return 'audio'
    }

    if (mimeType.includes('video')) {
      return 'video'
    }

    if (mimeType.includes('application/octet-stream' || 'model')) {
      return 'model'
    }

  }

export default handleMimeType;