import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createParentCategoryService} from "../../services/parentCategoryService.js";

export function useCreateParentCategory() {
    const queryClient = useQueryClient();

    const {mutate: createParentCategory, isPending: isCreating} = useMutation({
        mutationFn: createParentCategoryService,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["parentCategories"]
            })
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return {isCreating, createParentCategory};
}