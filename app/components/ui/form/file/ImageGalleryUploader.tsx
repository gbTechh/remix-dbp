import React, { useId, useState } from 'react'
import { Text } from '../..'

interface ImageUploaderProps {
  onImagesSelected: (images: File[]) => void
  maxImages?: number
  data?: (string | File)[]
}

export const ImageGalleryUploader: React.FC<ImageUploaderProps> = ({
  onImagesSelected,
  maxImages = 10,
}) => {
  const [selectedImages, setSelectedImages] = useState<File[] | string[]>([])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const selectedFiles = Array.from(files)
      if (selectedImages.length + selectedFiles.length <= maxImages) {
        setSelectedImages((prevImages) => [...prevImages, ...selectedFiles])
        onImagesSelected([...selectedImages, ...selectedFiles])
      } else {
        console.log('Has excedido el límite de imágenes')
      }
    }
  }

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = Array.from(event.dataTransfer.files)
    setSelectedImages((prevImages) => [...prevImages, ...droppedFiles])
    onImagesSelected([...selectedImages, ...droppedFiles])
  }
  const id = useId()

  const getNameImg = (img:string) => {
    const str = img.split('/')
    return str[str.length - 1]
  }
  return (
    <div className="flex items-end w-full justify-end flex-col">
      <div
        className="border-[0.8px] border-violet-900 border-dashed p-4 rounded-lg w-full"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Text size="md">Arrastra las imágenes</Text>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
          id={id}
        />
        <label htmlFor={id} className="cursor-pointer">
          <Text size="xs" color="contrast" className='hover:text-violet-400 transition-colors'>
            o haz click aquí para subir imágenes
          </Text>
        </label>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 w-full">
        {selectedImages.map((image, index) => (
          <div
            key={index}
            className="flex items-center gap-2 justify-between w-full"
          >
            <img
              width={100}
              height={100}
              src={typeof (image) === 'string' ? image : URL.createObjectURL(image)}
              alt={`Imagen ${index}`}
              className="h-16 w-16 object-cover rounded"
            />
            <Text size="xs" color="contrast" className="flex-1 text-left">
              {typeof (image) === 'string' ? getNameImg(image) : image.name}
            </Text>
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="text-red-500"
            >
              <Text size="xs" color="error">
                Eliminar
              </Text>
            </button>
          </div>    
        ))}
      </div>
    </div>
  )
}
