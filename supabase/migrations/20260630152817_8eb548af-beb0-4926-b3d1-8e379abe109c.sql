ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS status_updated_at timestamptz,
  ADD COLUMN IF NOT EXISTS status_updated_by uuid;

-- Auto-stamp on any status change (covers app + future SQL updates)
CREATE OR REPLACE FUNCTION public.stamp_order_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.status_updated_at := now();
    NEW.status_updated_by := auth.uid();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_stamp_order_status_change ON public.orders;
CREATE TRIGGER trg_stamp_order_status_change
  BEFORE UPDATE OF status ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.stamp_order_status_change();

-- Allow the trigger to write the audit columns through the admin UPDATE path
GRANT UPDATE (status, status_updated_at, status_updated_by) ON public.orders TO authenticated;