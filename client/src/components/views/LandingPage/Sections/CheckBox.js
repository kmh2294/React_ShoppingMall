import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

function CheckBox(props) {
    const [Checked, setChecked] = useState([]);

    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value);

        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        props.handleFilters(newChecked);
    };

    const LenderCheckboxList = () =>
        props.list &&
        props.list.map((value, index) => (
            <div key={index} style={{ margin: "0 5px" }}>
                <Checkbox
                    onChange={() => {
                        handleToggle(value._id);
                    }}
                    checked={Checked.indexOf(value._id) === -1 ? false : true}
                ></Checkbox>
                <span style={{ marginRight: "15px" }}> {value.name}</span>
            </div>
        ));
    return (
        <div>
            <Collapse defaultActiveKey={["0"]}>
                <Panel header="Continents Select" key="1">
                    {LenderCheckboxList()}
                </Panel>
            </Collapse>
        </div>
    );
}

export default CheckBox;
