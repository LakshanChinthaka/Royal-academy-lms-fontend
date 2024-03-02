import Swal from "sweetalert2";
import { useState } from "react";
import {
    ref,
    getDownloadURL,
    uploadBytes,
    deleteObject,
} from "firebase/storage";
import { storage } from "../../Components/firebase";
import axios from "axios";
import SuccessAlert from "../../utils/SuccessAlert";
import { useToken } from "../../Components/Context/TokenProvider"

function UploadFileBtn({ title, accept, label, btnName, URL, filePath, uploadFileName, assCode, batchID, Id, assiId }) {

    const { token } = useToken();
    const { SuccessMessage } = SuccessAlert();

    const handleFileUpload = async (file) => {
        console.log("Start uploadImage To firebase")

        if (!file) return;

        const fileName = `${uploadFileName}-Submit`;

        const fileRef = ref(storage, `${filePath}/${fileName}`);

        try {
            const existingUrl = await getDownloadURL(fileRef);

            const existingImageRef = ref(storage, existingUrl);
            await deleteObject(existingImageRef);

            await uploadBytes(fileRef, file);

            const fileURL = await getDownloadURL(fileRef);

            console.log("Firebase Image url-", fileURL);

            uploadImageToDb(fileURL);

        } catch (error) {
            if (error.code === "storage/object-not-found") {

                await uploadBytes(fileRef, file);

                const fileURL = await getDownloadURL(fileRef);

                const confirmed = await SuccessMessage(
                    "Uploaded successfully",
                    "success"
                );

                uploadImageToDb(fileURL);
            } else {

                console.error("Error handling image:", error);
            }
        }
    };

    const uploadImageToDb = async (fileURL) => {

        console.log("Start uploadImageToDb")
        const payload = {
            assiId: parseInt(assiId),
            assiCode: assCode,
            studentId: parseInt(Id),
            batchId: batchID,
            submitUrl: fileURL
        };

        console.log("Payload", payload)

        try {

            await axios.post(URL, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
          
            Swal.fire({
                title: 'Success',
                icon: 'success',
                text: 'Uploaded successfully!',
            });

        } catch (error) {

            console.error("Error:", error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Failed to update URL in database.',
            });
        }
    };

    //Select file option
    const handleFileSelect = async () => {
        try {
            const { value: file } = await Swal.fire({
                title: title,
                input: "file",
                inputAttributes: {
                    accept: accept,
                    "aria-label": label
                }
            });

            if (file) {
                handleFileUpload(file);
            }

            console.log("file", file)
        } catch (error) {
            console.error("Error handling file select:", error);
        }
    };

    return (
        <div>
            <button
                onClick={handleFileSelect}
                type="button"
                className="px-2 py-2 rounded-full text-white text-xs tracking-wider font-semibold border-none outline-none bg-gray-800 hover:bg-[#222] active:bg-[#333]"
            >
                {btnName}
            </button>
        </div>
    );
}

export default UploadFileBtn;
