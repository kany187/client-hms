import _ from 'lodash';

const Paginate = (items: any, pageNumber: number, pageSize: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
   return _(items).slice(startIndex).take(pageSize).value()
    
}
  // const [pageSize, setPageSize] = useState(10);
  // const [currentPage, setCurrentPage] = useState(1);

  // const staff = Paginate(data, currentPage, pageSize);

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

      {/* <Pagination
        itemsCount={data?.length ?? 0}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      /> */}
export default Paginate;