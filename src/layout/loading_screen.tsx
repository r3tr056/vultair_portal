import { cn } from "@/lib/utils"

interface LoadingScreenProps {
    size?: 'small' | 'medium' | 'large'
    color?: string
    className?: string
}

export function LoadingScreen({ size = 'large', color = '#3b82f6', className }: LoadingScreenProps) {
    const sizeClass = {
        small: 'w-8 h-8',
        medium: 'w-12 h-12',
        large: 'w-16 h-16'
    }

    return (
        <div className={cn("flex items-center justify-center h-screen", className)}>
            <div
                className={cn(
                    "rounded-full border-4 border-t-transparent animate-spin",
                    sizeClass[size]
                )}
                style={{ borderColor: `${color} transparent transparent transparent` }}
            ></div>
        </div>
    )
}
