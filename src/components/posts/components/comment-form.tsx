// src/components/posts/post-detail/CommentForm.tsx
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CommentFormProps {
    postId: string;
    commentInputRef: React.RefObject<HTMLTextAreaElement>;
    onCommentSubmit: () => void;
    replyTo?: { commentId: string; username: string } | null;
    onCancelReply?: () => void;
}

export function CommentForm({
    postId,
    commentInputRef,
    onCommentSubmit,
    replyTo,
    onCancelReply,
}: CommentFormProps) {
    const form = useForm({
        defaultValues: { comment: "" },

    });

    const onSubmit = async (values: { comment: string }) => {
        try {
            if (replyTo) {
                // 대댓글 등록
                await fetch(`/api/posts/${postId}/comments/${replyTo.commentId}/replies`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ reply: values.comment }),
                });
            } else {
                // 일반 댓글 등록
                await fetch(`/api/posts/${postId}/comments`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ comment: values.comment }),
                });
            }
            onCommentSubmit();
            form.reset();
            toast.success("댓글이 등록되었습니다.");
        } catch {
            toast.error("댓글 등록에 실패했습니다.");
        }
    };

    return (
        <div className="border-gray-100 dark:border-gray-800 px-0 sm:px-0 bg-white ">
            <Form {...form}>
                {replyTo && onCancelReply && (
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">{replyTo.username}</span>
                        <Button
                            type="button"
                            variant="ghost"
                            className="p-1 w-6 h-6"
                            onClick={onCancelReply}
                        >
                               <X  />
                        </Button>
                       
                        </div>
                )}
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 sm:flex-row px-4">

                    <FormField
                        control={form.control}
                        name="comment"
                        rules={{
                            required: "공백을 입력할 수 없습니다.",

                        }}
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <div className="flex items-center">

                                        <Textarea
                                            {...field}
                                            ref={commentInputRef}
                                            placeholder={replyTo ? "답글을 입력하세요..." : "댓글을 입력하세요..."}
                                            className="resize-none min-h-[44px]"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="h-auto w-full sm:w-auto sm:ml-2 mt-2 sm:mt-0">
                        등록
                    </Button>

                </form>
            </Form>
        </div>
    );
}