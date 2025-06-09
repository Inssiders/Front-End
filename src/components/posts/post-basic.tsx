'use client'
import React, { useRef, useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { VideoSection } from './components/video-section'

import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import HashTagInput from './components/input-hash'
import CategorySelect from './components/category-select'
import FeildBox from './components/feild-box'
const categories = [
    { value: "news", label: "뉴스" },
    { value: "sports", label: "스포츠" },
    { value: "music", label: "음악" },
    { value: "movie", label: "영화" },
  ];
const PostBasic = () => {
    const basicRef = useRef<{ [key: string]: any }>({});
    const [title, setTitle] = useState('')
    const [inputUrl, setInputUrl] = useState('')
    const [textareaContent, setTextareaContent] = useState('')
    const [hashtags, setHashtags] = useState<string[]>([])
    const [category, setCategory] = useState('')
    const handleSave = (e: React.ChangeEvent<HTMLInputElement>) => {


    };
    const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const changeUrlHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setInputUrl(e.target.value)
    }
    const changeTextareaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaContent(e.target.value)
    }
    return (
        <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
            <Card className="w-full">
                <CardContent>
                    <FeildBox label="제목">
                        <Input value={title} onChange={changeTitleHandler} placeholder='제목을 입력하세요.' />
                    </FeildBox>
                    <FeildBox label="동영상 URL" >
                        <Input value={inputUrl} onChange={changeUrlHandler} placeholder='동영상 URL을 입력하세요.' />
                        <div className="w-full aspect-video flex items-center justify-center bg-gray-50 md:rounded-l-lg md:rounded-r-none">
                            <VideoSection mediaUrl={inputUrl} title='test' />
                        </div>
                    </FeildBox>
                    <FeildBox label="밈 내용">
                        <Textarea
                            placeholder='밈 내용을 입력하세요.'
                            value={textareaContent}
                            onChange={changeTextareaHandler}
                        />
                    </FeildBox>
                    <FeildBox label="해시태그">
                        <HashTagInput onChange={setHashtags} />
                    </FeildBox>
                    <FeildBox label="카테고리">
                        <CategorySelect categories={categories} onChange={setCategory} value={category} />
                    </FeildBox>
                </CardContent>

            </Card>

        </div>
    )
}

export default PostBasic
