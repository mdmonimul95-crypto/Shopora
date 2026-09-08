import { apiPost } from "@/lib/core/server";

export type AIChatResponse = {
  success: boolean;
  message: string;
};

export const sendAIMessage = async (
  message: string
): Promise<AIChatResponse> => {
  return await apiPost<AIChatResponse>("/api/v1/ai/chat", {
    message,
  });
};