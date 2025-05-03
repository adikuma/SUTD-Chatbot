import { FileUpload } from 'graphql-upload-ts'

export interface UploadResources {
  csv: Promise<FileUpload>
}
