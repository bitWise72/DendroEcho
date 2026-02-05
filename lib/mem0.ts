const mem0BaseUrl = process.env.MEM0_BASE_URL ?? "https://api.mem0.ai";
const mem0ApiKey = process.env.MEM0_API_KEY ?? "";

export type Mem0Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function appendMemory(userId: string, messages: Mem0Message[]) {
  if (!mem0ApiKey) {
    return null;
  }

  const response = await fetch(`${mem0BaseUrl}/v1/memories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${mem0ApiKey}`,
    },
    body: JSON.stringify({ user_id: userId, messages }),
  });

  if (!response.ok) {
    throw new Error("Failed to append memory");
  }

  return response.json();
}
