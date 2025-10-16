import { authOptions } from "./authOptions";

async function getHandler() {
  const NextAuthModule = await import('next-auth');
  const NextAuthFn = (NextAuthModule as any).default || NextAuthModule;
  return NextAuthFn(authOptions as any);
}

export async function GET(request: Request) {
  const h = await getHandler();
  const url = new URL(request.url || "http://localhost");

  // build minimal Node-like req object expected by next-auth
  const req: any = {
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers),
    body: undefined,
    query: {},
  };

  // Populate body for non-GET
  if (request.method !== "GET") {
    try {
      const txt = await request.text();
      req.body = txt ? JSON.parse(txt) : undefined;
    } catch (e) {
      req.body = undefined;
    }
  }

  // build nextauth route segments from pathname after /api/auth/
  const parts = url.pathname.split("/api/auth/");
  const nextauth = parts.length > 1 ? parts[1].split("/").filter(Boolean) : [];
  req.query.nextauth = nextauth;

  // minimal res object that collects status and headers and returns a Response
  const res: any = {
    statusCode: 200,
    headers: {},
    getHeader(name: string) {
      return this.headers[name.toLowerCase()];
    },
    setHeader(name: string, value: any) {
      this.headers[name.toLowerCase()] = value;
    },
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    end(body?: any) {
      const init: any = { status: this.statusCode || 200, headers: this.headers };
      if (body instanceof Buffer) body = body.toString();
      if (typeof body === "object") {
        return new Response(JSON.stringify(body), init);
      }
      return new Response(body?.toString() || null, init);
    },
    send(body?: any) {
      return this.end(body);
    },
  };

  return await h(req, res);
}

export async function POST(request: Request) {
  const h = await getHandler();
  const url = new URL(request.url || "http://localhost");

  const req: any = {
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers),
    body: undefined,
    query: {},
  };

  try {
    const txt = await request.text();
    req.body = txt ? JSON.parse(txt) : undefined;
  } catch (e) {
    req.body = undefined;
  }

  const parts = url.pathname.split("/api/auth/");
  const nextauth = parts.length > 1 ? parts[1].split("/").filter(Boolean) : [];
  req.query.nextauth = nextauth;

  const res: any = {
    statusCode: 200,
    headers: {},
    getHeader(name: string) {
      return this.headers[name.toLowerCase()];
    },
    setHeader(name: string, value: any) {
      this.headers[name.toLowerCase()] = value;
    },
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    end(body?: any) {
      const init: any = { status: this.statusCode || 200, headers: this.headers };
      if (body instanceof Buffer) body = body.toString();
      if (typeof body === "object") {
        return new Response(JSON.stringify(body), init);
      }
      return new Response(body?.toString() || null, init);
    },
    send(body?: any) {
      return this.end(body);
    },
  };

  return await h(req, res);
}