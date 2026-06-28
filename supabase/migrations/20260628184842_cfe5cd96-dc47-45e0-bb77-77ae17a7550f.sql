DROP POLICY "Anyone can submit an order" ON public.orders;
CREATE POLICY "Anyone can submit an order" ON public.orders FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 200
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (phone IS NULL OR char_length(phone) <= 40)
  AND (occasion IS NULL OR char_length(occasion) <= 200)
  AND (message IS NULL OR char_length(message) <= 4000)
);