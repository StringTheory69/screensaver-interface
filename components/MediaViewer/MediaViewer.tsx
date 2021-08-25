import React from 'react'
import { AudioPlayer, ImageViewer, PdfViewer, VideoPlayer } from '.'
import classNames from 'classnames'

interface IProps {
  type: string
  fileUrl: string
  coverImageUrl?: string
  crop?: boolean 
}

const MediaViewer: React.VFC<IProps> = ({ type, fileUrl, coverImageUrl, crop }) => {
  return (
    <div className={'min-h-96'}>
      {type === 'image' && <img src={fileUrl} className={classNames(crop && 'h-96 object-cover', 'w-full')}/>}

      {type === 'video' && <VideoPlayer fileUrl={fileUrl} />}

      {type === 'audio' && (
        <AudioPlayer fileUrl={fileUrl} coverImageUrl={coverImageUrl} />
      )}

      {type === 'model' && (
        <div className={'h-96'}>
          <model-viewer
            autoplay
            style={{ width: '100%', height: '100%' }}
            id={fileUrl}
            alt={fileUrl}
            src={fileUrl}
            auto-rotate
            camera-controls
            ar
            ar-modes="webxr scene-viewer quick-look"
            ar-scale="auto"
            // ios-src={}
          />
        </div>
      )}

      <div className={'absolute top-2 right-2 flex pt-100%'}></div>
    </div>
  )
}

export default MediaViewer
