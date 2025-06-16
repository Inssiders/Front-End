'use client'

import React, { useEffect, useState } from 'react'
import PostBasic from './post-basic'
import { PostDetail } from './post-detail'
import { CommentData, PostData } from '@/utils/types/posts'
import { fetchComments, updatePost } from '@/utils/fetch/post-detail'



const PostDetailContainer = (post: PostData) => {
    const [previewMode, setPreviewMode] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [postData, setPostData] = useState<PostData>({
        post_id: 0,
        title: "",
        content: "",
        media_url: "",
        media_upload_time: "",
        category_name: "",
        tags: []
    })
    const [comments, setComments] = useState<CommentData[]>([])
    const handlePreviewMode = () => {
        setPreviewMode(!previewMode)
    }
    const handlePostData = (post: PostData) => {
        console.log(post)
        setPostData(post)
        
    }
    const handleEditMode = () => {
        setEditMode(!editMode)
    }
    const handleEditRequest = () => {
        updatePost(postData, postData.post_id).then((data) => {
            if (data) {
                setPostData(data);
                setEditMode(false)
            }
        })
    }
    useEffect(() => {
        setPostData(post)
        if (postData.post_id) {
            fetchComments(postData.post_id).then((data) => {
                console.log(data)
                setComments(data)
            })

        }
    }, [postData.post_id])
    return (
        <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
            {editMode ? (
                previewMode ? (
                    <PostDetail  isPreview post={postData} handlePreviewMode={handlePreviewMode} />
                ) : (
                    <PostBasic
                        editMode={editMode}
                        handleEditRequest={handleEditRequest}
                        postData={postData}
                        onChange={setPostData}
                        handlePreviewMode={handlePreviewMode}
                    />
                )
            ) : (
                <PostDetail post={postData} initialComments={comments} handleEditMode={handleEditMode}/>
            )}
        </div>
    )
}

export default PostDetailContainer
