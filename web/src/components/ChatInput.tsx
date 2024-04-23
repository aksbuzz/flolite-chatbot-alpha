import { useState } from 'react';

type ChatInputProps = {
  onSend: (message: string) => void;
  isSending: boolean;
};

export function ChatInput({ onSend, isSending }: ChatInputProps) {
  const [message, setMessage] = useState('');

  function handleSendClick() {
    if (isSending || message.trim() === '') return;

    setMessage('');
    onSend(message);
  }

  return (
    <div className="flex items-center pt-0">
      <div className="flex items-center justify-center w-full space-x-2">
        <input
          className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
          placeholder="Your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button
          type="button"
          onClick={handleSendClick}
          className={`inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2`}
        >
          Send
        </button>
      </div>
    </div>
  );
}
