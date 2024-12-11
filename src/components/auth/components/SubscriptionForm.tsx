import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from 'react'

const subscriptionPlans = [
    { id: 'basic', name: 'Basic', price: '$9.99/month' },
    { id: 'pro', name: 'Pro', price: '$19.99/month' },
    { id: 'enterprise', name: 'Enterprise', price: '$49.99/month' },
]

export default function SubscriptionForm({ onNext, data }: { onNext: (data: any) => void, data: any }) {
    const [selectedPlan, setSelectedPlan] = useState(data.selectedPlan || '')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext({ subscription: { selectedPlan } })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label className="text-base">Select a Subscription Plan</Label>
                <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="mt-2">
                    {subscriptionPlans.map((plan) => (
                        <div key={plan.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={plan.id} id={plan.id} />
                            <Label htmlFor={plan.id} className="flex justify-between w-full">
                                <span>{plan.name}</span>
                                <span>{plan.price}</span>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
            <Button type="submit" className="w-full" disabled={!selectedPlan}>Next</Button>
        </form>
    )
}

