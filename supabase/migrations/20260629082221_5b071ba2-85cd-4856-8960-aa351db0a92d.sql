ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS bouquet text;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_bouquet_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_bouquet_check CHECK (bouquet IS NULL OR char_length(bouquet) <= 200);