function Pagination({ activePage, setActivePage, totalPageCount }) {
  const pages = [];
  pages.push(
    <li key={-1} onClick={() => setActivePage(1)} className="controlLI">
      &lsaquo;
    </li>
  );
  for (let i = 1; i <= totalPageCount; i++) {
    pages.push(
      <li
        onClick={() => {
          setActivePage(i);
        }}
        className={i === activePage ? "active" : ""}
        key={i}
      >
        {i}
      </li>
    );
  }
  pages.push(
    <li
      key={-2}
      onClick={() => setActivePage(totalPageCount)}
      className="controlLI"
    >
      &rsaquo;
    </li>
  );
  return <ul className="pagination">{pages}</ul>;
}
export default Pagination;
