import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'

export default function DocumentsForm({ onNext, data }: { onNext: (data: any) => void, data: any }) {
    const [formData, setFormData] = useState({
        licenseNumber: data.licenseNumber || '',
        expirationDate: data.expirationDate || '',
        documentUpload: data.documentUpload || '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext({ documents: formData })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    required
                />
            </div>
            <div>
                <Label htmlFor="expirationDate">Expiration Date</Label>
                <Input
                    id="expirationDate"
                    type="date"
                    value={formData.expirationDate}
                    onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                    required
                />
            </div>
            <div>
                <Label htmlFor="documentUpload">Upload Documents</Label>
                <Input
                    id="documentUpload"
                    type="file"
                    onChange={(e) => setFormData({ ...formData, documentUpload: e.target.value })}
                    required
                />
            </div>
            <Button type="submit" className="w-full">Next</Button>
        </form>
    )
}

