import { forwardRef } from 'react';
import assistantIcon from '../assets/assistant.svg';
import userIcon from '../assets/user.svg';
import type { ChatMessage } from '../types';

type ChatMessagesProps = {
  messages: ChatMessage[];
  onScroll: () => void;
};

export const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(function ChatMessages(
  props,
  ref
) {
  const { messages, onScroll } = props;

  return (
    <div className="h-[calc(100%-56px)] min-w-full py-2 pl-2">
      <div onScroll={onScroll} className="overflow-y-auto h-[calc(100%)]">
        {messages.map((message, index) => (
          <div key={index} className="flex gap-3 my-4 first:mt-1 text-gray-600 text-sm flex-1">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
              <div className={"rounded-full bg-gray-100 border p-1"}>
                <img src={message.role === 'user' ? userIcon : assistantIcon} alt={message.role} />
              </div>
            </span>

            <p className="leading-relaxed mr-2">
              <span className="block font-normal text-gray-700">
                {{ user: 'You', assistant: 'Flolite Assistant' }[message.role]}{' '}
              </span>

              {message.content ? (
                <span
                  className={`block ${
                    message.role === 'assistant' ? 'bg-gray-200' : ''
                  } bg-white text-black  rounded-lg p-2 shadow-sm`}
                >
                  {message.content}
                </span>
              ) : (
                <span className="relative flex h-2 w-2 mt-1 ml-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-500 opacity-75"></span>
                </span>
              )}
            </p>
          </div>
        ))}
        <div ref={ref} />
      </div>
    </div>
  );
});
