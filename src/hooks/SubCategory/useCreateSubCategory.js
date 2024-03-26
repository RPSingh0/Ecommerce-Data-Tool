import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createSubCategoryService} from "../../services/subCategoryService.js";

export function useCreateSubCategory() {
    const queryClient = useQueryClient();

    const {mutate: createSubCategory, isPending: isCreating} = useMutation({
        mutationFn: createSubCategoryService,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["subCategories"]
            })
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return {isCreating, createSubCategory};
}