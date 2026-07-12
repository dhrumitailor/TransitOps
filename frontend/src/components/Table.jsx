function Table({ columns = [], data = [] }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">

        <thead className="table-dark">
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
  {data.length > 0 ? (
    data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, cellIndex) => (
          <td key={cellIndex}>
            {cell}
          </td>
        ))}
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={columns.length}
        className="text-center text-muted"
      >
        No Data Available
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
}

export default Table;