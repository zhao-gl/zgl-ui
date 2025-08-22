import React from "react";

export interface ZTableProps {
    className?: string;
    title?: string;
    columns?: ZTableColumn[];
    dataSource?: any[];
}
export interface ZTableColumn {
    title: string;
    dataIndex: string;
    key?: string;
    render?: (text: any, record: any, index: number) => React.ReactNode;
    width?: string;
    align?: 'left' | 'center' | 'right';
    fixed?: 'left' | 'right' | boolean;
    ellipsis?: boolean;
    sorter?: (a: any, b: any) => number;
    sortOrder?: 'ascend' | 'descend';
    sortDirections?: ('ascend' | 'descend')[];
    children?: ZTableColumn[];
    scopedSlots?: {
        default?: (record: any, index: number) => React.ReactNode;
    }
    scopedSlotsClassName?: string;
    scopedSlotsStyle?: React.CSSProperties;
}
export interface VirtualListProps {
    items: any[];
    itemHeight: number;
    windowHeight: number;
    renderItem?: (item: any, index: number) => React.ReactNode;
    columns: ZTableColumn[];
}
export interface ZTableHeadProps {
    className?: string;
    columns?: ZTableColumn[];
}
export interface ZTableBodyProps {
    className?: string;
}
export interface ZTableRowProps {
    className?: string;
}
export interface ZTableCellProps {
    className?: string;
}