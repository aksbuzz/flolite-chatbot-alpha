import { useState } from 'react';
import { useTimeout } from '../hooks';

type ChatbotButtonProps = {
  onClick: () => void;
};

export function ChatbotButton({ onClick }: ChatbotButtonProps) {
  const [showChatButton, setShowChatButton] = useState(false);
  useTimeout(() => {
    setShowChatButton(true);
  }, 1000);

  return (
    <button
      className={`fixed  transition-all ${
        showChatButton ? 'bottom-4 ' : '-bottom-14'
      } right-4 inline-flex items-center justify-center rounded-full w-14 h-14 bg-[#f36a40] hover:scale-105 m-0 cursor-pointer`}
      type="button"
      aria-haspopup="dialog"
      aria-expanded="false"
      data-state="closed"
      onClick={onClick}
    >
      <svg
        xmlns=" http://www.w3.org/2000/svg"
        width="30"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white block border-gray-200 align-middle"
      >
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" className="border-gray-200"></path>
      </svg>
    </button>
  );
}
