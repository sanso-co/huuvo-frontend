import styled from "@emotion/styled";
import _ from "lodash";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {
  const pageNumberLimit = 3;

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    let pageNumbers: number[] = [];
    if (totalPages < pageNumberLimit + 1) {
      pageNumbers = _.range(2, totalPages + 1);
    }

    if (totalPages > pageNumberLimit + 1) {
      if (currentPage < pageNumberLimit + 1) {
        pageNumbers = _.range(2, pageNumberLimit + 2);
      } else {
        pageNumbers = _.range(currentPage - 1, currentPage + 2);
      }
    }

    return pageNumbers.map((number) => (
      <li key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? "active" : ""}>
        {number}
      </li>
    ));
  };

  const handleClick = (option: string) => {
    if (option === "prev") {
      handlePageChange(currentPage - 1);
    }
    if (option === "next") {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <Container>
      {/* {currentPage > 1 && <button onClick={() => handlePrevNextPage("prev")}>Prev</button>} */}
      {currentPage > 1 && <button onClick={() => handleClick("prev")}>Prev</button>}
      <li className={currentPage === 1 ? "active" : ""} onClick={() => handlePageChange(1)}>
        1
      </li>
      {currentPage > 3 && <li>...</li>}
      {renderPageNumbers()}
      {currentPage < totalPages && <button onClick={() => handleClick("next")}>Next</button>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;

  .active {
    background-color: #222;
    color: #fff;
    border-radius: 0.5rem;
  }

  li {
    font-size: 0.875rem;
    font-weight: 500;
    list-style: none;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }

  button {
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:after {
      content: "";
      position: absolute;
      bottom: 2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #000;
    }
  }
`;

export default Pagination;
