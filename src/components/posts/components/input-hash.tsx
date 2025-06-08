import { X } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface HashTagInputProps {
  onChange: (tags: string[]) => void;
}

const HashTagInput: React.FC<HashTagInputProps> = ({ onChange }) => {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  // 입력값에 따라 인풋의 width 자동 조절
  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      // 최소 2em, 최대 200px
      inputRef.current.style.width = Math.min(Math.max(spanRef.current.offsetWidth + 16, 32), 200) + 'px';
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      let tag = input.trim();
      if (!tag.startsWith('#')) tag = `#${tag}`;
      if (!tags.includes(tag)) {
        const newTags = [...tags, tag];
        setTags(newTags);
        onChange(newTags);
      }
      setInput('');
      e.preventDefault();
    }
  };

  const handleRemove = (removeTag: string) => {
    const newTags = tags.filter(tag => tag !== removeTag);
    setTags(newTags);
    onChange(newTags);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2 items-center">
        {tags.map(tag => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center text-sm"
          >
            {tag}
            <button
              type="button"
              className="ml-1 text-xs text-red-500"
              onClick={() => handleRemove(tag)}
            >
              <X />
            </button>
          </span>
        ))}
        <span ref={spanRef} className="invisible absolute whitespace-pre px-2 py-1 text-sm font-normal">
          {input || '해시태그를 입력하세요.'}
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="해시태그를 입력하세요."
          className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm outline-none border-none min-w-[32px] max-w-[200px]"
          style={{ width: 32, transition: 'width 0.2s' }}
        />
      </div>
    </div>
  );
};

export default HashTagInput;