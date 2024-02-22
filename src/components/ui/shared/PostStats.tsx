
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutaions";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite"
import React, { useState , useEffect } from "react";
import Loader from "./Loader";

type PostStatsProps = {
    post? : Models.Document;
    userId:string;
}


const PostStats = ({post,userId}:PostStatsProps) => {
    const {mutate : likePost} = useLikePost()
    const {mutate : savePost , isPending : isSavingPost} = useSavePost()
    const {mutate : deleteSavedPost , isPending : isDeletingSaved} = useDeleteSavedPost()
    const {data : currentUser} = useGetCurrentUser();
    const likedList = post?.likes.map((user: Models.Document)=>user.$id)

    const [likes,setLike]=useState<string[]>(likedList)
    const [isSaved, setIsSaved] = useState(false)
    const savedPostRecord = currentUser?.save.find((record:Models.Document)=>record.post.$id===post?.$id)
    useEffect(()=>{
        setIsSaved(!!savedPostRecord) // Automatic boolean expression
    },[currentUser])
    const handleLikePost=(e :React.MouseEvent) => {
                e.stopPropagation();
                let newLikes = [...likes];
                const hasLiked = newLikes.includes(userId);
                if(hasLiked){
                    newLikes = newLikes.filter((id)=>id!==userId);
                }else{
                    newLikes.push(userId);

                }
                setLike(newLikes);
                likePost({postId:post?.$id || '' , likesArray : newLikes})
    }
    const handleSavePost=(e : React.MouseEvent) => {
        e.stopPropagation();
       

        if(savedPostRecord){
            setIsSaved(false);
            return deleteSavedPost(savedPostRecord.$id)
        }
            
            savePost({postId : post?.$id || '' , userId:userId})
            setIsSaved(true)
            
        

    }
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img src={`${checkIsLiked(likes,userId)?"/assets/icons/liked.svg":"/assets/icons/like.svg"}`}
         className="cursor-pointer" onClick={handleLikePost} alt="like"  width={20} height={20}/>
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2 ">
        {isDeletingSaved || isSavingPost ? (<Loader/>) : (<img src={isSaved?"/assets/icons/saved.svg":"/assets/icons/save.svg"} className="cursor-pointer" onClick={(e)=>handleSavePost(e)} alt="like"  width={20} height={20}/>
       )}
        
      </div>
    </div>
  )
}

export default PostStats
