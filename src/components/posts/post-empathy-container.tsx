'use client'

import React, { useState } from 'react'
import PostBasic from './post-basic'
import { PostDetail } from './post-detail'
import { PostData } from '@/utils/types/posts'



const PostEmpathyContainer = () => {
    const [previewMode, setPreviewMode] = useState(false)
    const [postData, setPostData] = useState<PostData>({
        post_id: 0,
        title: "",
        content: "",
        media_url: "",
        media_upload_time: "",
        category_name: "",
        tags: []
    })
    const handlePreviewMode = () => {
        setPreviewMode(!previewMode)
    }
    const handlePreviewPost = (post: PostData) => {
       console.log(post)
       setPostData(post)
    }
  return (
    <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
      {previewMode ? (
        <PostDetail isPreview post={postData} handlePreviewMode={handlePreviewMode} />
      ) : (
        <PostBasic
          postData={postData}
          onChange={setPostData}
          handlePreviewMode={handlePreviewMode}
        />
      )}
    </div>
  )
}

export default PostEmpathyContainer
