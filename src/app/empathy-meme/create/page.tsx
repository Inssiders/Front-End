'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';

export default function CreateMemePage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  const embedUrl = (() => {
    const match = youtubeUrl.match(
      /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
  })();

  return (
    <div className='max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-md shadow border my-6'>
      <h1 className='text-2xl font-bold text-gray-800'>공감밈 생성하기</h1>

      {/* 제목 입력 */}
      <div>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='제목을 입력해 주세요.'
          className='w-full border px-4 py-2 rounded text-lg'
        />
      </div>

      {/* 카테고리 선택 */}
      <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='w-full border px-4 py-2 rounded text-sm'
        >
          <option value=''>카테고리를 선택하세요</option>
          <option value='유머'>유머</option>
          <option value='K-POP'>K-POP</option>
          <option value='드라마'>드라마</option>
          <option value='연예인'>연예인</option>
          <option value='텍스트'>텍스트</option>
        </select>
      </div>

      {/* 유튜브 링크 */}
      <div>
        <input
          type='text'
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder='유튜브 영상 링크를 붙여넣으세요'
          className='w-full border px-4 py-2 rounded text-sm'
        />
      </div>

      {/* 유튜브 미리보기 */}
      {embedUrl && (
        <div className='w-[50%] h-[50%] aspect-video'>
          <iframe src={embedUrl} className='rounded' allowFullScreen />
        </div>
      )}

      {/* 본문 에디터 */}
      <div className='space-y-2'>
        {/* 에디터 */}
        <EditorContent
          editor={editor}
          className='min-h-[200px] border px-4 py-2 rounded text-sm'
        />
      </div>

      {/* 제출 버튼 */}
      <div className='text-right'>
        <button className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded text-sm'>
          업로드
        </button>
      </div>
    </div>
  );
}
