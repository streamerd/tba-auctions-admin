import axios from "axios";
import React, { useEffect, useState } from "react";

interface IProps {
	path: string;
}

const useFetch: React.FC<IProps> = ({ path }) => {
	console.log("fetching resource from", path)
	const [data, setdata] = useState("");
	useEffect(() => {
		axios
		// .get(`http://localhost:3333${path}`)

			.get(`https://tokenbound-accounts-store.vercel.app${path}`)
			.then((res) => {
				console.log(res.data);
				setdata(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return data;
};

export default useFetch;
