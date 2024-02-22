import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/shared/Loader';
import PostStats from '@/components/ui/shared/PostStats';
import { useUserContext } from '@/context/AuthContext';
import { useGetPostByid } from '@/lib/react-query/queriesAndMutaions'
import { formatDateString } from '@/lib/utils';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
const PostDetail = () => {
  const {id} = useParams();
  const {data:post,isPending} = useGetPostByid(id || '');
  const {user} = useUserContext();
  const handleDeletePost = () =>{}
  return (
    <div className='post_details-container'>
      {isPending ? <Loader/>:
      <div className='post_details-card'>
        <img src={post?.imageUrl} alt="postDetails" className='post_details-img'/>
        <div className='post_details-info'>
          <div className='flex-between w-full'>
          <Link to={`/profile/${post?.creator.$id}`} className='flex items-center gap-3'>
                <img className='w-8 rounded-full h-8 lg:w-12 lg:h-12' src={post?.creator?.imageUrl || 'assers/icons/profile-placeholder.svg'} alt="creator" />
            
            <div className='flex flex-col gap-1'>
                <p className='base-medium lg:body-bold text-light-1'>{post?.creator.name}</p>
                <div className='flex-center gap-2 text-light-3'>
                    <p className='subtle-semibold lg:small-regular'>{formatDateString(post?.$createdAt)}</p>
                    -
                    <p className='subtle-semibold lg:small-regular'>{post?.location}</p>
                </div>
            </div>
            </Link>
            <div className='flex-center gap-1'>
              <Link to={`/update-post/${post?.$id}`} className={`${user.id !== post?.creator.$id && "hidden"}`} >
              <img src="/assets/icons/edit.svg" alt="editicon" width={24} height={24}/></Link>

              <Button onClick={handleDeletePost}
              variant="ghost"
              className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && "hidden"}`}>
                  <img src="/assets/icons/delete.svg" alt="delete" width={24} height={24}/>
              </Button>
            </div>
          </div>
          <hr className='border w-full border-dark-4/80'/>
          <div className=' flex flex-col flex-1 w-full small-medium lg:base-regular'>
        <p>{post?.caption}</p>
        <ul className='flex gap-1 mt-2'>
        {post?.tags.map((tag:string)=>(
            <li className='text-light-3' key={tag}>
                #{tag}
            </li>
        ))}
        </ul>
        </div>
        <div className='w-full'>
          <PostStats post={post} userId={user.id}/>
        </div>
        </div>
      </div>
      }
      
    </div>
  )
}

export default PostDetail
