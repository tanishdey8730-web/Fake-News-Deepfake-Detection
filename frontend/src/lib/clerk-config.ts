/** True when real Clerk keys are set (not placeholders). */
export function isClerkConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
  if (!key) return false;

  const placeholder =
    /your[_-]?key|placeholder|changeme|xxx+|example|insert/i.test(key) ||
    key === "pk_test_your_key_here";

  if (placeholder) return false;

  return /^pk_(test|live)_[A-Za-z0-9]+$/.test(key) && key.length >= 40;
}
