import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, CircularProgress, TextField } from "@mui/material";
import styled from "styled-components";
import { ethers } from "ethers";
import { useManageAuctions } from "../hooks/useAuction";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	height: 250,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const ReservedInput = styled(TextField)`
	width: 70%;
	margin: 40px;
`;

const CreateAuctionButton = styled(Button)`
	background-color: #000;
	color: #fff;
	&:hover {
		background-color: #000;
		color: #fff;
	}
`;

type IProps = {
	open: boolean;
	handleClose: () => void;
	handleOpen?: () => void;
};
const AuctionReservedPrice: React.FC<IProps> = ({ open, handleClose }) => {
	const { getAllAuctions, createAuction } = useManageAuctions();
	const [reserveValue, setreserveValue] = useState("");
	const [isLoading, setisLoading] = useState(false);
	/* const reservePrice = ethers.parseEther(reserveValue); */

	const nftData = JSON.parse(localStorage.getItem("nftData")!);
	const startAuction = async () => {
		setisLoading(true);
		createAuction(nftData.token_address, nftData.token_id, reserveValue)
			.then(() => {
				setisLoading(false);
				handleClose();
			})
			.catch((err) => {
				setisLoading(false);
				handleClose();
			});
	};
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					{isLoading ? (
						<Box sx={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
							<CircularProgress sx={{ width: "100px", height: "100px" }} />
						</Box>
					) : (
						<>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								Enter Reserve Price
							</Typography>
							<Box sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
								<ReservedInput
									value={reserveValue}
									onChange={(e) => {
										setreserveValue(e.target.value);
									}}
									type="number"
									id="outlined-basic"
									variant="outlined"
								/>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									ETH
								</Typography>
							</Box>
							<CreateAuctionButton
								onClick={startAuction}
								variant="contained"
								style={{ marginTop: "20px", width: "100%", height: "50px" }}
							>
								START
							</CreateAuctionButton>
						</>
					)}
				</Box>
			</Modal>
		</div>
	);
};

export default AuctionReservedPrice;