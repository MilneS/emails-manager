import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootSate } from "@/appStore/store";
import { SavedTemplate } from "@/appStore/interface/interface.model";
import { useEffect, useState } from "react";

interface Column {
  id: "title" | "description";
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: "title", label: "Title", minWidth: 50 },
  {
    id: "description",
    label: "Description",
    minWidth: 50,
  },
];

export default function TemplateTable() {
  const [rows, setRows] = useState<{ title: string; description: string }[]>(
    []
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const allTemplates: SavedTemplate[] | [] = useSelector(
    (state: RootSate) => state.cardsReducer.allTemplates
  );
  const rowsHandler = () => {
    const list: { title: string; description: string }[] = [];
    allTemplates.forEach((template) => {
      if (template.emailTitle) {
        const line = {
          title: template.emailTitle,
          description: "N/A",
        };
        list.push(line);
      }
    });
    setRows(list);
  };
  useEffect(() => {
    rowsHandler();
  }, [allTemplates]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "60%", overflow: "hidden", margin: "4rem" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography sx={{ fontWeight: "800" }}>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.title}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id}>
                          <Typography variant="body2">{value}</Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
