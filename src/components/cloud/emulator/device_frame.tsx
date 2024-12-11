
import { useEffect, useRef } from 'react'

export function DeviceFrame() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')
            if (ctx) {
                // Draw a simple placeholder content
                ctx.fillStyle = '#f0f0f0'
                ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                ctx.fillStyle = '#333'
                ctx.font = '20px Arial'
                ctx.textAlign = 'center'
                ctx.fillText('Android Device Screen', canvasRef.current.width / 2, canvasRef.current.height / 2)
            }
        }
    }, [])

    return (
        <div className="h-full flex items-center justify-center p-10">
            <div className="relative bg-black rounded-[3rem] p-4 shadow-xl">
                <div className="absolute top-12 left-0 w-6 h-20 bg-black rounded-r-lg"></div>
                <div className="absolute top-40 left-0 w-6 h-20 bg-black rounded-r-lg"></div>
                <div className="absolute top-12 right-0 w-6 h-14 bg-black rounded-l-lg"></div>
                <canvas
                    ref={canvasRef}
                    width={390}
                    height={844}
                    className="bg-white rounded-[2rem]"
                ></canvas>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-400 rounded-full"></div>
            </div>
        </div>
    )
}

