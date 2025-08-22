import React, { useEffect, useState } from "react";
import {ZTableHeadProps,ZTableColumn} from "./types";
import "./styles/table.css"


export const ZTableHead: React.FC<ZTableHeadProps> = (props) => {
    const [columns, setColumns] = useState<ZTableColumn[]>([]);
    useEffect(() => {
        setColumns(props.columns || []);
    })
    return (
        <thead>
        <tr className="table-header-row">
            {
                columns.map((column: ZTableColumn) => (
                    <th
                        key={column.dataIndex}
                        className="table-header-cell"
                    >
                        {column.title}
                    </th>
                ))
            }
        </tr>
        </thead>
    );
};