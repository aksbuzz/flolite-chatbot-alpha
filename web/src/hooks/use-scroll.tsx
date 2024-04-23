import { useEffect, useRef } from 'react';
import { ChatMessage } from '../types';

export function useScroll(messages: ChatMessage[]) {
  const $containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!$containerRef.current) {
      return;
    }

    const { offsetHeight, scrollHeight, scrollTop } = $containerRef.current;
    if (scrollHeight <= offsetHeight + scrollTop + 100) {
      $containerRef.current.scrollTo(0, scrollHeight);
    }
  }, [messages]);

  return $containerRef;
}
