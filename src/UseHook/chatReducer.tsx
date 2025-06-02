export type MessageInfo = {
  chatId: string;
  messageId: string;
  message: string;
  sendId: string;
  nickname: string;
  profile: string;
  timestamp: string;
  type: string;
  recount: number;
  isSend: boolean;
};

type ChatAction =
  | { type: "INIT"; payload: MessageInfo[] }
  | { type: "ADD"; payload: MessageInfo }
  | { type: "MARK_READ"; payload: string[] }
  | { type: "DELETE"; payload: string };

export default function chatReducer(state: MessageInfo[], action: ChatAction): MessageInfo[] {
  switch (action.type) {
    case "INIT":
      return [...action.payload];
    case "ADD":
      return [...state, action.payload];
    case "MARK_READ":
      return state.map((chat) =>
        action.payload.includes(chat.messageId)
          ? { ...chat, recount: Math.max(chat.recount - 1, 0) }
          : chat
      );
    case "DELETE":
      return state.filter((chat) => chat.messageId !== action.payload);
    default:
      return state;
  }
}