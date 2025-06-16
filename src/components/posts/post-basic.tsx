'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { VideoSection } from './components/video-section'

import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import HashTagInput from './components/input-hash'
import CategorySelect from './components/category-select'
import FeildBox from './components/feild-box'
import { Button } from '../ui/button'
import { PostData } from '@/utils/types/posts'
import { createPost } from '@/utils/fetch/post-detail'

interface PostBasicProps {
    postData: PostData
    onChange: (data: PostData) => void
    handlePreviewMode: () => void
    editMode?: boolean
    handleEditRequest?: () => void
}
const categories = [
    { value: "news", label: "뉴스" },
    { value: "sports", label: "스포츠" },
    { value: "music", label: "음악" },
    { value: "movie", label: "영화" },
];

const PostBasic = ({ handlePreviewMode, onChange, postData, editMode, handleEditRequest }: PostBasicProps) => {
    const basicRef = useRef<{ [key: string]: any }>({});



    //api
    const handleSave = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(basicRef.current)

    };

    const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...postData, title: e.target.value })
    }
    const changeUrlHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...postData, media_url: e.target.value })
    }
    const changeTextareaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({ ...postData, content: e.target.value })
    }
    const hashtagChangeHandler = (tags: string[]) => {
        onChange({ ...postData, tags })
    }
    const categoryChangeHandler = (category_name: string) => {
        onChange({ ...postData, category_name })
    }

    // POST /server/posts 호출 함수 (Authorization 헤더는 미들웨어가 자동 추가)

    const handleCreateMeme = async () => {
        const data = await createPost(postData)
        console.log(data)
    }
    return (
        <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">밈 작성</h1>
                <Button onClick={handlePreviewMode}>미리보기</Button>
            </div>

            <Card className="w-full">
                <CardContent>
                    <FeildBox label="제목">
                        <Input value={postData.title} onChange={changeTitleHandler} placeholder='제목을 입력하세요.' />
                    </FeildBox>
                    <FeildBox label="동영상 URL" >
                        <Input value={postData.media_url} onChange={changeUrlHandler} placeholder='동영상 URL을 입력하세요.' />
                        <div className="w-full aspect-video flex items-center justify-center bg-gray-50 md:rounded-l-lg md:rounded-r-none">
                            <VideoSection mediaUrl={postData.media_url} title='test' isEdit />
                        </div>
                    </FeildBox>
                    <FeildBox label="밈 내용">
                        <Textarea
                            placeholder='밈 내용을 입력하세요.'
                            value={postData.content}
                            onChange={changeTextareaHandler}
                        />
                    </FeildBox>
                    <FeildBox label="해시태그">
                        <HashTagInput onChange={hashtagChangeHandler} propsTags={postData.tags} />
                    </FeildBox>
                    <FeildBox label="카테고리">
                        <CategorySelect categories={categories} onChange={categoryChangeHandler} value={postData.category_name} />
                    </FeildBox>
                    {editMode ? (<div className="flex justify-end mt-4">
                        <Button onClick={handleEditRequest}>수정 완료</Button>
                    </div>) : (<div className="flex justify-end mt-4">
                        <Button onClick={handleCreateMeme} color="primary">
                            밈 생성
                        </Button>
                    </div>)}
                </CardContent>

            </Card>

        </div>
    )
}

export default PostBasic
