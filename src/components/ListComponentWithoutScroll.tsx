import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

interface TabProps {
    index?: number;
    listType: string;
}
interface Item {
    id: number;
    title: string;
    price: number;
    imageFile: string;
}

interface DetailProps {
    id: number;
}

const imageStyle = {
    width: "100px",
    height: "100px",
};

const ListComponentWithoutScroll = ({ index, listType }: TabProps) => {
    const navigate = useNavigate();
    const [list, setList] = useState<Item[]>([]);

    const [total, setTotal] = useState(0);

    const priceString = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const getList = async (chartType: string) => {
        const url = "http://localhost:3300/v1/cartList";

        await axios.get(url).then((response) => {
            // setList(response.data.cartList);
            // 가격 순(오름차순)
            setList(
                response.data.cartList.sort(function (a: Item, b: Item) {
                    return a.price - b.price;
                })
            );
            // 가나다순
            // setList(
            //     response.data.cartList.sort(function (a: Item, b: Item) {
            //         let x = a.title.toLowerCase();
            //         let y = b.title.toLowerCase();
            //         if (x < y) {
            //             return -1;
            //         }
            //         if (x > y) {
            //             return 1;
            //         }
            //         return 0;
            //     })
            // );

            getTotalPrice(response.data.cartList);
        });
    };

    const getImage = (url: string) => {
        const baseUrl = process.env.PUBLIC_URL + "/images/";
        return baseUrl + url;
    };

    const getTotalPrice = (list: Item[]) => {
        let total = 0;
        for (let index = 0; index < list.length; index++) {
            total += list[index].price;
        }
        setTotal(total);
    };

    const getDelieryFee = (totalPrice: number) => {
        return totalPrice < 50000 ? 3000 : 0;
    };

    useEffect(() => {
        getList(listType);
    }, []);

    return (
        <div>
            <List>
                {list &&
                    list.map((item: Item, index: number) => {
                        return (
                            <ListItem
                                key={index}
                                button
                                style={{ padding: "10px" }}
                                onClick={() => {
                                    navigate("/detail", {
                                        state: { id: item.id } as DetailProps,
                                    });
                                }}
                            >
                                <img
                                    style={imageStyle}
                                    src={getImage(item.imageFile)}
                                />
                                <ListItemText
                                    style={{
                                        textAlign: "left",
                                        marginLeft: "20px",
                                        marginRight: "20px",
                                        width: "150px",
                                    }}
                                    className={"ellipsis"}
                                    primary={item.title}
                                />
                                <ListItemText
                                    style={{
                                        textAlign: "right",
                                        width: "30px",
                                    }}
                                    className={"ellipsis"}
                                    primary={priceString(item.price)}
                                />
                            </ListItem>
                        );
                    })}
            </List>
            <div
                style={{
                    textAlign: "center",
                }}
            >
                배송비 3,000원 (총 상품금액 5만원 이상 무료배송)
            </div>

            <div style={{ float: "right" }}>
                <tbody>
                    <tr>
                        <td style={{ width: "70%" }}>
                            <Typography variant="h6" className={"subtitle"}>
                                총 상품금액
                            </Typography>
                        </td>
                        <td style={{ width: "30%" }}>
                            <Typography className={"text"}>
                                {priceString(total)}
                            </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Typography variant="h6" className={"subtitle"}>
                                배송비
                            </Typography>
                        </td>
                        <td>
                            <Typography className={"text"}>
                                {getDelieryFee(total)}
                            </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Typography variant="h6" className={"subtitle"}>
                                총 결제금액
                            </Typography>
                        </td>
                        <td>
                            <Typography className={"text"}>
                                ({list.length}개)
                                {priceString(total + getDelieryFee(total))}
                            </Typography>
                        </td>
                    </tr>
                </tbody>
            </div>
        </div>
    );
};

export default ListComponentWithoutScroll;
