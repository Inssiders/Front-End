import toast from "react-hot-toast";
import { PostData } from "../types/posts";

export const createPost = async (postData: PostData) => {
    try {
        const response = await fetch('/server/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        if (response.status === 400) {
            const error = await response.json();
            toast.error(error.detail || '필수 항목을 입력해주세요.');
            return;
        }
        if (response.status === 401) {
            const error = await response.json();
            toast.error(error.detail || '로그인 후 이용해주세요.');
            return;
        }
        if (!response.ok) {
            throw new Error('밈 생성에 실패했습니다');
        }
        const data = await response.json();
        
        toast.success(data.message || '밈이 성공적으로 생성되었습니다!');
        return data;
        // 필요하다면 추가 동작 (예: 입력값 초기화, 페이지 이동 등)
    } catch (error: any) {
        toast.error(error.message || '알 수 없는 오류가 발생했습니다.');
    }
};

export const updatePost = async (postData: PostData, id: number): Promise<PostData | undefined> => {
    try {
        const response = await fetch(`/server/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        if (response.status === 400) {
            const error = await response.json();
            toast.error(error.detail || '필수 항목을 입력해주세요.');
            return;
        }
        if (response.status === 401) {
            const error = await response.json();
            toast.error(error.detail || '로그인 후 이용해주세요.');
            return;
        }
        if (response.status === 404) {
            const error = await response.json();
            toast.error(error.detail || '해당 콘텐츠는 삭제되었습니다.');
            return;
        }
        if (!response.ok) {
            throw new Error('밈 수정에 실패했습니다');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('업데이트 중 오류 발생:', error);
        toast.error('업데이트 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
}

export const deletePost = async (id: number) => {
    try {
        const response = await fetch(`/server/posts/delete/${id}`, {
            method: 'PATCH',
        });

        if (response.status === 403) {
            const error = await response.json();
            toast.error(error.detail || '삭제 권한이 없습니다.');
            return;
        }
        if (!response.ok) {
            throw new Error('밈 삭제에 실패했습니다');
        }

        const data = await response.json();
        toast.success(data.message || '요청이 성공적으로 처리되었습니다');
        return data;
    } catch (error) {
        console.error('삭제 중 오류 발생:', error);
        toast.error('삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
}

export const likePost = async (id: number) => {
    const response = await fetch(`/server/${id}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target_type: 'POST' }),
    });
    if (response.status === 400) {
        const error = await response.json();
        toast.error(error.detail || '존재하지 않는 콘텐츠입니다.');
        return null;
    }
    if (response.status === 401) {
        const error = await response.json();
        toast.error(error.detail || '로그인 진행 후 이용해주세요.');
        return null;
    }
    if (!response.ok) {
        throw new Error('좋아요 요청에 실패했습니다');
    }
    const data = await response.json();
    return data;
}

export const fetchComments = async (memeId: number) => {
    try {
        const response = await fetch(`/server/comments/${memeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 404) {
            const error = await response.json();
            toast.error(error.detail || '해당 콘텐츠는 존재하지 않습니다.');
            return;
        }
        if (!response.ok) {
            throw new Error('댓글 조회에 실패했습니다');
        }

        const data = await response.json();
        return data.data; // 댓글 목록 반환
    } catch (error) {
        console.error('댓글 조회 중 오류 발생:', error);
 
    }
}

// 댓글 및 대댓글 작성 함수
export const addComment = async (memeId: number, content: string,  parentCommentId?: number) => {
    try {
        const response = await fetch(`/server/comments/${memeId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content,
                parent_comment_id: parentCommentId || null // 널 일 수 있나?
            })
        });

        if (response.status === 400) {
            const error = await response.json();
            toast.error(error.detail || "내용을 입력해주세요.");
            return;
        }
        if (response.status === 401) {
            const error = await response.json();
            toast.error(error.detail || "로그인 진행 후 이용해주세요.");
            return;
        }
        if (response.ok) {
            const data = await response.json();
            toast.success("리소스가 성공적으로 생성되었습니다");
            return data.data; // 생성된 댓글 데이터 반환
        } else {
            toast.error("댓글 작성에 실패했습니다.");
        }
    } catch (error) {
        toast.error("댓글 작성 중 오류가 발생했습니다.");
    }
};

// 댓글 수정 함수
export const updateComment = async (commentId: number, newComment: string, ) => {
    try {
        const response = await fetch(`/server/comments/${commentId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: newComment })
        });

        if (response.status === 400) {
            const error = await response.json();
            toast.error(error.detail || "제목이나 내용을 입력해주세요.");
            return false;
        }
        if (response.status === 401) {
            const error = await response.json();
            toast.error(error.detail || "로그인 진행 후 이용해주세요.");
            return false;
        }
        if (response.status === 403) {
            const error = await response.json();
            toast.error(error.detail || "수정 권한이 없습니다.");
            return false;
        }
        if (response.status === 404) {
            const error = await response.json();
            toast.error(error.detail || "해당 콘텐츠는 삭제되었습니다.");
            return false;
        }
        if (response.status === 409) {
            const error = await response.json();
            toast.error(error.detail || "하위 댓글이 존재하여 수정이 불가능합니다.");
            return false;
        }
        if (response.ok) {
            toast.success("요청이 성공적으로 처리되었습니다");
            return true; // 수정된 댓글 데이터 반환
        } else {
            toast.error("댓글 수정에 실패했습니다.");
            return false;
        }
    } catch (error) {
        toast.error("댓글 수정 중 오류가 발생했습니다.");
    }
};

// 댓글 삭제 함수
export const deleteComment = async (commentId: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
        try {
            const response = await fetch(`/server/comments/delete/${commentId}`, {
                method: "PATCH",
            });
            if (response.status === 403) {
                const error = await response.json();
                toast.error(error.detail || "삭제 권한이 없습니다.");
                return false;
            }
            if (response.status === 409) {
                const error = await response.json();
                toast.error(error.detail || "하위 댓글이 존재하여 삭제가 불가능합니다.");
                return false;
            }
            if (response.ok) {
              
                toast.success("댓글 삭제에 성공하셨습니다.");
                return true;
            } else {
                toast.error("댓글 삭제에 실패했습니다.");
                return false;
            }
        } catch (error) {
            toast.error("댓글 삭제 중 오류가 발생했습니다.");
            return false;
        }
    }
};