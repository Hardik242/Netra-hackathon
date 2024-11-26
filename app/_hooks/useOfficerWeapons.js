import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import {getOfficerWeapons} from "../_services/dataFunctions";

const PAGE_SIZE = 5;

export default function useOfficerWeapons(id) {
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    //PAGINATION
    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    //QUERY
    const {isLoading, data: {data: weapons, count} = {}} = useQuery({
        queryKey: ["weapons", page],
        queryFn: () => getOfficerWeapons(id, page),
        staleTime: 5 * 60 * 1000,
    });

    //PREFETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["weapons", page + 1],
            queryFn: () => getOfficerWeapons(id, page + 1),
            staleTime: 5 * 60 * 1000,
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["weapons", page - 1],
            queryFn: () => getOfficerWeapons(id, page - 1),
            staleTime: 5 * 60 * 1000,
        });

    return {isLoading, weapons, count, page};
}
