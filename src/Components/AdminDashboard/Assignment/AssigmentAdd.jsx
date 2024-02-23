import axios from "axios";
import SuccessAlert from "../../../utils/SuccessAlert";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
import { useToken } from "../../Context/TokenProvider";
import { useState } from "react";
import AutocompleteComponent from "../../../page/SignInPage/AutocompleteComponent";
import Swal from "sweetalert2";
import ConfirmAlert from "../../../utils/ConfiramAlert";
import BatchDropdwon from "../../../utils/BatchDropdown";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../Components/firebase";
import Loading from "../../../utils/Loading/Loading";

function AssigmentAdd() {
  const { token } = useToken();
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Message
  const { SuccessMessage } = SuccessAlert();
  const { ConfirmMessage } = ConfirmAlert();

  const COURSE_URL = "http://localhost:8080/api/v1/course/find-with-name";
  const ASSIGNMENT_ADD_URL = "http://localhost:8080/api/v1/assigment/add";

  const [courseId, setCourseID] = useState({
    courseId: null,
  });

  console.log("File image", img);

  console.log("Course id-", courseId.courseId);

  const [formData, setFormData] = useState({
    assiCode: "",
    batchId: null,
    deadLine: "",
    assiUrl: "",
  });

  const navigate = useNavigate();

  //Handle school
  const handleBatchChnage = (selectedOption) => {
    if (selectedOption) {
      const id = selectedOption.batchId;
      setFormData({ ...formData, batchId: id });
    } else {
      setFormData({ ...formData, batchId: null });
    }
  };

  //Seach batch details by course id
  const BATCH_URL = `http://localhost:8080/api/v1/batch/find-all?id=${courseId.courseId}`;

  //Handle course
  const handleCourseChange = (selectedOption) => {
    if (selectedOption) {
      const Id = selectedOption.courseId;
      setCourseID({ ...courseId, courseId: Id });
    } else {
      setCourseID({ ...courseId, courseId: null });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  const payload = {
    ...formData,
  };
  console.log("Payload", payload);

  //submit
  const handleSumbit = async (e) => {
    if (!img) return;

    e.preventDefault();

    const confirmed = await ConfirmMessage(
      "Add New Assigment",
      "Are you sure you want to Add?",
      "Yes, Add",
      "Cancel"
    );

    if (confirmed) {
      setLoading(true)
      const fileName = `Batch-${formData.batchId}-${formData.assiCode}`;
      const imgRef = ref(
        storage,
        `assigment/batch-${formData.batchId}/${fileName}`
      );

      try {
        const existingUrl = await getDownloadURL(imgRef);
        const existingImageRef = ref(storage, existingUrl);
        await deleteObject(existingImageRef);
        await uploadBytes(imgRef, img);
        const newImageUrl = await getDownloadURL(imgRef);

        console.log("Firebase Image url-", newImageUrl);

        saveToDb(newImageUrl);

      } catch (error) {
        if (error.code === "storage/object-not-found") {
          await uploadBytes(imgRef, img);
          const newImageUrl = await getDownloadURL(imgRef);

          saveToDb(newImageUrl);
        } else {
          console.error("Error handling image:", error);
        }
      }
    } else {
      Swal.fire("Sumbit Cancelled", "", "info");
    }
  };

  //save to db
  const saveToDb = async (newImageUrl) => {

    const payload = {
      ...formData, 
      assiUrl: newImageUrl 
    };

    console.log("Save payload:", payload)
    try {
      const res = await axios.post(ASSIGNMENT_ADD_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false)
      
      setFormData({
        assiCode: "",
        batchId: null,
        deadLine: "",
        assiUrl: "",
      })
      const confirmed = await SuccessMessage(res.data.data, "success");    

    } catch (error) {
      const confirmed = await SuccessMessage(error.response.data.data, "error");
      setLoading(false)
    }
  };

  if(loading){
    console.log("Loading...")
    return(
      <Loading/>
    )
  }

  return (
    <div>
      <div className="mt-10">
        <div className="mt-10, ml-10">
          <BackButton onClick={() => navigate(-1)} />
        </div>
        <h2 class="text-2xl mt-5 mb-5 ml-[330px] font-bold text-gray-700">
          Add Assigment
        </h2>
      </div>
      <div class="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">

    

        <form onSubmit={handleSumbit}>
          <div class="grid sm:grid-cols-2 gap-y-7 gap-x-12">
            <div>
              <label htmlFor="assiCode" class="text-sm mb-2 block">
                Assigment code
              </label>
              <input
                value={formData.assiCode}
                onChange={handleChange}
                required
                name="assiCode"
                type="text"
                class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter code"
              />
            </div>
            <div>
              <label htmlFor="LasttName" class="text-sm mb-2 block">
                Select Course
              </label>
              <AutocompleteComponent
                endpoint={COURSE_URL}
                headers={{ Authorization: `Bearer ${token}` }}
                getOptionLabel={(option) => option.name}
                clearOnEscape={true}
                label=" Select course"
                onChange={handleCourseChange}
              />
            </div>
            <div>
              <label htmlFor="LasttName" class="text-sm mb-2 block">
                Select Batch
              </label>
              <BatchDropdwon
                endpoint={BATCH_URL}
                headers={{ Authorization: `Bearer ${token}` }}
                getOptionLabel={(option) => option.code}
                clearOnEscape={true}
                label=" Select Batch"
                onChange={handleBatchChnage}
              />
            </div>

            {/* Date of birth day */}
            <div class="relative w-full">
              <label htmlFor="deadLine" className="text-sm mb-2 block">
                Deadline
              </label>
              <input
                value={formData.deadLine}
                onChange={handleChange}
                name="deadLine"
                type="date"
                className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-100 dark:border-gray-100 dark:placeholder-gray-400 dark:gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
              />
            </div>
          </div>
               {/* file upload button */}
         <div class="space-y-8 font-[sans-serif] ml-[2px] mt-10 mb-7 max-w-md mx-auto">
          <input
            onChange={(e) => setImg(e.target.files[0])}
            type="file"
            class=" text-black text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
          />
        </div>
          <button
            type="submit"
            class=" mt-5 max-w-[200px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssigmentAdd;
