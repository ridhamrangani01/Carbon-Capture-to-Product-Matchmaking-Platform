/**
 * Transactional & Demo Request Email Service Abstraction
 * Handles production dispatch (e.g. Resend, SMTP) and safe development logging.
 */

interface SendDemoConfirmationParams {
  toEmail: string;
  fullName: string;
  requestId: string;
  companyName: string;
  role: string;
  location?: string;
  preferredDate?: string;
  preferredTime?: string;
}

interface SendAdminDemoNotificationParams {
  toAdminEmail: string;
  requestId: string;
  fullName: string;
  workEmail: string;
  phone?: string | null;
  companyName: string;
  role: string;
  industry?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  pincode?: string | null;
  message?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
}

export async function sendDemoConfirmationEmail(params: SendDemoConfirmationParams): Promise<{ success: boolean; mode: "PRODUCTION" | "DEVELOPMENT_MODE" }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || "UpCarb Demo Team <demo@upcarb.com>";

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #083324; color: #ffffff; padding: 32px; border-radius: 12px;">
      <h2 style="color: #22c55e; font-size: 24px; margin-bottom: 16px;">Demo Request Confirmed</h2>
      <p style="font-size: 16px; line-height: 1.5;">Hi <strong>${params.fullName}</strong>,</p>
      <p style="font-size: 15px; line-height: 1.5; color: #e2e8f0;">
        Thank you for requesting a personalized Carbon2Product / UpCarb demo. We have received your request and our carbon intelligence team will review it.
      </p>

      <div style="background-color: #06291d; border: 1px solid #22c55e; padding: 20px; border-radius: 8px; margin: 24px 0;">
        <p style="margin: 4px 0; color: #94a3b8; font-size: 13px;">Request ID:</p>
        <p style="margin: 0 0 12px 0; font-family: monospace; font-size: 16px; color: #22c55e; font-weight: bold;">${params.requestId}</p>

        <p style="margin: 4px 0; color: #94a3b8; font-size: 13px;">Company / Organization:</p>
        <p style="margin: 0 0 12px 0; font-size: 15px; color: #ffffff;">${params.companyName}</p>

        <p style="margin: 4px 0; color: #94a3b8; font-size: 13px;">Role:</p>
        <p style="margin: 0 0 12px 0; font-size: 15px; color: #ffffff;">${params.role}</p>

        ${params.location ? `
        <p style="margin: 4px 0; color: #94a3b8; font-size: 13px;">Location:</p>
        <p style="margin: 0 0 12px 0; font-size: 15px; color: #ffffff;">${params.location}</p>
        ` : ""}

        ${params.preferredDate ? `
        <p style="margin: 4px 0; color: #94a3b8; font-size: 13px;">Preferred Slot:</p>
        <p style="margin: 0 0 12px 0; font-size: 15px; color: #38bdf8;">${params.preferredDate} ${params.preferredTime ? `at ${params.preferredTime} IST` : ""}</p>
        ` : ""}

        <p style="margin: 4px 0; color: #94a3b8; font-size: 13px;">Status:</p>
        <p style="margin: 0; font-size: 14px; color: #38bdf8; font-weight: bold;">PENDING TECHNICAL REVIEW</p>
      </div>

      <p style="font-size: 14px; color: #94a3b8; line-height: 1.5;">
        We will contact you using this email address (<strong style="color: #ffffff;">${params.toEmail}</strong>) to confirm your demo.
      </p>

      <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
      <p style="font-size: 12px; color: #64748b; text-align: center;">
        Carbon2Product / UpCarb Deterministic CCU Matchmaking Platform (India)
      </p>
    </div>
  `;

  if (!apiKey) {
    console.log(`\n======================================================`);
    console.log(`[DEVELOPMENT EMAIL MODE] - DEMO CONFIRMATION EMAIL`);
    console.log(`TO: ${params.toEmail}`);
    console.log(`FROM: ${fromEmail}`);
    console.log(`SUBJECT: Your Carbon2Product demo request is confirmed`);
    console.log(`REQUEST ID: ${params.requestId}`);
    console.log(`DETAILS: Company=${params.companyName}, Role=${params.role}, Location=${params.location || 'India'}`);
    console.log(`SLOT: ${params.preferredDate || 'N/A'} ${params.preferredTime || ''} IST`);
    console.log(`======================================================\n`);
    return { success: true, mode: "DEVELOPMENT_MODE" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [params.toEmail],
        subject: "Your Carbon2Product demo request is confirmed",
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Email Error] Resend API failed:", errText);
      return { success: false, mode: "PRODUCTION" };
    }

    return { success: true, mode: "PRODUCTION" };
  } catch (err) {
    console.error("[Email Exception] Failed to send email:", err);
    return { success: false, mode: "PRODUCTION" };
  }
}

export async function sendAdminDemoNotificationEmail(params: SendAdminDemoNotificationParams): Promise<{ success: boolean; mode: "PRODUCTION" | "DEVELOPMENT_MODE" }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || "UpCarb System <system@upcarb.com>";
  const adminEmail = params.toAdminEmail || process.env.DEMO_NOTIFICATION_EMAIL || "admin@upcarb.com";

  if (!apiKey) {
    console.log(`\n======================================================`);
    console.log(`[DEVELOPMENT EMAIL MODE] - ADMIN DEMO NOTIFICATION`);
    console.log(`ADMIN RECIPIENT: ${adminEmail}`);
    console.log(`NEW DEMO REQUEST ID: ${params.requestId}`);
    console.log(`APPLICANT: ${params.fullName} (${params.workEmail})`);
    console.log(`COMPANY: ${params.companyName} | ROLE: ${params.role}`);
    if (params.phone) console.log(`MOBILE: ${params.phone}`);
    if (params.city || params.state) console.log(`LOCATION: ${params.city || ''}, ${params.state || ''}, ${params.country || 'India'}`);
    if (params.preferredDate) console.log(`SLOT: ${params.preferredDate} ${params.preferredTime || ''} IST`);
    if (params.message) console.log(`MESSAGE: ${params.message}`);
    console.log(`======================================================\n`);
    return { success: true, mode: "DEVELOPMENT_MODE" };
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [adminEmail],
        subject: `[NEW DEMO REQUEST] ${params.companyName} - ${params.fullName}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #0f172a; color: #fff;">
            <h3>New Demo Request Received</h3>
            <p><strong>Request ID:</strong> ${params.requestId}</p>
            <p><strong>Name:</strong> ${params.fullName}</p>
            <p><strong>Work Email:</strong> ${params.workEmail}</p>
            <p><strong>Mobile:</strong> ${params.phone || "Not provided"}</p>
            <p><strong>Company:</strong> ${params.companyName}</p>
            <p><strong>Role:</strong> ${params.role}</p>
            <p><strong>Location:</strong> ${params.city || ""}, ${params.state || ""}, ${params.country || "India"}</p>
            ${params.pincode ? `<p><strong>PIN Code:</strong> ${params.pincode}</p>` : ""}
            ${params.preferredDate ? `<p><strong>Preferred Slot:</strong> ${params.preferredDate} ${params.preferredTime || ""} IST</p>` : ""}
            ${params.message ? `<p><strong>Message:</strong> ${params.message}</p>` : ""}
          </div>
        `,
      }),
    });
    return { success: true, mode: "PRODUCTION" };
  } catch (err) {
    console.error("[Email Exception] Admin notification failed:", err);
    return { success: false, mode: "PRODUCTION" };
  }
}
