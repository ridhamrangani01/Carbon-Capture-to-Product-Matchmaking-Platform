import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { processDocumentPipeline } from "@/lib/documents/processor";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const docId = params.id;
    const processedDoc = await processDocumentPipeline(docId, user.id);

    return NextResponse.json({
      success: true,
      document: processedDoc,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Processing failed" }, { status: 500 });
  }
}
