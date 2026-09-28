'use client'

import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { startTransition, useEffect, useState } from "react"
import {useDebounce} from 'use-debounce'
export default function Search() {
    const [search, setSearch] = useState<string>("")
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter()
    const [value ] = useDebounce(search, 1000)

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", search);
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    }

    useEffect(()=> {
        handleSearch()
    }, [value])

    return <Input value={search} onChange={(e) => setSearch(e.target.value)} />
}