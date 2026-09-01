import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { productName, category, shortDescription } = body;

    if (!productName || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Product name and category are required",
        },
        { status: 400 }
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "OPENROUTER_API_KEY is missing",
        },
        { status: 500 }
      );
    }

    const prompt = `
Generate e-commerce product descriptions.

Product Name: ${productName}
Category: ${category}
Existing Short Description: ${
      shortDescription || "No short description provided"
    }

Create:

1. shortDescription:
- 1-2 sentences
- Maximum 160 characters
- Clear and attractive

2. description:
- 1-2 paragraphs
- Detailed and professional
- Mention benefits and suitable use cases
- Do not invent specific technical specifications

Return ONLY JSON.
Do not use markdown.
Do not use code blocks.

Use exactly this structure:

{
  "shortDescription": "string",
  "description": "string"
}
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Shopora",
        },

        body: JSON.stringify({
          model: "openrouter/free",

          messages: [
            {
              role: "system",
              content:
                "You are an expert e-commerce product description writer. Always return valid JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],

          response_format: {
            type: "json_object",
          },

          temperature: 0.7,

          max_tokens: 1200,
        }),
      }
    );

    const result = await response.json();

    console.log("OpenRouter Status:", response.status);
    console.log("OpenRouter Response:", result);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            result?.error?.message ||
            "OpenRouter request failed",
        },
        { status: response.status }
      );
    }

    const content =
      result?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          message: "No AI response received",
        },
        { status: 500 }
      );
    }

    let parsedContent;

    try {
      parsedContent = JSON.parse(content);
    } catch (error) {
      console.error("JSON Parse Error:", error);
      console.error("AI Content:", content);

      return NextResponse.json(
        {
          success: false,
          message: "AI returned invalid JSON",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,

      data: {
        shortDescription:
          parsedContent.shortDescription || "",

        description:
          parsedContent.description || "",
      },
    });
  } catch (error) {
    console.error("AI Description Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate product description",
      },
      { status: 500 }
    );
  }
}