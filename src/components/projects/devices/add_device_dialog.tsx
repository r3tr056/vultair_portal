import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProjects } from "@/context/ProjectsContext"
import { CheckCircle, Loader2, XCircle } from 'lucide-react'
import { useState } from 'react'

type Step = 'credentials' | 'connecting' | 'result'

interface AddDeviceDialogProps {
    projectId: string
}

export function AddDeviceDialog({ projectId }: AddDeviceDialogProps) {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState<Step>('credentials')
    const [deviceId, setDeviceId] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const { addDevice } = useProjects()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStep('connecting')
        try {
            await addDevice(projectId, deviceId)
            setIsSuccess(true)
        } catch (error) {
            console.error("Failed to add device:", error)
            setIsSuccess(false)
        } finally {
            setStep('result')
        }
    }

    const resetDialog = () => {
        setStep('credentials')
        setDeviceId('')
        setIsSuccess(false)
    }

    return (
        <Dialog open={open} onOpenChange={(newOpen) => {
            setOpen(newOpen)
            if (!newOpen) resetDialog()
        }}>
            <DialogTrigger asChild>
                <Button>Add Device</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Device</DialogTitle>
                    <DialogDescription>
                        Connect a new device to your Vultair project.
                    </DialogDescription>
                </DialogHeader>
                {step === 'credentials' && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="deviceId">Device ID</Label>
                            <Input
                                id="deviceId"
                                value={deviceId}
                                onChange={(e) => setDeviceId(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">Add Device</Button>
                    </form>
                )}
                {step === 'connecting' && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="mt-4 text-center text-sm text-muted-foreground">
                            Connecting to device...
                        </p>
                    </div>
                )}
                {step === 'result' && (
                    <div className="flex flex-col items-center justify-center py-8">
                        {isSuccess ? (
                            <>
                                <CheckCircle className="h-16 w-16 text-green-500" />
                                <p className="mt-4 text-center text-sm font-medium">Device Added Successfully</p>
                            </>
                        ) : (
                            <>
                                <XCircle className="h-16 w-16 text-red-500" />
                                <p className="mt-4 text-center text-sm font-medium">Failed to Add Device</p>
                            </>
                        )}
                        <Button onClick={() => setOpen(false)} className="mt-6">
                            Close
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

