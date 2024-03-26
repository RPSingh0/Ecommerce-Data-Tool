import axios from "axios";

const URL = 'http://127.0.0.1:3000/api/v1/subCategory';

export async function getAllSubCategories() {
    let {status, data} = await axios.get(`${URL}/all`);

    if (status !== 200) {
        throw new Error('Data not found...');
    }

    return data;
}

export async function createSubCategoryService({name, parentCategory}) {

    let {status, data} = await axios.post(`${URL}/create`, {
        name: name,
        parentCategory: parentCategory
    });

    if (status !== 201) {
        throw new Error('Failed to create data...');
    }

    return data;
}

export async function deleteSubCategoryService({id}) {
    let {status, data} = await axios.delete(`${URL}/delete/${id}`);

    if (status !== 200) {
        throw new Error('Failed to delete...')
    }

    return data;
}