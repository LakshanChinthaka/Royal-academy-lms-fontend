import React from 'react'
import Swal from "sweetalert2";

function SelectRbBtn() {

    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            "Distinction": "Distinction",
            "Merit": "Merit",
            "Pass": "Pass", 
            "Repeat": "Repeat",
          });
        });
      });
      
      const { value: grade } =  Swal.fire({
        title: "Select Grade",
        input: "radio",
        inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return "You need to choose something!";
          }
        }
      });
      if (grade) {
        Swal.fire({ html: `You selected: ${grade}` });
    }


  return (
    <div>SelectRbBtn</div>
  )
}

export default SelectRbBtn

