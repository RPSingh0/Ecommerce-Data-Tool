import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteParentCategoryService} from "../../services/parentCategoryService.js";

export function useDeleteParentCategory() {
    const queryClient = useQueryClient();

    const {mutate: deleteParentCategory, isPending: isDeleting} = useMutation({
        mutationFn: deleteParentCategoryService,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["parentCategories"]
            })
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return {isDeleting, deleteParentCategory};
}