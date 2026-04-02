import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

// GET /api/attractions/:id
export async function GET(req, { params }) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("attractions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Attraction not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PUT /api/attractions/:id
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { name, detail, coverimage, latitude, longitude } = body;

    const { data, error } = await supabase
      .from("attractions")
      .update({
        name,
        detail,
        coverimage,
        latitude,
        longitude,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE /api/attractions/:id
export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    const { error } = await supabase
      .from("attractions")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}