import React, {useCallback, useEffect, useState} from "react";
import {ZTableProps, ZTableColumn} from "./types";
import "./styles/table.css"
import { ZTableHead } from "./ZTableHead";
import { VirtualList } from "./VirtualList";

const ZTable: React.FC<ZTableProps> = (props) => {
    const [columns, setColumns] = useState<ZTableColumn[]>([]);
    const [dataSource, setDataSource] = useState<any[]>([]);
    useEffect(() => {
        setColumns(props.columns || []);
        setDataSource(props.dataSource || []);
    })
    // 渲染单行数据（少量数据）
    const renderRow = useCallback((row: any, rowIndex: number) => (
        <tr
            key={rowIndex}
            className="table-row"
        >
            {
                columns.map((column: ZTableColumn) => (
                    <td
                        key={column.dataIndex}
                        className="table-cell"
                    >
                        {row[column.dataIndex]}
                    </td>
                ))
            }
        </tr>
    ), [columns]);
    return (
        <div className="table-container">
            <div>
                {props.title && (
                    <div className="table-title">
                        {props.title}
                    </div>
                )}
            </div>
            {dataSource.length < 100 ? (
                <table className="table-base">
                    <ZTableHead columns={columns}></ZTableHead>
                    <tbody className="table-body">
                        {
                            // 数据量小时直接渲染
                            dataSource.map((row: any, rowIndex: number) => (
                                renderRow(row, rowIndex)
                            ))
                        }
                    </tbody>
                </table>
            ) : (
                <>
                    <table className="table-base">
                        <ZTableHead columns={columns}></ZTableHead>
                    </table>
                    <VirtualList
                        columns={columns}
                        items={dataSource}
                        itemHeight={50} // 每行高度，根据实际样式调整
                        windowHeight={1000} // 窗口高度
                    />
                </>
            )}
        </div>
    );
};

export default ZTable;
