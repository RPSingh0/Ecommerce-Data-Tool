import {imageDb} from "./firebaseService.js";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';

export async function uploadImageAndGetDownloadUrl(rootPath, folder, files) {
    const fileRefs = []

    const uploadTasks = files.map(async (file, index) => {
        const imageRef = ref(imageDb, `${rootPath}/${folder}/${index}.${file.name.split('.').at(-1)}`);
        fileRefs.push(imageRef);
        return uploadBytes(imageRef, file);
    });

    await Promise.all(uploadTasks);

    return await Promise.all(fileRefs.map(fileRef => getDownloadURL(fileRef)));
}