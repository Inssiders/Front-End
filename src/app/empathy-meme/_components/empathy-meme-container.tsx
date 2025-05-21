'use client';

import EmpathyCategories from '@/components/empathy-meme/empathy-categories';
import PostCategories from '@/components/posts/post-categories';
import PostsGrid from '@/components/posts/post-grid';
import { useInfiniteEmpathyMemes } from '@/hooks/use-infinite-user-posts';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingCircle {
  width: number;
  height: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  xMove: number;
}

interface EmpathyMemeContainerProps {
  initialPosts: any[];
}

export default function EmpathyMemeContainer({
  initialPosts,
}: EmpathyMemeContainerProps) {
  const { data, isFetchingNextPage, target } = useInfiniteEmpathyMemes({
    pageSize: 9,
  });

  const [circles, setCircles] = useState<FloatingCircle[]>([]);

  // Generate random circle properties on client-side only
  useEffect(() => {
    const newCircles = Array(5)
      .fill(null)
      .map(() => ({
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        xMove: Math.random() * 20 - 10,
      }));
    setCircles(newCircles);
  }, []);

  const allPosts =
    data?.pages.flatMap((page) =>
      page.items.map((item: any) => ({
        id: item.id,
        title: item.title,
        category: item.category || '기타',
        post_media_url: item.youtubeUrl,
        type: 'video',
        author: {
          name: item.author.name || 'Unknown',
          avatar: item.author.avatar || '/placeholder.svg',
        },
        likes: item.likes || 0,
        comments: item.comments || 0,
        shares: 0,
        views: 0,
        isLiked: false,
        isBookmarked: false,
      }))
    ) ?? initialPosts;

  return (
    <div className='space-y-8'>
      {/* Banner Section */}
      <div className='relative h-[300px] rounded-xl overflow-hidden'>
        {/* Animated background gradients */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600'
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 15,
            ease: 'linear',
            repeat: Infinity,
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />
        {/* Floating circles */}
        <motion.div
          className='absolute inset-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {circles.map((circle, i) => (
            <motion.div
              key={i}
              className='absolute rounded-full bg-white/10 backdrop-blur-sm'
              style={{
                width: circle.width,
                height: circle.height,
                left: circle.left,
                top: circle.top,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, circle.xMove, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: circle.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: circle.delay,
              }}
            />
          ))}
        </motion.div>
        {/* Content overlay */}
        <motion.div
          className='relative h-full flex flex-col items-center justify-center text-white p-6 text-center z-10'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className='text-4xl font-bold mb-4'
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            공감밈
          </motion.h1>
          <motion.p
            className='text-xl max-w-2xl'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            유튜브 영상으로 공감할 수 있는 밈들을 공유하세요.
            <br />
            재미있고 공감되는 순간들을 함께 나누어보세요.
          </motion.p>
        </motion.div>
      </div>
      <EmpathyCategories />
      {/* Grid Section */}
      <PostsGrid
        posts={allPosts}
        loading={isFetchingNextPage}
        columns={4}
        showAuthor={true}
        showActions={true}
        layout='grid'
      />

      {/* Infinite Scroll Target */}
      <div ref={target} className='h-1' />
    </div>
  );
}
