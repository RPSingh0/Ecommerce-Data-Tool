import {useQuery} from "@tanstack/react-query";
import {getFormattedDate} from "../../utilities/utils.js";
import toast from "react-hot-toast";
import {getAllProductService} from "../../services/productService.js";
import {useDeleteProduct} from "../../hooks/Product/useDeleteProduct.js";
import {
    DataTable,
    DataTableRow,
    DataTableRowCell,
    DeleteEntryButton,
    TableParentContainer
} from "../DataForms/TableComponents.jsx";

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
        <TableParentContainer>
            <DataTable
                tableHeaders={["Product Name", "Description", "Keywords", "Price", "Brand", "Cover Image", "Product Images", "Parent Category", "Sub Category", "Actions"]}>
                {!isLoading && !error && data.data.products.map((row) => (
                    <DataTableRow keyId={row._id} key={row._id}>
                        <DataTableRowCell cellData={row.name}/>
                        <DataTableRowCell cellData={row.description}/>
                        <DataTableRowCell cellData={
                            <ul>
                                {row.keywords.map(item => <li>{item}</li>)}
                            </ul>
                        }/>
                        <DataTableRowCell cellData={row.price}/>
                        <DataTableRowCell cellData={row.brand}/>
                        <DataTableRowCell cellData={<img src={row.coverImage} height={30}/>}/>
                        <DataTableRowCell
                            cellData={row.productImages.map(item => <img src={item} height={30} key={item}/>)}/>
                        <DataTableRowCell cellData={row.parentCategory.map(item => item.name).join(", ")}/>
                        <DataTableRowCell cellData={row.subCategory.name}/>
                        {/*<DataTableRowCell cellData={row._id}/>*/}
                        {/*<DataTableRowCell cellData={getFormattedDate(row.createdOn)}/>*/}
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

export default ProductData;