export function averageRating(entries: { rating: string }[]): number | null {
  const ratings = entries.map((entry) => Number(entry.rating))
  return ratings.length ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : null
}

export function totalSpent(entries: { price: string }[]): number {
  return entries.reduce((sum, entry) => sum + Number(entry.price), 0)
}

export function formatRating(rating: number | null): string {
  return rating === null ? "–" : rating.toFixed(1)
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`
}

export function dayLabel(iso: string): string {
  const today = new Date().setHours(0, 0, 0, 0)
  const day = new Date(iso).setHours(0, 0, 0, 0)
  const daysAgo = Math.round((today - day) / 86_400_000)
  if (daysAgo === 0) return "Today"
  if (daysAgo === 1) return "Yesterday"
  return new Date(iso).toLocaleDateString("en-NZ", {
    weekday: "long",
    day: "numeric",
    month: "short",
  })
}

export function formatWhen(iso: string): string {
  return new Date(iso).toLocaleString("en-NZ", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  })
}
