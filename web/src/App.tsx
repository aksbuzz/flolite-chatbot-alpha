import { useRef, useState } from 'react';
import { sendMessage } from './api/send-message';
import { ChatInput, ChatMessages, ChatbotButton } from './components';
import { useDisclosure } from './hooks';
import type { ChatMessage } from './types';
import { isInViewport } from './util/dom';

const defaultMessages: ChatMessage[] = [
  { role: 'assistant', content: '👋Welcome to Flolite Assistant. How can I help you?' },
];

function App() {
  const $messagesRef = useRef<HTMLDivElement>(null);
  const $scrollRef = useRef<boolean>(true);

  const chatbot = useDisclosure();
  const [messages, setMessages] = useState<Array<ChatMessage>>(defaultMessages);

  const isSending = messages.some(m => m.role === 'assistant' && m.content === '');

  async function handleSendMessage(message: string) {
    setMessages(prev => [
      ...prev,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    setTimeout(() => $messagesRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);

    try {
      const response = await sendMessage(message);
      setMessages(prev =>
        prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: response } : m))
      );
    } catch (error) {
      setMessages(prev =>
        prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, content: 'There was an error. Please try again.' } : m
        )
      );
    }

    if ($scrollRef.current) {
      setTimeout(() => $messagesRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
    }
  }

  function handleScroll() {
    if (isInViewport($messagesRef.current!)) $scrollRef.current = true;
    else $scrollRef.current = false;
  }

  return (
    <>
      {chatbot.isOpen && (
        <div className="fixed shadow-sm bottom-20 right-0 mr-4 bg-white rounded-lg w-[380px] h-[560px]">
          {/* Chatbot Header */}
          <div className="flex rounded-tl rounded-tr p-2 bg-[#f36a40] flex-col space-y-1.5 pb-3">
            <h2 className="font-semibold text-white text-lg tracking-tight">Flolite Assistant</h2>
            <p className="text-xs text-white leading-3">Online</p>
          </div>

          <div className="h-[calc(560px-66px)] bg-[#f9fafb]">
            <ChatMessages messages={messages} ref={$messagesRef} onScroll={handleScroll} />
            <ChatInput onSend={handleSendMessage} isSending={isSending} />
          </div>
        </div>
      )}

      <ChatbotButton onClick={chatbot.toggle} />
    </>
  );
}

export default App;
