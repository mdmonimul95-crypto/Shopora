const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const apiPost = async <T>(
  path: string,
  data: unknown
): Promise<T> => {
  try {
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const url = `${baseUrl}${path}`;

    // console.log("API POST URL:", url);
    // console.log("API POST DATA:", data);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // console.log("API RESPONSE STATUS:", response.status);

    // First response as text so we can see HTML errors too
    const responseText = await response.text();

    // console.log("API RESPONSE:", responseText);

    let result: T & { message?: string };

    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error(
        `Server returned invalid JSON. Status: ${response.status}. Response: ${responseText.slice(
          0,
          300
        )}`
      );
    }

    if (!response.ok) {
      throw new Error(
        result?.message || `Request failed with status ${response.status}`
      );
    }

    return result;
  } catch (error) {
    // console.error("API POST ERROR:", error);

    throw error instanceof Error
      ? error
      : new Error("Something went wrong");
  }
};


export const apiGet = async <T>( path: string): Promise<T> => {
  try {
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const url = `${baseUrl}${path}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const responseText = await response.text();

    let result: T & { message?: string };

    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error(
        `Server returned invalid JSON. Status: ${response.status}. Response: ${responseText.slice(
          0,
          300
        )}`
      );
    }

    if (!response.ok) {
      throw new Error(
        result?.message ||
          `Request failed with status ${response.status}`
      );
    }

    return result;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Something went wrong");
  }
};