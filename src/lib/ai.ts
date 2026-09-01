type GenerateProductDescriptionInput = {
  productName: string;
  category: string;
  shortDescription?: string;
};

type GenerateProductDescriptionResponse = {
  shortDescription: string;
  description: string;
};

export const generateProductDescription = async (
  data: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionResponse> => {
  const response = await fetch(
    "/api/ai/product-description",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Failed to generate product description"
    );
  }

  return result.data;
};