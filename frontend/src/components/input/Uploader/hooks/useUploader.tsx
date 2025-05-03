import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { DeleteIcon, ImageIcon, InsertDriveFileIcon } from '@styles/Icons'
import { Image } from '@components/display'

const useUploader = (
  initialFiles: File[] = [],
  onUpload: (files: File[]) => void,
  multiple?: boolean,
  disabled?: boolean
) => {
  const [files, setFiles] = useState<File[]>(initialFiles || [])

  const onDrop = useCallback(
    (acceptedFiles: File[]): void => {
      if (!disabled) {
        const newFiles = [...files, ...acceptedFiles]
        setFiles(newFiles)
        onUpload(newFiles)
      }
    },
    [disabled, files, onUpload]
  )

  const onRemoveFile = useCallback(
    (fileToRemove: File): void => {
      const newFiles = files.filter((file) => file !== fileToRemove)
      setFiles(newFiles)
      onUpload(newFiles)
    },
    [onUpload, files]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx'
      ],
      'application/pdf': ['.pdf']
    },
    multiple,
    disabled: disabled || (!multiple && files.length > 0)
  })

  const returnFileItems = (): any => {
    return files.map((file): any => {
      const { name, type } = file

      const isImage = type.startsWith('image/')
      const imageUrl = URL.createObjectURL(file)

      return {
        primaryLabel: name,
        primaryIcon: isImage ? <ImageIcon /> : <InsertDriveFileIcon />,
        secondaryIcon: <DeleteIcon />,
        secondaryIconDescription: 'Remove file',
        onSecondaryClick: () => onRemoveFile(file),
        children: isImage && (
          <Image
            src={imageUrl}
            alt={name}
            sx={{ width: 100, height: 'auto' }}
          />
        )
      }
    })
  }

  return {
    getRootProps,
    getInputProps,
    returnFileItems
  }
}

export default useUploader
