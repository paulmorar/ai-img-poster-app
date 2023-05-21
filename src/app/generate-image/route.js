import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_TOKEN,
});
const openai = new OpenAIApi(configuration);

export async function POST(req) {
  const body = await req.json();
  //   For testing override
  return NextResponse.json({
    success: true,
    imageUrl:
      "https://mystickermania.com/cdn/stickers/cute-cats/cat-sunglasses-512x512.png",
  });
  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_TOKEN,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createImage({
      prompt: body.description,
      n: 1,
      size: "512x512",
    });
    const imageUrl = response.data.data[0].url;

    return NextResponse.json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    if (error.response) {
      return NextResponse.json({
        success: false,
        errorMessage:
          error?.response?.data?.error?.message ||
          "The image cannot be generated",
      });
    }
    return NextResponse.json({
      success: false,
      errorMessage: error?.message || "The image cannot be generated",
    });
  }
}
