// table组件测试
import { ZTable } from "../../components/table";
import { ZTableColumn } from "../../components/table/types"

const ZTableTest = ()=> {
    // 生成1w条columns
    const columns:ZTableColumn[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        }
    ];
    // 生成1w条dataSource
    const dataSource: any[] = Array.from({ length: 10000 }, (_, i) => ({
        name: `Zhao ${i + 1}`,
        age: i + 1,
        address: `Address ${i + 1}`,
    }))
    return (
        <div className="p-8">
            <ZTable
                className="min-w-full"
                title={"ZTable"}
                columns={columns}
                dataSource={dataSource}
            >
            </ZTable>
        </div>
    );
}
export default ZTableTest
