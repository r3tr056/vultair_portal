
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { MapPin, PhoneCall, Smartphone } from 'lucide-react'
import { useState } from 'react'

export function DeviceControlPanel() {
    const [latitude, setLatitude] = useState('0')
    const [longitude, setLongitude] = useState('0')
    const [shakeIntensity, setShakeIntensity] = useState(0)
    const [vibrationEnabled, setVibrationEnabled] = useState(false)

    const handleSetLocation = () => {
        console.log(`Setting location to: ${latitude}, ${longitude}`)
        // In a real application, this would send the command to the AVD
    }

    const handleShakeDevice = () => {
        console.log(`Shaking device with intensity: ${shakeIntensity}`)
        // In a real application, this would send the command to the AVD
    }

    const handleToggleVibration = () => {
        setVibrationEnabled(!vibrationEnabled)
        console.log(`Vibration ${vibrationEnabled ? 'disabled' : 'enabled'}`)
        // In a real application, this would send the command to the AVD
    }

    const handleInsertFakeCall = () => {
        console.log('Inserting fake phone call')
        // In a real application, this would send the command to the AVD
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">GPS Control</h3>
                <div className="flex space-x-2">
                    <div>
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                            id="latitude"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            placeholder="Latitude"
                        />
                    </div>
                    <div>
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                            id="longitude"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            placeholder="Longitude"
                        />
                    </div>
                    <Button onClick={handleSetLocation} className="mt-auto">
                        <MapPin className="mr-2 h-4 w-4" /> Set Location
                    </Button>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Motion Control</h3>
                <div className="space-y-2">
                    <Label htmlFor="shake-intensity">Shake Intensity</Label>
                    <Slider
                        id="shake-intensity"
                        min={0}
                        max={10}
                        step={1}
                        value={[shakeIntensity]}
                        onValueChange={(value) => setShakeIntensity(value[0])}
                    />
                    <Button onClick={handleShakeDevice}>
                        <Smartphone className="mr-2 h-4 w-4" /> Shake Device
                    </Button>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Vibration</h3>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="vibration"
                        checked={vibrationEnabled}
                        onCheckedChange={handleToggleVibration}
                    />
                    <Label htmlFor="vibration">Enable Vibration</Label>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Fake Phone Call</h3>
                <Button onClick={handleInsertFakeCall}>
                    <PhoneCall className="mr-2 h-4 w-4" /> Insert Fake Call
                </Button>
            </div>
        </div>
    )
}

