import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {getFormattedDate} from "../../utilities/utils.js";
import {Delete} from "@mui/icons-material";
import toast from "react-hot-toast";
import {getAllSubCategories} from "../../services/subCategoryService.js";
import {useDeleteSubCategory} from "../../hooks/SubCategory/useDeleteSubCategory.js";

function SubCategoryData() {

    const {isLoading, data, error} = useQuery({
        queryKey: ['subCategories'],
        queryFn: getAllSubCategories
    });

    const {isDeleting, deleteSubCategory} = useDeleteSubCategory();

    function handleDeleteSubCategory(id) {
        deleteSubCategory({id: id}, {
            onSuccess: () => {
                toast.success('Deleted sub category');
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
                            <TableCell>Sub Categories</TableCell>
                            <TableCell>Parent Categories</TableCell>
                            <TableCell>MongoId</TableCell>
                            <TableCell>CreatedOn</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!isLoading && !error && data.data.subCategories.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.parentCategory.map(item => item.name).join(", ")}
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

export default SubCategoryData;