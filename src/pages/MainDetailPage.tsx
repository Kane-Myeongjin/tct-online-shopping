import {
    Button,
    Card,
    CardContent,
    IconButton,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../styles/compiled/style.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

interface DetailItem {
    id: number;
    title: string;
    price: number;
    imageFile: string;
    company: string;
    model: string;
}

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const imageStyle = {
    width: "200px",
    height: "200px",
};

const MainDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as { id: number };
    const [detail, setDetail] = useState<DetailItem>();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getDetailItem = async () => {
        console.log(state.id);
        const url = "http://localhost:3300/v1/item/" + state.id;

        await axios.get(url).then((response) => {
            console.log(response.data.item);
            setDetail(response.data.item);
        });
    };

    useEffect(() => {
        getDetailItem();
    }, [state]);

    const getImage = (url: string | undefined) => {
        const baseUrl = process.env.PUBLIC_URL + "/images/";
        return baseUrl + url;
    };

    return (
        <div>
            <Card variant="outlined">
                <IconButton
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <ArrowBackIcon fontSize="large" color="primary" />
                </IconButton>
                <CardContent className={"detail"}>
                    <Typography variant="h3" component="h2" gutterBottom>
                        {detail?.title}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        <img
                            style={imageStyle}
                            src={getImage(detail?.imageFile)}
                        />
                    </Typography>
                    <Button onClick={handleOpen}>버튼 클릭</Button>

                    <div>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography
                                        variant="h6"
                                        className={"subtitle"}
                                    >
                                        판매가격
                                    </Typography>
                                </td>
                                <td>
                                    <Typography className={"text"}>
                                        {detail?.price}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography
                                        variant="h6"
                                        className={"subtitle"}
                                    >
                                        제조사
                                    </Typography>
                                </td>
                                <td>
                                    <Typography className={"text"}>
                                        {detail?.company}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography
                                        variant="h6"
                                        className={"subtitle"}
                                    >
                                        모델명
                                    </Typography>
                                </td>
                                <td>
                                    <Typography className={"text"}>
                                        {detail?.model}
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                </CardContent>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            알림
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            삭제 하시겠습니까?
                        </Typography>
                        <Button
                            onClick={() => {
                                console.log(state.id);
                            }}
                        >
                            확인
                        </Button>
                        <Button onClick={handleClose}>취소</Button>
                    </Box>
                </Modal>
            </Card>
        </div>
    );
};

export default MainDetailPage;
