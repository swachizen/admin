import { createClient } from "@supabase/supabase-js";

const clients = new Map();

export function createProjectClient(
  supabaseUrl: string,
  supabaseAnonKey: string
) {
  const key = `${supabaseUrl}-${supabaseAnonKey}`;

  if (clients.has(key)) {
    return clients.get(key);
  }

  const client = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );

  clients.set(key, client);

  return client;
}
