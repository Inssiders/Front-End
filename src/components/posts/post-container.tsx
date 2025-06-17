"use client";

import { createPost } from "@/utils/fetch/posts";
import type { CategoryOption } from "@/utils/types/posts";
import { PostData } from "@/utils/types/posts";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import PostBasic from "./post-basic";
import { PostDetail } from "./post-detail";

interface PostContainerProps {
  categories: CategoryOption[];
}

const backgroundVariants: Variants = {
  initial: { backgroundPosition: "0% 0%" },
  animate: {
    backgroundPosition: "100% 100%",
    transition: { duration: 20, repeat: Infinity, repeatType: "reverse" as const },
  },
};

const contentVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const PostContainer = ({ categories }: PostContainerProps) => {
  const router = useRouter();
  const [previewMode, setPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState<PostData>({
    title: "",
    content: "",
    media_url: "",
    media_upload_time: new Date().toISOString(),
    category_name: "",
    tags: [],
  });

  const handlePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await createPost(postData);
      toast.success("밈이 성공적으로 생성되었습니다!", {
        style: {
          background: "linear-gradient(to right, #FF61D8, #6B8BFF)",
          color: "white",
        },
      });
      router.push("/empathy-meme");
    } catch (error) {
      toast.error("밈 생성에 실패했습니다. 다시 시도해주세요.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden"
      initial="initial"
      animate="animate"
      variants={backgroundVariants}
      style={{
        background: "linear-gradient(-45deg, #FF61D8, #6B8BFF, #A6FFEA, #FFD88B)",
        backgroundSize: "400% 400%",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-[100px] bg-white/30 dark:bg-gray-900/30" />

      <motion.div variants={contentVariants} className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: "linear-gradient(to right, #FF61D8, #6B8BFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(107, 139, 255, 0.5)",
            }}
          >
            ✨ 공감밈 만들기 ✨
          </motion.h1>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl blur-xl transform -rotate-1" />
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 transform hover:scale-[1.01] transition-transform duration-300">
              <AnimatePresence mode="wait">
                {previewMode ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PostDetail isPreview post={postData} handlePreviewMode={handlePreviewMode} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="edit"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <PostBasic
                      postData={postData}
                      onChange={setPostData}
                      handlePreviewMode={handlePreviewMode}
                      onSubmit={handleSubmit}
                      isLoading={isLoading}
                      categories={categories}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PostContainer;
