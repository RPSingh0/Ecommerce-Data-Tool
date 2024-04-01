import {useQuery} from "@tanstack/react-query";
import {getFormattedDate} from "../../utilities/utils.js";
import toast from "react-hot-toast";
import {getAllSubCategories} from "../../services/subCategoryService.js";
import {useDeleteSubCategory} from "../../hooks/SubCategory/useDeleteSubCategory.js";
import {
    DataTable,
    DataTableRow,
    DataTableRowCell,
    DeleteEntryButton,
    TableParentContainer
} from "../DataForms/TableComponents.jsx";

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
        <TableParentContainer>
            <DataTable tableHeaders={["Sub Categories", "Cover Image", "Parent Categories", "MongoId", "Created On", "Actions"]}>

                {!isLoading && !error && data.data.subCategories.map((row) => (
                    <DataTableRow keyId={row._id} key={row._id}>
                        <DataTableRowCell cellData={row.name}/>
                        <DataTableRowCell cellData={<img src={row.coverImage} height={30}/> }/>
                        <DataTableRowCell cellData={row.parentCategory.map(item => item.name).join(", ")}/>
                        <DataTableRowCell cellData={row._id}/>
                        <DataTableRowCell cellData={getFormattedDate(row.createdOn)}/>
                        <DataTableRowCell cellData={
                            <DeleteEntryButton
                                handleDelete={handleDeleteSubCategory}
                                identifier={row._id}
                                disabled={isDeleting}
                            />
                        }/>
                    </DataTableRow>
                ))}
            </DataTable>
        </TableParentContainer>
    );
}

export default SubCategoryData;