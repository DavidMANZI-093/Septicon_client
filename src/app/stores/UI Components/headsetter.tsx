"use client";

import useHeader from "@/hooks/headerstate";
import { useEffect } from "react";

type Props = {
    headstring: string;
}

const Headsetter = (props: Props) => {

    const { addCrumb } = useHeader();

    useEffect(() => {
        addCrumb(props.headstring);
    }, [addCrumb, props.headstring]);

    return null;
}

export default Headsetter;