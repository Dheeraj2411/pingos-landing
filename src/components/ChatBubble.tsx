import { Bot, CheckCheck } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  time: string;
  isOutbound: boolean;
  isAutoReply?: boolean;
  status?: "sent" | "delivered" | "read";
}

export default function ChatBubble({
  message,
  time,
  isOutbound,
  isAutoReply,
  status,
}: ChatBubbleProps) {
  if (isOutbound) {
    return (
      <div className="flex gap-2 max-w-[85%] ml-auto flex-row-reverse">
        <div className="bg-chat-bubble-out rounded-lg rounded-tr-none px-3 py-2 shadow-sm relative w-fit self-end mt-2">
          <div className="absolute top-0 -right-2 w-0 h-0 border-10 border-transparent border-t-chat-bubble-out border-l-chat-bubble-out" />
          {isAutoReply && (
            <div className="text-[12px] font-medium text-primary mb-1 flex items-center gap-1">
              <Bot className="w-3.5 h-3.5" /> Auto-reply
            </div>
          )}
          <p className="text-[14px] sm:text-[15px] text-text-primary leading-relaxed">
            {message}
          </p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-[11px] text-[#667781]">{time}</span>
            {status === "read" && (
              <CheckCheck className="w-4 h-4 text-[#53bdeb]" />
            )}
            {status === "sent" && (
              <svg
                viewBox="0 0 16 15"
                width="16"
                height="15"
                className="text-[#667781]"
              >
                <path
                  fill="currentColor"
                  d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512z"
                />
              </svg>
            )}
            {status === "delivered" && (
              <svg
                viewBox="0 0 16 15"
                width="16"
                height="15"
                className="text-[#53bdeb]"
              >
                <path
                  fill="currentColor"
                  d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 max-w-[85%]">
      <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm relative w-fit mt-2">
        <div className="absolute top-0 -left-2 w-0 h-0 border-10 border-transparent border-t-white border-r-white" />
        <p className="text-[14px] sm:text-[15px] text-text-primary leading-relaxed">
          {message}
        </p>
        <div className="flex items-center gap-1 justify-end mt-1">
          <span className="text-[11px] text-[#667781]">{time}</span>
        </div>
      </div>
    </div>
  );
}
