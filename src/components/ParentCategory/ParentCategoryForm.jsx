import {Divider} from "@mui/material";
import {useForm} from "react-hook-form";
import ParentCategoryData from "./ParentCategoryData.jsx";
import {useCreateParentCategory} from "../../hooks/ParentCategory/useCreateParentCategory.js";
import toast from "react-hot-toast";
import FormAndDataContainer from "../DataForms/FormAndDataContainer.jsx";
import Form from "../DataForms/Form.jsx";
import {FormSubmitButton, TextFieldController} from "../DataForms/FormFields.jsx";

function ParentCategoryForm() {

    const {control, handleSubmit, reset, formState: {errors}} = useForm();

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
        <FormAndDataContainer>
            <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
                <TextFieldController
                    control={control}
                    name={"parentCategory"}
                    id={"parentCategory"}
                    label={"Parent Category"}
                    defaultValue={""}
                    requiredMessage={"Please provide a parent category"}
                    disabled={isCreating}
                    error={!!errors.parentCategory}
                    helperText={errors.parentCategory?.message}
                />
                <FormSubmitButton disabled={isCreating} buttonText={"Create"}/>
            </Form>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <ParentCategoryData/>
        </FormAndDataContainer>
    );
}

export default ParentCategoryForm;