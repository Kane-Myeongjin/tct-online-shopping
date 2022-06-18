import React, { Fragment } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";

const MainListTitle = () => {
    // 시간 흐르게?
    return (
        <Box
            style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#fff",
                height: "90px",
                padding: "10px",
                zIndex: 100,
            }}
        >
            <div
                style={{
                    fontSize: "30px",
                    textAlign: "center",
                    fontWeight: "bold",
                    margin: "10px",
                }}
            >
                장바구니
            </div>
            <div
                style={{
                    fontSize: "20px",
                    textAlign: "center",
                    margin: "10px",
                }}
            ></div>
        </Box>
    );
};

export default MainListTitle;
