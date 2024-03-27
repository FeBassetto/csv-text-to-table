import { useState, ChangeEvent } from "react";
import Papa from "papaparse";
import "./App.css";

interface CsvData {
  [key: string]: string | null;
}

export function App() {
  const [csvText, setCsvText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tableData, setTableData] = useState<CsvData[]>([]);

  const parseCsv = () => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setTableData(result.data as CsvData[]);
      },
    });
  };

  const handleCsvTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCsvText(event.target.value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredData = searchQuery
    ? tableData.filter((row) =>
        Object.values(row).some((value) =>
          value?.toLowerCase().includes(searchQuery)
        )
      )
    : tableData;

  return (
    <div className="App">
      <textarea
        value={csvText}
        onChange={handleCsvTextChange}
        placeholder="Cole o texto CSV aqui..."
        className="CsvInput"
      />
      <button onClick={parseCsv} className="ParseButton">
        Converter
      </button>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Buscar..."
        className="SearchInput"
      />
      <div className="TableContainer">
        <table>
          <thead>
            <tr>
              {tableData[0] &&
                Object.keys(tableData[0]).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, cellIndex) => (
                  <td key={cellIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
