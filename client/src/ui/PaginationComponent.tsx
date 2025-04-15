import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../lib/consts";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

interface PaginationComponentProps {
  total: number;
}

function PaginationComponent({ total }: PaginationComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pages = Math.ceil(total / ITEMS_PER_PAGE);

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", String(prev));
    setSearchParams(searchParams);
  }

  function nextPage() {
    const next = currentPage === pages ? currentPage : currentPage + 1;

    searchParams.set("page", String(next));
    setSearchParams(searchParams);
  }

  function handlePage(page: number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  if (pages <= 1 || !total) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="cursor-pointer" onClick={prevPage} />
        </PaginationItem>
        {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => handlePage(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick={nextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationComponent;
