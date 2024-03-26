import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {getFormattedDate} from "../../utilities/utils.js";
import {Delete} from "@mui/icons-material";
import toast from "react-hot-toast";
import {getAllProductService} from "../../services/productService.js";
import {useDeleteProduct} from "../../hooks/Product/useDeleteProduct.js";

function ProductData() {

    const {isLoading, data, error} = useQuery({
        queryKey: ['products'],
        queryFn: getAllProductService
    });

    const {isDeleting, deleteProduct} = useDeleteProduct();

    function handleDeleteSubCategory(id) {
        deleteProduct({id: id}, {
            onSuccess: () => {
                toast.success('Deleted product');
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    }

    return (
        <Box sx={{
            overflow: "auto"
        }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Parent Category</TableCell>
                            <TableCell>Sub Category</TableCell>
                            <TableCell>Mongo Id</TableCell>
                            <TableCell>Created On</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!isLoading && !error && data.data.products.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.description}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.price}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.parentCategory.map(item => item.name).join(", ")}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.subCategory.map(item => item.name).join(", ")}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row._id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {getFormattedDate(row.createdOn)}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Button variant={"outlined"} startIcon={<Delete/>} disabled={isDeleting}
                                            onClick={() => handleDeleteSubCategory(row._id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ProductData;