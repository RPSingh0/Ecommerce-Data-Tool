import {Divider, FormControl, IconButton, Input, MenuItem} from "@mui/material";
import {useForm} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {getAllParentCategories} from "../../services/parentCategoryService.js";
import {useCreateSubCategory} from "../../hooks/SubCategory/useCreateSubCategory.js";
import toast from "react-hot-toast";
import SubCategoryData from "./SubCategoryData.jsx";
import FormAndDataContainer from "../DataForms/FormAndDataContainer.jsx";
import Form from "../DataForms/Form.jsx";
import {
    FormSubmitButton,
    InputFileUploadSingleCoverImage,
    MultiSelectController,
    TextFieldController
} from "../DataForms/FormFields.jsx";
import {CloudUploadOutlined} from "@mui/icons-material";
import {useState} from "react";
import {uploadImageAndGetDownloadUrl} from "../../services/imageUploadService.js";
import {v4} from "uuid";

function SubCategoryForm() {

    const {control, handleSubmit, reset, formState: {errors}} = useForm();
    const [coverImage, setCoverImage] = useState("");

    const {isLoading, data, error} = useQuery({
        queryKey: ['parentCategories'],
        queryFn: getAllParentCategories
    });

    const {isCreating, createSubCategory} = useCreateSubCategory();

    async function onSubmit(data) {

        const uploadingImageToast = toast.loading('Uploading Image...')
        let subCategoryCoverImageURL = null;

        try {
            const path = v4();
            subCategoryCoverImageURL = await uploadImageAndGetDownloadUrl('subCategoryCovers', `${path}-${data.subCategory}/cover`, coverImage);
        } catch (error) {
            toast.error('Image upload failed!');
        } finally {
            toast.dismiss(uploadingImageToast);
            toast.success('Image uploaded!');
        }

        createSubCategory({
            name: data.subCategory,
            coverImage: subCategoryCoverImageURL[0],
            parentCategory: data.parentCategory
        }, {
            onSuccess: () => {
                toast.success("Sub Category added!");
                setCoverImage("")
                reset();
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    }

    return (
        <FormAndDataContainer>
            <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
                <TextFieldController
                    control={control}
                    name={"subCategory"}
                    id={"subCategory"}
                    label={"Sub Category"}
                    defaultValue={""}
                    requiredMessage={"Please enter a sub category"}
                    disabled={isCreating}
                    error={!!errors.subCategory}
                    helperText={errors.subCategory?.message}
                />
                <MultiSelectController
                    control={control}
                    name={"parentCategory"}
                    id={"parentCategory"}
                    label={"Parent Category"}
                    defaultValue={[]}
                    requiredMessage={"Please select a parent category"}
                    disabled={isCreating}
                    error={!!errors.parentCategory}
                    helperText={errors.parentCategory?.message}
                >
                    {!isLoading && !error && data.data.parentCategories.map(c =>
                        <MenuItem value={c._id} key={c.name}>{c.name}</MenuItem>
                    )}
                </MultiSelectController>
                <InputFileUploadSingleCoverImage
                    control={control}
                    coverImage={coverImage}
                    setCoverImage={setCoverImage}
                    name={"coverImage"}
                    id={"coverImage"}
                    label={"Cover Image"}
                    requiredMessage={"Please select a cover image for sub category"}
                    error={!!errors.coverImage}
                    helperText={errors.coverImage?.message}
                />
                <FormSubmitButton disabled={isCreating} buttonText={"Create"}/>
            </Form>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <SubCategoryData/>
        </FormAndDataContainer>
    );
}

export default SubCategoryForm;