import React from "react";
import "./UserCardBlock.css";
import { Button } from "antd";

function UserCardBlock(props) {
    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0];
            return `http://localhost:5000/${image}`;
        }
    };
    const renderItems = () => {
        return (
            props.products &&
            props.products.map((product, i) => (
                <tr key={i}>
                    <td>
                        <img
                            style={{ width: "70px" }}
                            alt="product"
                            src={renderCartImage(product.images)}
                        />
                    </td>
                    <td>{product.quantity} EA</td>
                    <td>${product.price}</td>
                    <td>
                        <Button
                            type="danger"
                            onClick={() => props.removeItem(product._id)}
                        >
                            {" "}
                            remove{" "}
                        </Button>
                    </td>
                </tr>
            ))
        );
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quanntity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>{renderItems()}</tbody>
            </table>
        </div>
    );
}

export default UserCardBlock;
