-- Lock down SELECT on orders: no client (anon or authenticated) can read.
-- Order notifications go to the owner via email; service_role bypasses RLS for any future admin tooling.
REVOKE SELECT ON public.orders FROM anon, authenticated;

DROP POLICY IF EXISTS "No client read access to orders" ON public.orders;
CREATE POLICY "No client read access to orders"
  ON public.orders
  FOR SELECT
  TO anon, authenticated
  USING (false);