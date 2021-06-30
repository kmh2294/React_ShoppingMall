import Axios from "axios";
import React from "react";
import { Table } from "antd";

function HistoryPage(props) {
    const columns = [
        {
            title: "Payment Id",
            dataIndex: "id",
            key: "Payment Id",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "Price",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "Quantity",
        },
        {
            title: "Date of Purchase",
            dataIndex: "dateOfPurchase",
            key: "Date of Purchase",
        },
    ];
    return (
        <div style={{ width: "80%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h1>History</h1>
            </div>
            <br />
            <Table
                dataSource={props.user.userData && props.user.userData.history}
                columns={columns}
            />
            ;
        </div>
    );
}

export default HistoryPage;
