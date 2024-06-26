
import React, {useCallback, useState} from 'react'
import {useDropzone , FileWithPath} from 'react-dropzone'
import { Button } from '../button';

type FileUploaderProps = {
    fieldChange : (Files:File[])=>void,
    mediaUrl : string
}

const FileUploader = ({fieldChange , mediaUrl} : FileUploaderProps) => {
    const [fileUrl, setFileUrl] = useState(mediaUrl);
    const [file,setFile] = useState<File[]>([])
    const onDrop = useCallback((acceptedFiles : FileWithPath[])=> {
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
      }, [file])
      const {getRootProps, getInputProps } = useDropzone({onDrop,accept:{
        "image/*":['.png','.jpeg','.jpg','.svg']
      }})
  return (
    <div {...getRootProps()} className='flex flex-center flex-col cursor-pointer bg-dark-3 rounded-xl'>
    <input {...getInputProps()} className='cursor-pointer' />
    {
      fileUrl ?(<>        <div className='flex flex-1 justify-center w-full p-5 lg:p-10 '>
                <img src={fileUrl} 
                className='file_uploaded_img'
                alt="Uploaded url" />
        </div>
        <p className='file_uploader-label'>
            Click or drag photo to replace
        </p>
        </>

      )
    :(
        <div className='file_uploader-box'>
            <img src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="fileupload" />
            <h3 className='base-medium text-light-2 mb-2 mt-6'> Drag photo here</h3>
            <p className='text-light-4 small-regular mb-6'>SVG PNG JPEG</p>
            <Button className='shad-button_dark_4'>
                Select from computer
            </Button>
        </div>
    )  
    }
  </div>
  )
}

export default FileUploader
