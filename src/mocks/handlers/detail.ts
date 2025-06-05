// src/mocks/handlers.ts - MSW 핸들러
import { http, HttpResponse } from "msw";
import { mockPosts } from "../seed-data/detail-seed-data";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL;

export const handlers = [
  // 개별 게시물 조회
  http.get(`${BASE_URL}/api/posts/:id/detail`, ({ params }) => {
    const { id } = params;
    const post = mockPosts.find((p) => p.post_id === id);

    if (!post) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Post not found",
      });
    }

    return HttpResponse.json(post);
  }),

  http.get(`${BASE_URL}/api/posts/:id/comments`, ({ params }) => {
    const { id } = params;
    const post = mockPosts.find((p) => p.post_id === id);
    return HttpResponse.json({ comments: post?.comments_list ?? [] });
  }),

  // 관련 게시물 조회 (RelatedPosts 컴포넌트용)
  http.get(`${BASE_URL}/api/posts/:id/related`, ({ params }) => {
    const { id } = params;
    const currentPost = mockPosts.find((p) => p.post_id === id);

    if (!currentPost) {
      return HttpResponse.json([]);
    }

    // 같은 카테고리의 다른 게시물들 반환
    const relatedPosts = mockPosts
      .filter((post) => post.post_id !== id && post.category_name === currentPost.category_name)
      .slice(0, 3); // 최대 3개

    return HttpResponse.json(relatedPosts);
  }),

  // 댓글 추가 (POST)
  http.post(`${BASE_URL}/api/posts/:id/comments`, async ({ params, request }) => {
    const { id } = params;
    const { comment } = (await request.json()) as { comment: string };

    const newComment = {
      comment_id: `c${Date.now()}`,
      comment_content: comment,
      comment_created_at: new Date().toISOString(),
      comment_user_id: "current_user",
      user_username: "현재사용자",
      user_profile_url:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    };

    // 실제로는 데이터베이스에 저장하겠지만, 목업에서는 메모리에만 추가
    const post = mockPosts.find((p) => p.post_id === id);
    if (post) {
      post.comments_list.unshift(newComment);
      post.post_comments = post.comments_list.length;
    }

    return HttpResponse.json(newComment, { status: 201 });
  }),
  http.post("/api/posts/:postId/comments/:commentId/replies", async ({ params, request }) => {
    const { postId, commentId } = params;
    const { reply } = (await request.json()) as { reply: string };
    const post = mockPosts.find((p) => p.post_id === postId);
    const comment = post?.comments_list.find((c) => c.comment_id === commentId);
    const newReply = {
      reply_id: `r${Date.now()}`,
      reply_content: reply,
      reply_created_at: new Date().toISOString(),
      reply_user_id: "current_user",
      user_username: "현재사용자",
      user_profile_url:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    };
    if (comment) {
      comment.replies = comment.replies || [];
      comment.replies.unshift(newReply);
    }
    return HttpResponse.json(newReply, { status: 201 });
  }),
  // 좋아요 토글 (POST)
  http.post(`${BASE_URL}/api/posts/:id/like`, ({ params }) => {
    const { id } = params;
    const post = mockPosts.find((p) => p.post_id === id);

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    // 좋아요 수 증가/감소 (실제로는 사용자별로 관리해야 함)
    post.post_likes += 1;

    return HttpResponse.json({
      liked: true,
      likes: post.post_likes,
    });
  }),
  // 댓글 삭제
  http.delete("/api/posts/:postId/comments/:commentId", ({ params }) => {
    const { postId, commentId } = params;
    const post = mockPosts.find((p) => p.post_id === postId);
    if (post && Array.isArray(post.comments_list)) {
      post.comments_list = post.comments_list.filter((c) => c.comment_id !== commentId);
      post.post_comments = post.comments_list.length;
    }
    return HttpResponse.json({ success: true });
  }),
  // 대댓글(답글) 삭제
  http.delete("/api/posts/:postId/comments/:commentId/replies/:replyId", ({ params }) => {
    const { postId, commentId, replyId } = params;
    const post = mockPosts.find((p) => p.post_id === postId);
    const comment = post?.comments_list.find((c) => c.comment_id === commentId);
    if (comment && Array.isArray(comment.replies)) {
      comment.replies = comment.replies.filter((r: any) => r.reply_id !== replyId);
    }
    return HttpResponse.json({ success: true });
  }),
  // 댓글 수정
  http.patch("/api/posts/:postId/comments/:commentId", async ({ params, request }) => {
    const { postId, commentId } = params;
    const { comment_content } = (await request.json()) as { comment_content: string };
    const post = mockPosts.find((p) => p.post_id === postId);
    const comment = post?.comments_list.find((c) => c.comment_id === commentId);
    if (comment) {
      comment.comment_content = comment_content;
    }
    return HttpResponse.json({ success: true, comment });
  }),
  // 대댓글(답글) 수정
  http.patch(
    "/api/posts/:postId/comments/:commentId/replies/:replyId",
    async ({ params, request }) => {
      const { postId, commentId, replyId } = params;
      const { reply_content } = (await request.json()) as { reply_content: string };
      const post = mockPosts.find((p) => p.post_id === postId);
      const comment = post?.comments_list.find((c) => c.comment_id === commentId);
      const reply = comment?.replies?.find((r: any) => r.reply_id === replyId);
      if (reply) {
        reply.reply_content = reply_content;
      }
      return HttpResponse.json({ success: true, reply });
    }
  ),
];
