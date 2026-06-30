-- Status enum
DO $$ BEGIN
  CREATE TYPE public.order_status AS ENUM ('new','confirmed','preparing','out_for_delivery','delivered','cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Column
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS status public.order_status NOT NULL DEFAULT 'new';

-- Allow UPDATE only for admins (staff can read but not change status)
GRANT UPDATE (status) ON public.orders TO authenticated;

DROP POLICY IF EXISTS "Admins can update order status" ON public.orders;
CREATE POLICY "Admins can update order status"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));