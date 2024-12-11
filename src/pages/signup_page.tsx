'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/AuthProvider"
import { useState } from 'react'
import AddressForm from '../components/auth/components/AddressForm'
import BasicInfoForm from '../components/auth/components/BasicInfoForm'
import DocumentsForm from '../components/auth/components/DocumentsForm'
import ProgressBar from '../components/auth/components/ProgressBar'
import SubscriptionForm from '../components/auth/components/SubscriptionForm'

const steps = ['Basic Info', 'Address & Phone', 'License & Documents', 'Subscription']

export default function SignupPage() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        basicInfo: {},
        address: {},
        documents: {},
        subscription: {}
    })

    const { signup } = useAuth();

    const handleNext = (data: any) => {
        setFormData(prev => ({ ...prev, [Object.keys(data)[0]]: data[Object.keys(data)[0]] }))
        setCurrentStep(prev => prev + 1)
    }

    const handlePrevious = () => {
        setCurrentStep(prev => prev - 1)
    }

    const handleSubmit = async () => {
        try {
            const { username, password } = formData.basicInfo as { username: string; password: string }
            await signup({ username, password })

            console.log("Form submitted:", formData);
        } catch (error) {
            console.error('Signup failed:', error)
        }
    }

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <BasicInfoForm onNext={handleNext} data={formData.basicInfo} />
            case 1:
                return <AddressForm onNext={handleNext} data={formData.address} />
            case 2:
                return <DocumentsForm onNext={handleNext} data={formData.documents} />
            case 3:
                return <SubscriptionForm onNext={handleNext} data={formData.subscription} />
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-2xl bg-white">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center text-gray-800">Sign Up</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Create your account in a few easy steps
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProgressBar steps={steps} currentStep={currentStep} />
                    {renderStep()}
                </CardContent>
                <CardFooter className="flex justify-between">
                    {currentStep > 0 && (
                        <Button variant="outline" onClick={handlePrevious}>
                            Previous
                        </Button>
                    )}
                    {currentStep === steps.length - 1 && (
                        <Button className="ml-auto" onClick={handleSubmit}>
                            Submit
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

