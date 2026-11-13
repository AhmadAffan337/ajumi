import { NextRequest, NextResponse } from "next/server";
import { getAllSeoData, updateSeoEntry, type PageSEOData } from "@/lib/seoStore";
import { revalidatePath } from "next/cache";

/** GET /api/seo — returns all SEO data */
export async function GET() {
  try {
    const data = getAllSeoData();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to read SEO data" }, { status: 500 });
  }
}

/** POST /api/seo — update one page's SEO entry */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PageSEOData;
    if (!body.id) {
      return NextResponse.json({ error: "Missing page id" }, { status: 400 });
    }
    updateSeoEntry(body);

    // Revalidate the page on-demand to purge Next.js static cache
    if (body.path) {
      revalidatePath(body.path);
    }

    return NextResponse.json({ ok: true, id: body.id });
  } catch (err) {
    return NextResponse.json({ error: "Failed to write SEO data" }, { status: 500 });
  }
}
