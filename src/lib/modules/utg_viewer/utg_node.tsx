import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Handle, Node, Position } from '@xyflow/react';

type UTGNodeData = {
    label: string;
    imageUrl: string;
    package: string;
    activity: string;
    content: string;
}

export function UTGNode({ data }: Node<UTGNodeData>) {
    return (
        <Card className="w-[300px] shadow-lg">
            <Handle type="target" position={Position.Top} />
            <CardHeader className="p-4">
                <CardTitle className="text-sm">{data.label}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                <img
                    src={data.imageUrl}
                    alt={data.label}
                    className="w-full h-auto rounded-lg border"
                    loading="lazy"
                />
                <div className="space-y-2 text-xs">
                    <p><span className="font-medium">Package:</span> {data.package}</p>
                    <p><span className="font-medium">Activity:</span> {data.activity}</p>
                </div>
            </CardContent>
            <Handle type="source" position={Position.Bottom} />
        </Card>
    )
}

