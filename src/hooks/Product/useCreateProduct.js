import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createProductService} from "../../services/productService.js";

export function useCreateProduct() {
    const queryClient = useQueryClient();

    const {mutate: createProduct, isPending: isCreating} = useMutation({
        mutationFn: createProductService,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            })
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return {isCreating, createProduct};
}