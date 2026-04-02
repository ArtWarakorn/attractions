import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

// GET /api/attractions -> Read all
export async function GET() {
  const { data, error } = await supabase
    .from("attractions")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/attractions -> Create
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, detail, coverimage, latitude, longitude } = body;

    const { data, error } = await supabase
      .from("attractions")
      .insert([{ name, detail, coverimage, latitude, longitude }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}