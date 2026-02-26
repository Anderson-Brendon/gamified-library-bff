import { Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";


export function PaginationMUI({ totalPages, currentPage }: { totalPages: number, currentPage: number }) {

  return (<Pagination renderItem={item =>
    <PaginationItem component={Link} href={`?page=${item.page! - 1}`} {...item} />
  } page={currentPage + 1} count={totalPages} variant="outlined" color="secondary" />)
}

export default function MyPagination({ totalPages, currentPage }: { totalPages: number, currentPage: number }) {

  const paginationLinks = [];

  for (let index = 0; index < totalPages; index++) {
    paginationLinks.push(
      <li key={index}>
        <Link href={`?page=${index}`} 
        className={`${index == currentPage ? "pointer-events-none bg-green-600" : "hover:text-white hover:bg-black"} text-black block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors`}>
          {index + 1}
        </Link>
      </li>)
  }

  return (
    <ul className="bg-gray flex justify-center gap-1 text-gray-900">
        {paginationLinks}
    </ul>
  )
}

//<Pagination count={10} />