import {Box, Button, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import ParentCategoryData from "./ParentCategoryData.jsx";
import {useCreateParentCategory} from "../../hooks/ParentCategory/useCreateParentCategory.js";
import toast from "react-hot-toast";

function ParentCategoryForm() {

    const {register, handleSubmit, reset, formState} = useForm();
    const {errors} = formState;

    const {isCreating, createParentCategory} = useCreateParentCategory();

    function onSubmit(data) {
        createParentCategory({name: data.parentCategory}, {
            onSuccess: () => {
                toast.success('Added parent category!');
                reset();
            },
            onError: (error) => {
                toast.error(`${error.message}`);
            }
        })
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "2rem",
            overflow: "auto",
            padding: "2rem"
        }}>
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "2rem"
            }}>
                <TextField
                    id={"parentCategory"}
                    name={"parentCategory"}
                    variant={"outlined"}
                    label={"Parent Category"}
                    {...register('parentCategory', {
                        required: 'Please provide a parent category'
                    })}
                    error={!!errors.parentCategory}
                    helperText={errors.parentCategory?.message}
                    disabled={isCreating}
                />
                <Button type={"submit"} disabled={isCreating} color={"primary"} variant={"contained"}>
                    Create
                </Button>
            </Box>
            <ParentCategoryData/>
        </Box>
    );
}

export default ParentCategoryForm;