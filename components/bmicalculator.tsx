"use client"
import { useState,ChangeEvent } from "react"
import {Card , CardHeader,  CardTitle, CardDescription, CardContent} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import { Button } from "@/components/ui/button"
interface BmiResult{
    bmi:string
    category:string
}
export default function BmiCalculator() {
    const [height,setHeight] = useState<string>("")
    const [weight, setWeight] = useState<string>("")
    const [result,setResult] = useState<BmiResult|null>(null)
    const [error , setError] = useState<string>("")
    
    const handleHeightChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        setHeight(e.target.value)
    }
    const handleWeightChange=(e:ChangeEvent<HTMLInputElement>):void=>{
        setWeight(e.target.value)
    }
   
    const calculateBmi = ():void=>{
        if(!height||!weight){
            setError("Please enter valid height and weight")
        }
        return
    }
    const heightInMeters =parseFloat(height)/100
    if(heightInMeters<= 0){
        setError("Height must be a positive number")
    }

    const weightInKg =parseFloat(weight)
    if(weightInKg<=0){
        setError("Weight must be a positive number")
    }

    const BmiValue = weightInKg/(heightInMeters*heightInMeters)
    let category=""

    if(BmiValue<18.5){
        category="Underweight"
    }else if (BmiValue>=18.5 && BmiValue < 25){
        category="Normal"
    }else if (BmiValue >= 25 && BmiValue<30 ){
        category="Overweight"
    }else {
        category="Obese"
    }
    setResult({bmi:BmiValue.toFixed(1),category})
    setError("")
  

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
            <CardTitle>
                BMI Calculator
            </CardTitle>
            <CardDescription>
                Enter your height and weight to calculate your BMI 
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="height">Height(cm)</Label>
                <Input 
                type="number"
                id="height"
                value={height}
                onChange={handleHeightChange}
                />


            </div>
            <div className="grid gap-2">
                <Label htmlFor="weight">Weight(kg)</Label>
                <Input
                type="number"
                id="weight"
                value={weight}
                onChange={handleWeightChange}
              />
            </div>
            <Button onClick={calculateBmi}>Calculate</Button>
            {error && <div className="text-red-500 text-center">{error}</div>}
            {result && (
                <div className="grid gap-2">
                    <div className="text-center text-2xl font-bold">
                     {result.bmi}
                    </div>
                    <div className="text-center text-muted-foreground">
                        {result.category}

                    </div>

                </div>
            )}

        </CardContent>
      </Card>
        </div>
    )

}




