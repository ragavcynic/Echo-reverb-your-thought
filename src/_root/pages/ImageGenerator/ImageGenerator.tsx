import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Loader from '@/components/ui/shared/Loader';
import { toast } from '@/components/ui/use-toast';
import React, { useState } from 'react'
import { saveAs } from 'file-saver';
import { surpriseMePrompts } from '@/constants/FontSup';
const ImageGenerator = () => {
    
    const [searchValue, setSearchValue] = useState("")
    const [imageUrl,setImageUrl] = useState("/")
    const [isFetching,setIsFetching] = useState(false)
    
    const downloadFileAtUrl = (url:string)=>{
      console.log(url)
      fetch(url)
      .then((response)=>response.blob())
      .then((blob)=>{
        saveAs(blob, "image.jpg");
        const blobURL = window.URL.createObjectURL(new Blob([blob]))
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download",url);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove()
      })
        
    }
    const handleSuprise =()=>{
      const randomElement = surpriseMePrompts[Math.floor(Math.random() * surpriseMePrompts.length)];
      setSearchValue(randomElement)
    }
    const handleGenerate = async () => {
        setIsFetching(true)
        if (searchValue === "" || searchValue === "/") {
            return toast({ title: "Enter something to render" });
        }
    
        try {
            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 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",
                },
                body: JSON.stringify({
                    prompt: searchValue,
                    n: 1,
                    size: "512x512"
                }),
            });
            
            const data = await response.json()
            const data_array = data.data 
            setImageUrl(data_array[0].url)
            setIsFetching(false)
            
            
    
        
        } catch (error) {
            console.error("Error:", error);
        }
    }

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Generate <span className='text-light-4'>AI Image</span></h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Describe the image to generate"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>
      <div className='pt-10 flex flex-1 flex-col gap-4 items-center'>  
     <img className='post-card_img' src={imageUrl==="/"?"/assets/images/default_image.svg":(imageUrl)} alt="" width={500} height={500} /> 
     {isFetching && <Loader/>}
          </div><div className='flex flex-row gap-4'>
            <Button className='shad-button_primary whitespace-nowrap px-10' onClick={()=>handleGenerate()} >Generate</Button>
            <Button className='shad-button_ghost whitespace-nowrap px-10' onClick={()=>handleSuprise()}>Suprise me</Button>
            
         <Button className="shad-button_primary whitespace-nowrap px-10 cursor-pointer" onClick={()=>downloadFileAtUrl(imageUrl)}>Download</Button>
            </div>
      </div>
  )}


export default ImageGenerator