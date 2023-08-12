import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
  const {paginationStore} = useContext(Context);
  const pageCount = Math.ceil(paginationStore.totalCount / paginationStore.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination className={"mt-2"}>
      {pages.map(page =>
        <Pagination.Item
          key={page}
          active={paginationStore.page === page}
          onClick={() => paginationStore.setPage(page)}
        >
          {page}
        </Pagination.Item>
      )}
    </Pagination>
  );
});

export default Pages;