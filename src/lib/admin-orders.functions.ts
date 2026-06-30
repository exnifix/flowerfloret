import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const ORDER_STATUSES = [
  "new",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const listAdminOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;

    const { data, error } = await supabase
      .from("orders")
      .select(
        "id, created_at, name, email, phone, address, instagram, bouquet, occasion, payment_method, message, status, status_updated_at, status_updated_by",
      )
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: OrderStatus }) => {
    if (!input?.id || typeof input.id !== "string") {
      throw new Error("Missing order id");
    }
    if (!ORDER_STATUSES.includes(input.status)) {
      throw new Error("Invalid status");
    }
    return input;
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    // App-layer guard. RLS also enforces admin-only UPDATE.
    const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (roleError) throw new Error(roleError.message);
    if (!isAdmin) throw new Error("Forbidden: admin role required");

    const { data: updated, error } = await supabase
      .from("orders")
      .update({ status: data.status })
      .eq("id", data.id)
      .select("id, status")
      .single();

    if (error) throw new Error(error.message);
    return updated;
  });
