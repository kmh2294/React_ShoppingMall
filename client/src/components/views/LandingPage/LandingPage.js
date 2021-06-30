import React, { useState, useEffect } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";
import { continents, price } from "./Sections/Datas";

function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState();
    const [Filters, setFilters] = useState({
        continents: [],
        price: [],
    });
    const [SearchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit,
        };
        getProducts(body);
    }, []);
    const getProducts = (body) => {
        axios.post("/api/product/products", body).then((response) => {
            if (response.data.success) {
                if (body.loadMore) {
                    setProducts([...Products, ...response.data.productsInfo]);
                } else {
                    setProducts(response.data.productsInfo);
                }
                setPostSize(response.data.postSize);
            } else {
                alert("상품들을 가져오는데 실패하였습니다");
            }
        });
    };

    const loadMoreHandler = () => {
        let skip = Skip + Limit;

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
        };
        getProducts(body);
        setSkip(skip);
    };

    const renderCards = Products.map((product, index) => {
        return (
            <Col
                lg={6}
                md={8}
                sm={12}
                xs={24}
                key={index}
                style={{ minHeight: "300px" }}
            >
                <Card
                    cover={
                        <a href={`/product/${product._id}`}>
                            <ImageSlider images={product.images} />
                        </a>
                    }
                    style={{ minHeight: "250px" }}
                    //추가내용-나
                >
                    <Meta
                        title={product.title}
                        description={`${product.description}`}
                    />
                    <span>${product.price}</span>
                </Card>
            </Col>
        );
    });

    const showFilteredResult = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters,
        };
        getProducts(body);
        setSkip(0);
    };
    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    };
    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters };

        newFilters[category] = filters;

        if (category === "price") {
            let priceValue = handlePrice(filters);
            newFilters[category] = priceValue;
        }

        showFilteredResult(newFilters);
        setFilters(newFilters);
    };
    const updateSearchTerm = (newSearchTerm) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm,
        };

        setSearchTerm(newSearchTerm);
        setSkip(0);
        getProducts(body);
    };

    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>
                    lets shop <Icon type="rocket" />
                </h2>
            </div>
            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox
                        list={continents}
                        handleFilters={(filters) =>
                            handleFilters(filters, "continents")
                        }
                    ></CheckBox>
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        list={price}
                        handleFilters={(filters) =>
                            handleFilters(filters, "price")
                        }
                    />
                </Col>
            </Row>

            {/* search */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "1rem auto",
                }}
            >
                <SearchFeature refreshFunction={updateSearchTerm} />
            </div>

            <Row gutter={[16, 16]}>{renderCards}</Row>

            {PostSize >= Limit && (
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                    }}
                >
                    <Button onClick={loadMoreHandler}>더보기</Button>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
