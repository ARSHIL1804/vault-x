import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { string } from "zod"
 
export function AlertBox({variant, alertText, props}:any) {
  return (
    <Alert variant='default' className="mb-3">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {alertText}
      </AlertDescription>
    </Alert>
  )
}