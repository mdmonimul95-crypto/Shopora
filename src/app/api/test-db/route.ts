import clientPromise from "@/lib/mongodb";


export async function GET() {
  try {
    const client = await clientPromise;

    await client.db("shopora").command({
      ping: 1,
    });

    return Response.json({
      success: true,
      message: "MongoDB connected successfully!",
    });
  } catch (error) {
    console.error("MONGODB ERROR:", error);

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}