
DROP POLICY "Anyone can submit a review" ON public.reviews;

CREATE POLICY "Anyone can submit a review"
  ON public.reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND rating BETWEEN 1 AND 5
    AND (comment IS NULL OR char_length(comment) <= 2000)
    AND (image_url IS NULL OR char_length(image_url) <= 800000)
    AND (bouquet_slug IS NULL OR char_length(bouquet_slug) <= 200)
  );
