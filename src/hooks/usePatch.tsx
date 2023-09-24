import axios from "axios";
import React from "react";
interface IProps {
  path?: string;
  data?: any;
}
const usePatch = () => {
  const patchReq: React.Dispatch<React.SetStateAction<any>> = async ({
    path,
    data,
  }) => {
    return new Promise((resolve, reject) => {
      try {
        axios
          .patch(`https://tokenbound-accounts-store.vercel.app${path}`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res);
            resolve(res.data);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      } catch (error) {
        console.log(error);
      }
    });
  };
  return { patchReq };
};

export default usePatch;
