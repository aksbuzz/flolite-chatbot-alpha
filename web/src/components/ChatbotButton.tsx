type ChatbotButtonProps = {
  onClick: () => void;
}

export function ChatbotButton({ onClick }: ChatbotButtonProps) {
  return (
    <button
      className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
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
