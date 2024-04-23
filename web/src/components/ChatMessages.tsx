import assistantIcon from '../assets/assistant.svg';
import userIcon from '../assets/user.svg';
import { useScroll } from '../hooks/use-scroll';
import type { ChatMessage } from '../types';

type ChatMessagesProps = {
  messages: ChatMessage[];
};

export function ChatMessages(props: ChatMessagesProps) {
  const { messages } = props;
  const $scrollRef = useScroll(messages);

  return (
    <div className="h-[490px] min-w-full">
      <div ref={$scrollRef} className="overflow-y-auto h-[calc(100%-1.5rem)]">
        {messages.map((message, index) => (
          <div key={index} className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
              <div className="rounded-full bg-gray-100 border p-1">
                <img src={message.role === 'user' ? userIcon : assistantIcon} alt={message.role} />
              </div>
            </span>

            <p className="leading-relaxed">
              <span className="block font-bold text-gray-700">
                {{ user: 'You', assistant: 'AI' }[message.role]}{' '}
              </span>

              {message.content || (
                <span className="relative flex h-2 w-2 mt-1 ml-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-500 opacity-75"></span>
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
