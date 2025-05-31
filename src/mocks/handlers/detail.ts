// src/mocks/handlers.ts - MSW 핸들러
import { http, HttpResponse } from 'msw'
import { mockPosts } from '../seed-data/detail-seed-data'
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL;
export const handlers = [
  // 개별 게시물 조회
  http.get(`${BASE_URL}/api/posts/:id/detail`, ({ params }) => {
    const { id } = params
    const post = mockPosts.find(p => p.post_id === id)
    
    if (!post) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Post not found'
      })
    }
    
    return HttpResponse.json(post)
  }),

  
  // 관련 게시물 조회 (RelatedPosts 컴포넌트용)
  http.get(`${BASE_URL}/api/posts/:id/related`, ({ params }) => {
    const { id } = params
    const currentPost = mockPosts.find(p => p.post_id === id)
    
    if (!currentPost) {
      return HttpResponse.json([])
    }
    
    // 같은 카테고리의 다른 게시물들 반환
    const relatedPosts = mockPosts
      .filter(post => 
        post.post_id !== id && 
        post.category_name === currentPost.category_name
      )
      .slice(0, 3) // 최대 3개
    
    return HttpResponse.json(relatedPosts)
  }),
  
  // 댓글 추가 (POST)
  http.post(`${BASE_URL}/api/posts/:id/comments`, async ({ params, request }) => {
    const { id } = params
    const { comment } = await request.json() as { comment: string }
    
    const newComment = {
      comment_id: `c${Date.now()}`,
      comment_content: comment,
      comment_created_at: new Date().toISOString(),
      comment_user_id: "current_user",
      user_username: "현재사용자",
      user_profile_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
    
    // 실제로는 데이터베이스에 저장하겠지만, 목업에서는 메모리에만 추가
    const post = mockPosts.find(p => p.post_id === id)
    if (post) {
      post.comments_list.unshift(newComment)
      post.post_comments = post.comments_list.length
    }
    
    return HttpResponse.json(newComment, { status: 201 })
  }),
  
  // 좋아요 토글 (POST)
  http.post(`${BASE_URL}/api/posts/:id/like`, ({ params }) => {
    const { id } = params
    const post = mockPosts.find(p => p.post_id === id)
    
    if (!post) {
      return new HttpResponse(null, { status: 404 })
    }
    
    // 좋아요 수 증가/감소 (실제로는 사용자별로 관리해야 함)
    post.post_likes += 1
    
    return HttpResponse.json({ 
      liked: true, 
      likes: post.post_likes 
    })
  })
]