import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.organizationId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const documentType = searchParams.get("documentType");

    const where: any = { organizationId: user.organizationId };
    if (status) where.status = status;
    if (documentType) where.documentType = documentType;

    const documents = await db.document.findMany({
      where,
      include: {
        lineItems: true,
      },
      orderBy: { uploadedAt: "desc" },
    });

    return NextResponse.json({ documents });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.organizationId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { filename, fileType, fileSize, documentType } = body;

    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    const doc = await db.document.create({
      data: {
        organizationId: user.organizationId,
        uploadedBy: user.id,
        filename,
        fileType: fileType || "PDF",
        fileSize: fileSize || 500000,
        storagePath: `/uploads/${filename}`,
        documentType: documentType || "INVOICE",
        status: "UPLOADED",
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: "DOCUMENT_UPLOAD",
        resource: `Document:${doc.id}`,
        details: `Uploaded ${filename} (${doc.documentType})`,
      },
    });

    return NextResponse.json({ document: doc }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
