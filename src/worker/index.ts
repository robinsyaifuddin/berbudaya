import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import {
  exchangeCodeForSessionToken,
  getOAuthRedirectUrl,
  authMiddleware,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
  getCurrentUser,
} from "@getmocha/users-service/backend";
import { getCookie, setCookie } from "hono/cookie";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  MOCHA_USERS_SERVICE_API_URL: string;
  MOCHA_USERS_SERVICE_API_KEY: string;
}

const app = new Hono<{ Bindings: Env }>();

// Serve static assets
app.use("*", serveStatic({ root: "./", manifest: {} }));

// OAuth endpoints
app.get('/api/oauth/google/redirect_url', async (c) => {
  const redirectUrl = await getOAuthRedirectUrl('google', {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  return c.json({ redirectUrl }, 200);
});

app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  if (!body.code) {
    return c.json({ error: "No authorization code provided" }, 400);
  }

  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60, // 60 days
  });

  return c.json({ success: true }, 200);
});

app.get("/api/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

app.get('/api/logout', async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === 'string') {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

// Demo login endpoint
app.post('/api/demo-login', async (c) => {
  try {
    const body = await c.req.json();
    
    if (body.email === 'robinsyaifuddin@gmail.com' && body.password === 'robin123') {
      // Create a fake session token for demo purposes
      const demoSessionToken = 'demo_session_' + Date.now();
      
      // Determine if we're in production or development
      const isProduction = c.req.url.includes('https://');
      
      setCookie(c, 'demo_session', demoSessionToken, {
        httpOnly: true,
        path: "/",
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
        maxAge: 60 * 24 * 60 * 60, // 60 days
      });

      return c.json({ success: true }, 200);
    }

    return c.json({ error: "Invalid credentials" }, 401);
  } catch (error) {
    console.error('Error in demo-login:', error);
    return c.json({ error: "Internal server error", details: String(error) }, 500);
  }
});

// Manual login endpoint
app.post('/api/manual-login', async (c) => {
  const body = await c.req.json();
  
  // Query database for user
  const user = await c.env.DB.prepare(
    "SELECT * FROM users WHERE email = ? AND password_hash = ?"
  ).bind(body.email, `demo_password_${body.password}`).first();

  if (user) {
    // Create a simple session token for manual login
    const sessionToken = 'manual_session_' + Date.now() + '_' + user.id;
    
    // Determine if we're in production or development
    const isProduction = c.req.url.includes('https://');
    
    setCookie(c, 'manual_session', sessionToken, {
      httpOnly: true,
      path: "/",
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      maxAge: 60 * 24 * 60 * 60, // 60 days
    });

    return c.json({ success: true }, 200);
  }

  return c.json({ error: "Invalid credentials" }, 401);
});

// Register endpoint
app.post('/api/register', async (c) => {
  const body = await c.req.json();
  
  try {
    // Check if user already exists
    const existingUser = await c.env.DB.prepare(
      "SELECT id FROM users WHERE email = ?"
    ).bind(body.email).first();

    if (existingUser) {
      return c.json({ error: "User already exists" }, 400);
    }

    // Insert new user
    await c.env.DB.prepare(
      "INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)"
    ).bind(body.email, `demo_password_${body.password}`, body.name).run();

    return c.json({ success: true }, 200);
  } catch (error) {
    return c.json({ error: "Registration failed" }, 500);
  }
});

// Check authentication status
app.get('/api/auth/status', async (c) => {
  const demoSession = getCookie(c, 'demo_session');
  const manualSession = getCookie(c, 'manual_session');
  const mochaSession = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (demoSession) {
    return c.json({ 
      authenticated: true, 
      user: { 
        id: 'demo', 
        email: 'robinsyaifuddin@gmail.com', 
        name: 'Robin Syaifuddin' 
      } 
    });
  }

  if (manualSession) {
    const userId = manualSession.split('_')[2];
    const user = await c.env.DB.prepare(
      "SELECT * FROM users WHERE id = ?"
    ).bind(userId).first();

    if (user) {
      return c.json({ 
        authenticated: true, 
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name 
        } 
      });
    }
  }

  if (mochaSession) {
    try {
      const user = await getCurrentUser(mochaSession, {
        apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
        apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
      });

      if (user) {
        return c.json({ authenticated: true, user });
      }
    } catch (error) {
      // Invalid session, clear cookie
      setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, '', {
        httpOnly: true,
        path: '/',
        sameSite: 'none',
        secure: true,
        maxAge: 0,
      });
    }
  }

  return c.json({ authenticated: false });
});

// Custom logout for demo/manual sessions
app.post('/api/auth/logout', async (c) => {
  // Determine if we're in production or development
  const isProduction = c.req.url.includes('https://');
  
  // Clear all session cookies
  setCookie(c, 'demo_session', '', {
    httpOnly: true,
    path: '/',
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    maxAge: 0,
  });

  setCookie(c, 'manual_session', '', {
    httpOnly: true,
    path: '/',
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    maxAge: 0,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    maxAge: 0,
  });

  return c.json({ success: true });
});

// SPA fallback
app.get("*", serveStatic({ path: "./index.html", manifest: {} }));

export default app;
