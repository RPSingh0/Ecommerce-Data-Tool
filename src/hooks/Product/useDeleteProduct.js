import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteProductService} from "../../services/productService.js";

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    const {mutate: deleteProduct, isPending: isDeleting} = useMutation({
        mutationFn: deleteProductService,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            })
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return {isDeleting, deleteProduct};
}