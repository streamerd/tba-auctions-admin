import axios from "axios";
import React from "react";
interface IProps {
	path?: string;
	data?: any;
}
const usePost = () => {
	const postReq: React.Dispatch<React.SetStateAction<any>> = async ({ path, data }) => {
		return new Promise((resolve, reject) => {
			try {
				axios
				// .post(`http://localhost:3333${path}`, data, {

					.post(`https://tokenbound-accounts-store.vercel.app${path}`, data, {
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
	return { postReq };
};

export default usePost;
