// src/components/posts/components/reply-form.tsx
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

interface ReplyFormProps {
  postId: string;
  commentId: string;
  onReplySubmit: () => void;
}

export function ReplyForm({ postId, commentId, onReplySubmit }: ReplyFormProps) {
  const form = useForm({ defaultValues: { reply: "" } });

  const onSubmit = async (values: { reply: string }) => {
    try {
      const res = await fetch(`/api/posts/${postId}/comments/${commentId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: values.reply }),
      });
      if (!res.ok) throw new Error("대댓글 등록에 실패했습니다.");
      onReplySubmit();
      form.reset();
      toast.success("대댓글이 등록되었습니다.");
    } catch {
      toast.error("대댓글 등록에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 flex gap-2">
      <Textarea
        {...form.register("reply")}
        placeholder="대댓글을 입력하세요..."
        className="min-h-[32px] resize-none"
      />
      <Button type="submit" size="sm">
        등록
      </Button>
    </form>
  );
}
