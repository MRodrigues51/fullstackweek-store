import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Shapes } from 'lucide-react'


export default function CatalogLoading() {
    return (
      <div className="flex flex-col gap-8 p-5">
        <Badge className=" w-fit gap-1 border-primary border-2 text-base uppercase px-3 py-[0.375rem]" variant="outline">
          <Shapes size={16} />
          Catálogo
        </Badge>
  
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
          {[...Array(6)].map((x, i) => (
            <Skeleton
              className="flex h-[200px] w-full rounded-tl-lg rounded-tr-lg bg-accent"
              key={i}
            />
          ))}
        </div>
      </div>
    )
  }