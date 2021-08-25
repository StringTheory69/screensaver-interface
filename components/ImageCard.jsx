import MediaViewer from './MediaViewer'
import handleMimeType from '../utils/handleMimeType'

const ImageCard = ({ nft, footer, children }) => {

  return (
    <div
      className={
        'w-full transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-white border-solid border border-gray-800 max-w-sm text-white rounded-2xl '
      }
    >
      <div className={'flex flex-col mx-auto'}>
        <div
          className={'flex flex-col w-full mx-auto space-y-3'}
        >
          <div className={'rounded-t-2xl overflow-hidden h-96 bg-gray-900'}>

            <MediaViewer
              fileUrl={nft.mediaUri}
              coverImageUrl={nft.name}
              type={handleMimeType(nft.mimeType)}
              crop={true}
            />
           
          </div>
          {children && <div>{children}</div>}
        </div>
      </div>
      {footer && (
        <>
          <div
            className={
              'mt-5 mb-3'
            }
          />
          <div className={'mx-auto w-full'}>
            {footer}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageCard
