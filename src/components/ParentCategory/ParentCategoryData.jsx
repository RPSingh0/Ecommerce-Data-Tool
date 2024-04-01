import {useQuery} from "@tanstack/react-query";
import {getAllParentCategories} from "../../services/parentCategoryService.js";
import {getFormattedDate} from "../../utilities/utils.js";
import {useDeleteParentCategory} from "../../hooks/ParentCategory/useDeleteParentCategory.js";
import toast from "react-hot-toast";
import {
    DataTable,
    DataTableRow,
    DataTableRowCell,
    DeleteEntryButton,
    TableParentContainer
} from "../DataForms/TableComponents.jsx";

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
        <TableParentContainer>
            <DataTable tableHeaders={["Parent Categories", "MongoId", "Created On", "Actions"]}>
                {!isLoading && data.data.parentCategories.map((row) => (
                    <DataTableRow keyId={row._id} key={row._id}>
                        <DataTableRowCell cellData={row.name}/>
                        <DataTableRowCell cellData={row._id}/>
                        <DataTableRowCell cellData={getFormattedDate(row.createdOn)}/>
                        <DataTableRowCell cellData={
                            <DeleteEntryButton
                                handleDelete={handleDeleteParentCategory}
                                identifier={row._id}
                                disabled={isDeleting}
                            />}
                        />
                    </DataTableRow>
                ))}
            </DataTable>
        </TableParentContainer>
    );
}

export default ParentCategoryData;