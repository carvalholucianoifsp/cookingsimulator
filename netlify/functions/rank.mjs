import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("ranking");
  const H = { "content-type": "application/json", "cache-control": "no-store" };
  const read = async () => (await store.get("lista", { type: "json" })) || [];

  if (req.method === "GET") return new Response(JSON.stringify(await read()), { headers: H });

  if (req.method === "POST") {
    let b;
    try { b = await req.json(); } catch { return new Response("{}", { status: 400, headers: H }); }
    const n = String(b.n || "").trim().slice(0, 16), l = Number(b.l), m = Number(b.m);
    if (!n || !Number.isFinite(l) || Math.abs(l) > 5000 || ![3, 4, 5].includes(m))
      return new Response("{}", { status: 400, headers: H });
    const e = { id: Date.now() + Math.random().toString(36).slice(2, 6), n, l: Math.round(l * 100) / 100, m };
    const r = await read();
    r.push(e);
    r.sort((a, c) => c.l - a.l);
    await store.setJSON("lista", r.slice(0, 100));
    return new Response(JSON.stringify(e), { headers: H });
  }

  if (req.method === "DELETE") {
    const senha = Netlify.env.get("RESET_PASSWORD") || "ifsp2026";
    if (req.headers.get("x-password") !== senha) return new Response("{}", { status: 401, headers: H });
    await store.setJSON("lista", []);
    return new Response("{}", { headers: H });
  }
  return new Response("{}", { status: 405, headers: H });
};

export const config = { path: "/api/rank" };
