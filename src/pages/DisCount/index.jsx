import React, { useEffect, useState } from "react";
import { getDataDiscount } from "../../services/discountService";
import DisCountForm from "../../components/DisCount/DisCount";

const DisCount = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getDataDiscount();
            setData(res);
        };
        fetchApi();
    }, []);

    return (
        <>
            <DisCountForm data={data} />
        </>
    );
};

export default DisCount;
