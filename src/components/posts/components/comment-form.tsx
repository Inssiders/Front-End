// src/components/posts/post-detail/CommentForm.tsx
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CommentFormProps {
  postId: string;
  commentInputRef: React.RefObject<HTMLTextAreaElement>;
  onCommentSubmit: () => void;
}

export function CommentForm({ postId, commentInputRef, onCommentSubmit }: CommentFormProps) {
  const form = useForm({
    defaultValues: { comment: "" },
  });

  const onSubmit = async (values: { comment: string }) => {
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: values.comment }),
      });

      if (!res.ok) {
        throw new Error('댓글 등록에 실패했습니다.');
      }
      onCommentSubmit();
      form.reset();
      toast.success("댓글이 등록되었습니다.");
    } catch (error) {
      toast.error("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <div className="border-gray-100 dark:border-gray-800 px-0 sm:px-0 bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 sm:flex-row px-4">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    {...field}
                    ref={commentInputRef}
                    placeholder="댓글을 입력하세요..."
                    className="resize-none min-h-[44px]"
                  />
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