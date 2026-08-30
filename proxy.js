import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// Chequeo OPTIMISTA de sesión para /panel/*. Esto NO es la única capa de
// seguridad: la autorización real (rol, cuenta activa) vive en lib/dal.js y
// se re-verifica en cada Server Component/Action/Route Handler protegido —
// el matcher de este proxy no cubre llamadas directas a Server Actions.
export async function proxy(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const esLogin = pathname === "/panel/login";

  if (!user && !esLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/panel/login";
    return NextResponse.redirect(url);
  }

  if (user && esLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/panel/leads";
    return NextResponse.redirect(url);
  }

  // El panel nunca debe indexarse — refuerzo además de robots.js.
  response.headers.set("X-Robots-Tag", "noindex");

  return response;
}

export const config = {
  matcher: ["/panel/:path*"],
};
