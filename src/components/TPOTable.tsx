
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { TPOData } from "@/hooks/useTPOData";

interface TPOTableProps {
  tpoData: TPOData[];
  loading: boolean;
}

const TPOTable = ({ tpoData, loading }: TPOTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = tpoData.filter((tpo) =>
    tpo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tpo.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tpo.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Loading TPO data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search by name, college, or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
          className="pl-10 border-2 border-gray-300 focus:border-accent-yellow"
        />
      </div>

      {/* Data Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-primary-dark">Sr No.</TableHead>
              <TableHead className="font-semibold text-primary-dark">Name of Person</TableHead>
              <TableHead className="font-semibold text-primary-dark">Name of College</TableHead>
              <TableHead className="font-semibold text-primary-dark">Email ID</TableHead>
              <TableHead className="font-semibold text-primary-dark">Contact No.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((tpo, index) => (
              <TableRow key={tpo.id} className="hover:bg-gray-50">
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell className="font-medium">{tpo.name}</TableCell>
                <TableCell>{tpo.college}</TableCell>
                <TableCell className="text-secondary-blue">{tpo.email}</TableCell>
                <TableCell>{tpo.contact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? "No TPO records found matching your search." : "No TPO records available. Add some details to get started."}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNumber)}
                      isActive={currentPage === pageNumber}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Results info */}
      <div className="text-sm text-gray-600 text-center">
        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
        {searchTerm && ` (filtered from ${tpoData.length} total entries)`}
      </div>
    </div>
  );
};

export default TPOTable;
