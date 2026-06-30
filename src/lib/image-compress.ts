/** Client-side image compression to a base64 JPEG data URL. */
const MAX_IMAGE_BYTES = 600_000; // ~600 KB
const MAX_DIM = 1280;

export async function compressImage(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = dataUrl;
  });

  let { width, height } = img;
  if (width > MAX_DIM || height > MAX_DIM) {
    const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, width, height);

  for (const quality of [0.8, 0.65, 0.5, 0.4, 0.3]) {
    const out = canvas.toDataURL("image/jpeg", quality);
    if (out.length <= MAX_IMAGE_BYTES) return out;
  }
  throw new Error("Image too large — please choose a smaller photo.");
}
