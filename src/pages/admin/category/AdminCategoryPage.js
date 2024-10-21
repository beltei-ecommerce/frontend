import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TablePagination,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AdminHeader from "../../../components/AdminHeader.js";

const headers = [
  { id: "id", label: "N°", minWidth: 10 },
  { id: "name", label: "Name", minWidth: 500 },
  { id: "number_of_products", label: "Number of products", minWidth: 10 },
  {
    id: "created_at",
    label: "Created On",
    minWidth: 20,
    format: (value) => new Date(value).toLocaleDateString(),
  },
];

export default function AdminCategoryPage() {
  // React hook (Use when page first rendered)
  useEffect(() => {
    loadCategories({ page, rowsPerPage }); // eslint-disable-next-line
  }, []);

  // Variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CategoryStore = useSelector((store) => store.Category);
  const { categories } = CategoryStore;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Methods
  async function loadCategories({ page, rowsPerPage }) {
    const {
      data: { count },
    } = await dispatch.Category.getCategories({
      page: page + 1,
      limit: rowsPerPage,
    });
    setTotalCount(count);
  }

  function goToEdit(id = null) {
    if (!id) {
      return navigate("/admin/category/create");
    }
    return navigate(`/admin/category/${id}`);
  }
  async function onChangePage(_, newPage) {
    setPage(newPage);
    await loadCategories({ page: newPage, rowsPerPage });
  }
  async function onChangeRowsPerPage(_, { props }) {
    setRowsPerPage(props.value);
    setPage(0);
    await loadCategories({ page: 0, rowsPerPage: props.value });
  }

  return (
    <div>
      <Box component="main" sx={{ marginLeft: "4rem", p: 2 }}>
        <AdminHeader
          title="Brands"
          onCreate={() => {
            goToEdit();
          }}
        />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "78vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {headers.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      onClick={() => goToEdit(row.id)}
                    >
                      {headers.map((column) => {
                        const value = column.id
                          .split(".")
                          .reduce((o, i) => o?.[i], row);
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && value
                              ? column.format(value)
                              : value}
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
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}
