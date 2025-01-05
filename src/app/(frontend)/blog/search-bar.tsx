import { Input } from "../../../components/ui/input"
import { cn } from "../../../lib/utils"

export async function SearchBar({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const query = Array.isArray(sp.q) ? sp.q[0] : sp.q

  return (
    <form method="get" className={cn('flex', 'justify-center')}>
      <Input
        className={cn('max-w-6xl')}
        placeholder="Search"
        id="query"
        name="q"
        defaultValue={query}
      />
    </form>
  )
}
