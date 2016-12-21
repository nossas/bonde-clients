import c from '../../../mobilizations/blocks/constants'

export const backgroundImageUploadProgress = () => ({ type: c.BLOCK_BACKGROUND_IMAGE_UPLOAD_PROGRESS })
export const backgroundImageUploadFinish = () => ({ type: c.BLOCK_BACKGROUND_IMAGE_UPLOAD_FINISH })
export const backgroundImageUploaded = image => ({ type: c.BLOCK_BACKGROUND_IMAGE_UPLOADED, image })
