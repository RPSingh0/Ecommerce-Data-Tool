import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteSubCategoryService} from "../../services/subCategoryService.js";

export function useDeleteSubCategory() {
    const queryClient = useQueryClient();

    const {mutate: deleteSubCategory, isPending: isDeleting} = useMutation({
        mutationFn: deleteSubCategoryService,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["subCategories"]
            })
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return {isDeleting, deleteSubCategory};
}