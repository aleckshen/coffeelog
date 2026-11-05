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
