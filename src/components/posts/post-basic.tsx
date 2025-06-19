"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategoryOption, PostData } from "@/types/posts";
import { motion } from "framer-motion";
import { CategorySelect } from "./components/category-select";
import { InputHash } from "./components/input-hash";
import { VideoSection } from "./components/video-section";

interface PostBasicProps {
  postData: PostData;
  onChange: (data: PostData) => void;
  handlePreviewMode: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  categories: CategoryOption[];
}

const inputVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const PostBasic = ({ postData, onChange, handlePreviewMode, onSubmit, isLoading, categories }: PostBasicProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...postData, [name]: value });
  };

  const isSubmitDisabled = !postData.title || !postData.content || !postData.media_url || !postData.category_name;

  return (
    <motion.div
      className="space-y-6"
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <motion.div variants={inputVariants} className="space-y-2">
        <Input
          name="title"
          value={postData.title}
          onChange={handleChange}
          placeholder="제목을 입력해주세요"
          className="text-lg font-medium focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-md"
        />
      </motion.div>

      <motion.div variants={inputVariants} className="space-y-2">
        <Textarea
          name="content"
          value={postData.content}
          onChange={handleChange}
          placeholder="내용을 입력해주세요"
          className="min-h-[120px] focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-md resize-none"
        />
      </motion.div>

      <motion.div variants={inputVariants}>
        <VideoSection
          mediaUrl={postData.media_url}
          onMediaUrlChange={(url) => onChange({ ...postData, media_url: url })}
        />
      </motion.div>

      <motion.div variants={inputVariants}>
        <CategorySelect
          selectedCategory={postData.category_name}
          onCategoryChange={(category) => onChange({ ...postData, category_name: category })}
        />
      </motion.div>

      <motion.div variants={inputVariants}>
        <InputHash tags={postData.tags} onChange={(tags) => onChange({ ...postData, tags })} />
      </motion.div>

      <motion.div variants={inputVariants} className="flex gap-4 pt-4">
        <Button
          type="button"
          onClick={handlePreviewMode}
          variant="outline"
          className="flex-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300"
        >
          미리보기
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitDisabled || isLoading}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "생성 중..." : "밈 생성하기"}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default PostBasic;
