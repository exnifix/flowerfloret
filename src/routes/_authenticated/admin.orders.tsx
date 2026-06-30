import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  listAdminOrders,
  updateOrderStatus,
  ORDER_STATUSES,
  type OrderStatus,
} from "@/lib/admin-orders.functions";

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
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: () => fetchOrders(),
  });

  const mutation = useMutation({
    mutationFn: (vars: { id: string; status: OrderStatus }) =>
      updateStatus({ data: vars }),
    onMutate: ({ id, status }) => {
      const prev = queryClient.getQueryData<Order[]>(["admin", "orders"]);
      queryClient.setQueryData<Order[]>(["admin", "orders"], (old) =>
        (old ?? []).map((o) => (o.id === id ? { ...o, status } : o)),
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

  const orders = data ?? [];
  const selected = useMemo(
    () => orders.find((o) => o.id === selectedId) ?? null,
    [orders, selectedId],
  );

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
    router.invalidate();
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
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <OrdersTable orders={orders} selectedId={selectedId} onSelect={setSelectedId} />
            <OrderDetail
              order={selected}
              onStatusChange={(id, status) => mutation.mutate({ id, status })}
              isUpdating={mutation.isPending}
            />
          </div>
        )}
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLE[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
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
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => {
            const active = o.id === selectedId;
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
                  <div className="text-xs text-muted-foreground">{o.email}</div>
                </td>
                <td className="px-4 py-3 text-ink">{o.bouquet ?? "—"}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={(o.status ?? "new") as OrderStatus} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function OrderDetail({
  order,
  onStatusChange,
  isUpdating,
}: {
  order: Order | null;
  onStatusChange: (id: string, status: OrderStatus) => void;
  isUpdating: boolean;
}) {
  if (!order) {
    return (
      <aside className="rounded-2xl border border-dashed border-border bg-white/60 p-6 text-sm text-muted-foreground">
        Select an order to see the full details and update its status.
      </aside>
    );
  }
  const status = (order.status ?? "new") as OrderStatus;
  return (
    <aside className="rounded-2xl border border-border bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-ink">{order.bouquet ?? "Custom order"}</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Received {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="mt-5 rounded-xl border border-border bg-cream/60 p-4">
        <label
          htmlFor="status-select"
          className="text-xs uppercase tracking-wider text-muted-foreground"
        >
          Update status (admin only)
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {ORDER_STATUSES.map((s) => {
            const isActive = s === status;
            return (
              <button
                key={s}
                type="button"
                disabled={isUpdating || isActive}
                onClick={() => onStatusChange(order.id, s)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors disabled:opacity-60 ${
                  isActive
                    ? "border-ink bg-ink text-cream"
                    : "border-border bg-white text-ink hover:bg-blush-soft"
                }`}
              >
                {STATUS_LABEL[s]}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Only admin accounts can change this. Staff have read-only access.
        </p>
      </div>

      <dl className="mt-5 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-sm">
        <Field label="Name" value={order.name} />
        <Field label="Email" value={order.email} />
        <Field label="Phone" value={order.phone} />
        <Field label="Address" value={order.address} />
        <Field label="Instagram" value={order.instagram} />
        <Field label="Occasion" value={order.occasion} />
        <Field label="Payment" value={order.payment_method} />
      </dl>

      {order.message && (
        <div className="mt-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Message</div>
          <pre className="mt-1 whitespace-pre-wrap rounded-lg bg-cream p-3 font-sans text-sm text-ink">
{order.message}
          </pre>
        </div>
      )}
    </aside>
  );
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground self-center">{label}</dt>
      <dd className="text-ink break-words">{value ?? <span className="text-muted-foreground">—</span>}</dd>
    </>
  );
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
