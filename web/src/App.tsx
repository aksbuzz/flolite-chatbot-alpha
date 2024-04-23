import { useState } from 'react';
import { sendMessage } from './api/send-message';
import { ChatInput, ChatMessages, ChatbotButton } from './components';
import { useDisclosure } from './hooks';
import type { ChatMessage } from './types';

function App() {
  const chatbot = useDisclosure();
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);

  const isSending = messages.some(m => m.role === 'assistant' && m.content === '');

  async function handleSendMessage(message: string) {
    setMessages(prev => [
      ...prev,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

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
  }

  return (
    <>
      {chatbot.isOpen && (
        <div className="fixed shadow-sm bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]">
          {/* Chatbot Header */}
          <div className="flex flex-col space-y-1.5 pb-6">
            <h2 className="font-semibold text-lg tracking-tight">Flolite Chatbot</h2>
            <p className="text-sm text-[#6b7280] leading-3">Hello, how can I help you?</p>
          </div>

          <ChatMessages messages={messages} />
          <ChatInput onSend={handleSendMessage} isSending={isSending} />
        </div>
      )}

      <ChatbotButton onClick={chatbot.toggle} />
    </>
  );
}

export default App;
