import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || !user.organizationId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reports = await db.report.findMany({
      where: { organizationId: user.organizationId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ reports });
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
    const { title, type, format } = body;

    const report = await db.report.create({
      data: {
        organizationId: user.organizationId,
        title: title || "Carbon Accounting Summary Report 2026",
        type: type || "SUMMARY",
        format: format || "PDF",
        downloadUrl: `/reports/${(title || "report").toLowerCase().replace(/\s+/g, "_")}.pdf`,
        totalCO2eTonnes: 1340.5,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: "REPORT_GENERATED",
        resource: `Report:${report.id}`,
        details: `Generated ${report.type} report (${report.format})`,
      },
    });

    return NextResponse.json({ report }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
