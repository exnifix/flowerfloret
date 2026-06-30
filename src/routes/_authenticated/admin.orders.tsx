import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  listAdminOrders,
  updateOrderStatus,
  bulkUpdateOrderStatus,
  ORDER_STATUSES,
  type OrderStatus,
} from "@/lib/admin-orders.functions";
import { OrderDetailsDrawer } from "@/components/admin/OrderDetailsDrawer";


export const Route = createFileRoute("/_authenticated/admin/orders")({
  head: () => ({
    meta: [
      { title: "Orders — Floret admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminOrdersPage,
});

type Order = Awaited<ReturnType<typeof listAdminOrders>>[number];

const STATUS_LABEL: Record<OrderStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_STYLE: Record<OrderStatus, string> = {
  new: "bg-blush-soft text-ink",
  confirmed: "bg-amber-100 text-amber-900",
  preparing: "bg-blue-100 text-blue-900",
  out_for_delivery: "bg-indigo-100 text-indigo-900",
  delivered: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-red-100 text-red-900",
};

function AdminOrdersPage() {
  const fetchOrders = useServerFn(listAdminOrders);
  const updateStatus = useServerFn(updateOrderStatus);
  const bulkUpdate = useServerFn(bulkUpdateOrderStatus);
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<OrderStatus>("confirmed");

  const { data, isLoading, error, refetch, isFetching } = useQuery({

    queryKey: ["admin", "orders"],
    queryFn: () => fetchOrders(),
  });

  const mutation = useMutation({
    mutationFn: (vars: { id: string; status: OrderStatus }) =>
      updateStatus({ data: vars }),
    onMutate: ({ id, status }) => {
      const prev = queryClient.getQueryData<Order[]>(["admin", "orders"]);
      const stampedAt = new Date().toISOString();
      queryClient.setQueryData<Order[]>(["admin", "orders"], (old) =>
        (old ?? []).map((o) =>
          o.id === id ? { ...o, status, status_updated_at: stampedAt } : o,
        ),
      );
      return { prev };
    },
    onError: (err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["admin", "orders"], ctx.prev);
      toast.error(err instanceof Error ? err.message : "Couldn't update status");
    },
    onSuccess: (_data, vars) => {
      toast.success(`Status set to ${STATUS_LABEL[vars.status]}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
  });

  const bulkMutation = useMutation({
    mutationFn: (vars: { ids: string[]; status: OrderStatus }) =>
      bulkUpdate({ data: vars }),
    onMutate: ({ ids, status }) => {
      const prev = queryClient.getQueryData<Order[]>(["admin", "orders"]);
      const stampedAt = new Date().toISOString();
      const idSet = new Set(ids);
      queryClient.setQueryData<Order[]>(["admin", "orders"], (old) =>
        (old ?? []).map((o) =>
          idSet.has(o.id) ? { ...o, status, status_updated_at: stampedAt } : o,
        ),
      );
      return { prev };
    },
    onError: (err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["admin", "orders"], ctx.prev);
      toast.error(err instanceof Error ? err.message : "Bulk update failed");
    },
    onSuccess: (res, vars) => {
      toast.success(`Updated ${res.count} order${res.count === 1 ? "" : "s"} → ${STATUS_LABEL[vars.status]}`);
      setCheckedIds(new Set());
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
  });

  const orders = data ?? [];
  const selected = useMemo(
    () => orders.find((o) => o.id === selectedId) ?? null,
    [orders, selectedId],
  );
  const allChecked = orders.length > 0 && checkedIds.size === orders.length;
  const someChecked = checkedIds.size > 0 && !allChecked;

  function toggleOne(id: string) {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAll() {
    setCheckedIds(allChecked ? new Set() : new Set(orders.map((o) => o.id)));
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
    router.invalidate();
  }

  function openOrder(id: string) {
    setSelectedId(id);
    setDrawerOpen(true);
  }


  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-border bg-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <Link to="/" className="font-serif text-xl text-ink">Floret</Link>
            <span className="ml-3 text-xs uppercase tracking-widest text-muted-foreground">Admin · Orders</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="rounded-full border border-border px-4 py-1.5 text-xs hover:bg-blush-soft disabled:opacity-60"
            >
              {isFetching ? "Refreshing…" : "Refresh"}
            </button>
            <button
              onClick={signOut}
              className="rounded-full bg-ink text-cream px-4 py-1.5 text-xs hover:bg-ink/90"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading orders…</p>
        ) : error ? (
          <ErrorState message={error instanceof Error ? error.message : "Failed to load"} />
        ) : orders.length === 0 ? (
          <EmptyState />
        ) : (
          <OrdersTable orders={orders} selectedId={selectedId} onSelect={openOrder} />
        )}
      </main>

      <OrderDetailsDrawer
        order={selected}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onStatusChange={(id, status) => mutation.mutate({ id, status })}
        isUpdating={mutation.isPending}
      />
    </div>
  );
}

function OrdersTable({
  orders,
  selectedId,
  onSelect,
}: {
  orders: Order[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-blush-soft/50 text-left text-xs uppercase tracking-wider text-ink/70">
          <tr>
            <th className="px-4 py-3">When</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Bouquet</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => {
            const active = o.id === selectedId;
            const status = (o.status ?? "new") as OrderStatus;
            return (
              <tr
                key={o.id}
                onClick={() => onSelect(o.id)}
                className={`cursor-pointer border-t border-border/60 transition-colors ${
                  active ? "bg-blush-soft/40" : "hover:bg-cream"
                }`}
              >
                <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(o.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-ink">{o.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {maskEmailInline(o.email)}
                  </div>
                </td>
                <td className="px-4 py-3 text-ink">{o.bouquet ?? "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLE[status]}`}
                  >
                    {STATUS_LABEL[status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(o.id);
                    }}
                    className="rounded-full border border-border px-3 py-1 text-[11px] hover:bg-blush-soft"
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function maskEmailInline(email: string | null | undefined) {
  if (!email) return "—";
  const [name, domain] = email.split("@");
  if (!domain) return "•••";
  return `${name.slice(0, 2)}${"•".repeat(Math.max(1, name.length - 2))}@${domain}`;
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-white/60 p-10 text-center">
      <p className="font-serif text-2xl text-ink">No orders yet</p>
      <p className="mt-2 text-sm text-muted-foreground">
        When customers place an order, it'll appear here. If you expected orders and see none,
        confirm your account has the <code>admin</code> or <code>staff</code> role.
      </p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
      <p className="font-medium text-red-800">Couldn't load orders</p>
      <p className="mt-1 text-sm text-red-700">{message}</p>
      <p className="mt-2 text-xs text-red-700/80">
        If this says "Unauthorized", sign in again. If it loads but is empty, your account may not have the admin role yet.
      </p>
    </div>
  );
}
