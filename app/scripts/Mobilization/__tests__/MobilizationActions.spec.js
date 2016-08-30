import React from 'react'
import { expect } from 'chai'

import {
  progressUploadFacebookImage,
  finishUploadFacebookImage
} from '../MobilizationActions'

describe('MobilizationActions', () => {
  describe('#progressUploadFacebookImage', () => {
    const result = progressUploadFacebookImage()

    it('should return an object', () => {
      expect(result).to.be.an.object
    })
    it('should have `type` key', () => {
      expect(result).to.have.keys('type')
    })
    it('`type` key should be PROGRESS_UPLOAD_FACEBOOK_IMAGE', () => {
      expect(result).to.have.property('type', 'PROGRESS_UPLOAD_FACEBOOK_IMAGE')
    })
  })

  describe('#finishUploadFacebookImage', () => {
    const result = finishUploadFacebookImage()

    it('should return an object', () => {
      expect(result).to.be.an.object
    })
    it('should have `type` key', () => {
      expect(result).to.have.keys('type')
    })
    it('`type` key should be FINISH_UPLOAD_FACEBOOK_IMAGE', () => {
      expect(result).to.have.property('type', 'FINISH_UPLOAD_FACEBOOK_IMAGE')
    })
  })
})
