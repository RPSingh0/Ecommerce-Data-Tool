import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {getAllParentCategories} from "../../services/parentCategoryService.js";
import {getFormattedDate} from "../../utilities/utils.js";
import {Delete} from "@mui/icons-material";
import {useDeleteParentCategory} from "../../hooks/ParentCategory/useDeleteParentCategory.js";
import toast from "react-hot-toast";

function ParentCategoryData() {

    const {isLoading, data} = useQuery({
        queryKey: ['parentCategories'],
        queryFn: getAllParentCategories
    });

    const {isDeleting, deleteParentCategory} = useDeleteParentCategory();

    function handleDeleteParentCategory(id) {
        deleteParentCategory({id: id}, {
            onSuccess: () => {
                toast.success('Deleted parent category');
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
                            <TableCell>Parent Categories</TableCell>
                            <TableCell>MongoId</TableCell>
                            <TableCell>CreatedOn</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!isLoading && data.data.parentCategories.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row._id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {getFormattedDate(row.createdOn)}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Button variant={"outlined"} startIcon={<Delete/>} disabled={isDeleting}
                                            onClick={() => handleDeleteParentCategory(row._id)}>
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

export default ParentCategoryData;