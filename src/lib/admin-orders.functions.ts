import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listAdminOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;

    // RLS on `orders` only allows SELECT for admin/staff via has_role();
    // if the caller isn't admin/staff this query returns an empty list.
    const { data, error } = await supabase
      .from("orders")
      .select(
        "id, created_at, name, email, phone, address, instagram, bouquet, occasion, payment_method, message",
      )
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      throw new Error(error.message);
    }
    return data ?? [];
  });
