// src/mocks/data/posts.ts - 목업 데이터 정의
export const mockPosts = [
  {
    // 게시물 기본 정보
    post_id: "1",
    post_title: "재미있는 고양이 밈 모음",
    post_content: "오늘 발견한 귀여운 고양이 밈들을 공유합니다!\n정말 웃겨서 계속 보게 되네요 😸\n\n여러분도 즐겁게 보세요!",
    post_media_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    post_created_at: "2024-01-15T10:30:00Z",
    post_likes: 142,
    post_comments: 23,
    
    // 사용자 정보
    user_id: "user123",
    user_detail_username: "고양이러버",
    user_detail_profile_url: "https://images.unsplash.com/photo-1494790108755-2616c5e5b1e5?w=150&h=150&fit=crop&crop=face",
    
    // 카테고리 및 태그
    category_name: "동물",
    tag_name: "고양이",
    tag_names: ["고양이", "밈", "재미있는"],
    
    // 댓글 목록
    comments_list: [
      {
        comment_id: "c1",
        comment_content: "너무 웃겨요! 고양이가 정말 귀엽네요 ㅋㅋㅋ",
        comment_created_at: "2024-01-15T11:00:00Z",
        comment_user_id: "user456",
        user_username: "밈덕후",
        user_profile_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        replies: [
          {
            reply_id: "r1",
            reply_content: "저도 고양이 키우는데 정말 공감되는 내용이에요!\n우리 냥이도 이런 표정 자주 지어요 😂",
            reply_created_at: "2024-01-15T12:30:00Z",
            reply_user_id: "user789",
            user_username: "냥집사",
            user_profile_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
          }
        ]
      },
      {
        comment_id: "c2", 
        comment_content: "저도 고양이 키우는데 정말 공감되는 내용이에요!\n우리 냥이도 이런 표정 자주 지어요 😂",
        comment_created_at: "2024-01-15T12:30:00Z",
        comment_user_id: "user789",
        user_username: "냥집사",
        user_profile_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        replies: [
          {
            reply_id: "r2",
            reply_content: "저도 고양이 키우는데 정말 공감되는 내용이에요!\n우리 냥이도 이런 표정 자주 지어요 😂",
            reply_created_at: "2024-01-15T12:30:00Z",
            reply_user_id: "user789",
            user_username: "냥집사",
            user_profile_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
          }
        ]
      },
      {
        comment_id: "c3",
        comment_content: "이런 콘텐츠 더 많이 올려주세요!",
        comment_created_at: "2024-01-15T14:15:00Z",
        comment_user_id: "user101",
        user_username: "구독자1",
        user_profile_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
       
      }
    ]
  },
  {
    post_id: "2",
    post_title: "개발자 일상 밈 컬렉션",
    post_content: "개발하면서 겪는 일상들을 밈으로 만들어봤습니다.\n\n버그 찾을 때의 심정...\n코드 리뷰 받을 때의 긴장감...\n\n개발자라면 공감하실 거예요!",
    post_media_url: "https://www.youtube.com/embed/J---aiyznGQ",
    post_created_at: "2024-01-14T16:45:00Z",
    post_likes: 89,
    post_comments: 15,
    
    user_id: "developer99",
    user_detail_username: "코딩마스터",
    user_detail_profile_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    
    category_name: "개발",
    tag_name: "개발자",
    tag_names: ["개발자", "밈", "일상", "프로그래밍"],
    
    comments_list: [
      {
        comment_id: "c4",
        comment_content: "진짜 개발자 일상 그 자체네요 ㅠㅠ 특히 버그 찾는 부분이 너무 공감돼요",
        comment_created_at: "2024-01-14T17:20:00Z",
        comment_user_id: "coder123",
        user_username: "주니어개발자",
        user_profile_url: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face"
      },
      {
        comment_id: "c5",
        comment_content: "코드 리뷰 받을 때 정말 저런 기분이에요... 😅",
        comment_created_at: "2024-01-14T18:10:00Z",
        comment_user_id: "senior_dev",
        user_username: "시니어개발자",
        user_profile_url: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face"
      }
    ]
  },
  {
    post_id: "3",
    post_title: "운동 동기부여 밈",
    post_content: "새해 결심으로 운동 시작했는데...\n현실은 이래요 😂\n\n그래도 포기하지 않고 계속 도전해봅시다!",
    post_media_url: "https://www.youtube.com/embed/ZXsQAXx_ao0",
    post_created_at: "2024-01-13T09:15:00Z",
    post_likes: 67,
    post_comments: 8,
    
    user_id: "fitness_lover",
    user_detail_username: "헬스맨",
    user_detail_profile_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    
    category_name: "운동",
    tag_name: "헬스",
    tag_names: ["헬스", "운동", "동기부여", "새해결심"],
    
    comments_list: [
      {
        comment_id: "c6",
        comment_content: "저도 작심삼일이에요... 함께 힘내봐요!",
        comment_created_at: "2024-01-13T10:00:00Z",
        comment_user_id: "workout_buddy",
        user_username: "운동초보",
        user_profile_url: "https://images.unsplash.com/photo-1494790108755-2616c5e5b1e5?w=150&h=150&fit=crop&crop=face"
      }
    ]
  }
]



