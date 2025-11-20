import { NEXT_PUBLIC_URL } from "@api";
import { notification } from "antd";
import { Share2 } from "lucide-react";

interface IOCopyToClipboardProps {
  text: string;
}

export const CopyToClipboard = ({ text }: IOCopyToClipboardProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      notification.success({
        message: "Sao chép thành công!",
        placement: "bottomRight",
      });
    } catch (err) {
      console.error("Copy failed:", err);
      notification.success({
        message: "Không copy được — thử lại",
        placement: "bottomRight",
      });
    }
  };

  return (
    <button className="hover: rounded-lg transition" onClick={handleCopy}>
      <Share2 className="w-4 h-4" />
    </button>
  );
};
